import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Scope,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ContextService } from './context.service';

@Injectable({ scope: Scope.REQUEST })
export class ContextInterceptor implements NestInterceptor {
  constructor(private readonly contextService: ContextService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    // Expect authentication layer to attach `user` and optionally `company` to request
    const user = request.user;
    const company = request.company || (user?.companies && user.companies[0]);

    if (user) {
      this.contextService.setContext(user, company);
      // also expose on request for compatibility
      request.context = this.contextService.getContext();
    }

    return next.handle();
  }
}
