import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from '../casl-ability.factory';
import {
  CHECK_POLICIES_KEY,
  IPolicyHandler,
} from '../decorators/check-policies.decorator';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers = this.reflector.get<IPolicyHandler[]>(
      CHECK_POLICIES_KEY,
      context.getHandler(),
    );

    if (!policyHandlers) return true;

    const { user } = context.switchToHttp().getRequest();

    // Создаем набор прав для конкретного пользователя
    const ability = this.caslAbilityFactory.createForUser(user);

    // Проверяем, проходят ли все правила
    const isAllowed = policyHandlers.every((handler) =>
      handler.handle(ability),
    );

    if (!isAllowed) {
      throw new ForbiddenException(
        'У вас недостаточно прав для этого действия',
      );
    }

    return true;
  }
}
