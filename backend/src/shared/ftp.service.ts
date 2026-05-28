import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'basic-ftp';
import { Readable } from 'stream';

@Injectable()
export class FtpService {
  private config;

  constructor(private configService: ConfigService) {
    this.config = {
      host: this.configService.get<string>('FTP_HOST'),
      user: this.configService.get<string>('FTP_USER'),
      password: this.configService.get<string>('FTP_PASSWORD'),
      port: Number(this.configService.get<number>('FTP_PORT', 21)),
    };
  }

  async uploadFile(fileBuffer: Buffer, fileName: string): Promise<string> {
    const client = new Client();
    // Настройка таймаута соединения
    client.ftp.verbose = false;

    try {
      await client.access(this.config);

      const stream = Readable.from(fileBuffer);

      const uniqueName = `${Date.now()}-${fileName}`;

      await client.uploadFrom(stream, uniqueName);

      return uniqueName;
    } catch (error) {
      console.error('FTP Upload Error:', error);
      throw new InternalServerErrorException(
        'Не удалось сохранить файл на удаленном FTP-сервере',
      );
    } finally {
      client.close();
    }
  }
}
