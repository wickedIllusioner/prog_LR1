import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { generateSecret, generate, verify } from 'otplib';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    let secret = user.twoFactorSecret;
    if (!secret) {
      secret = generateSecret();
      await this.prismaService.user.update({
        where: { id: user.id },
        data: { twoFactorSecret: secret },
      });
    }

    const code = await generate({ secret, period: 300 });

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Код авторизации для панели',
      text: `Ваш код для входа в систему: ${code}. Код действителен 5 минут.`,
      html: `<h2>Авторизация</h2><p>Ваш код для входа: <strong>${code}</strong></p><p>Код действителен 5 минут.</p>`,
    });

    return {
      require2FA: true,
      email: user.email,
      message: 'Код отправлен на почту',
    };
  }

  async verify2fa(dto: { email: string; code: string }) {
    const user = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });
    if (!user || !user.twoFactorSecret)
      throw new BadRequestException('Пользователь не найден');

    const result = await verify({
      token: dto.code,
      secret: user.twoFactorSecret,
      period: 300,
    });

    if (!result.valid)
      throw new UnauthorizedException('Неверный или устаревший код');

    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
