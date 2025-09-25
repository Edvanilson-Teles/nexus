import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIRE_PERMISSION_KEY } from '../decorators/require-permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.get<{ permission: string; moduleName?: string }>(
      REQUIRE_PERMISSION_KEY,
      context.getHandler(),
    );

    if (!required) return true; // no permission required

    const req = context.switchToHttp().getRequest();

    // Prefer the request.context (populated by ContextInterceptor). If not present
    // (guard may run before interceptor), fall back to using request.user and derive
    // permissions from its roles.
    const ctx = req?.context as any | undefined;

    const { permission, moduleName } = required;

    const modules = (ctx?.modules) || (req.user?.modules || []).map((m: any) => m.name) || [];
    const roles = req.user?.roles || [];
    const permissions: string[] = (ctx?.permissions) ||
      Array.from(
        new Set(
          roles.flatMap((r: any) => (r.permissions || []).map((p: any) => p.action)).filter(Boolean),
        ),
      );

    // Test-only debug logs to help diagnose e2e failures
    if (process.env.NODE_ENV === 'test') {
      // eslint-disable-next-line no-console
      console.debug('[PermissionGuard] required=', required, 'modules=', modules, 'permissions=', permissions, 'user=', req.user && { id: req.user.id, roles: (req.user.roles || []).map((r: any) => r.name) });
    }

    if (moduleName && !modules.includes(moduleName)) return false;
    if (!permissions.includes(permission)) return false;

    return true;
  }
}
