import { Global, Module } from '@nestjs/common';
import { ContextService } from './context.service';
import { ContextInterceptor } from './context.interceptor';

@Global()
@Module({
  providers: [ContextService, ContextInterceptor],
  exports: [ContextService, ContextInterceptor],
})
export class ContextModule {}
