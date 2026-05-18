import { SetMetadata } from '@nestjs/common';
import { AppAbility, Action } from '../casl-ability.factory';

export interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

export class CheckAbility implements IPolicyHandler {
  constructor(
    private readonly action: Action,
    private readonly subject: any,
  ) {}

  handle(ability: AppAbility): boolean {
    return ability.can(this.action, this.subject);
  }
}

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: IPolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
