import { Injectable, Scope } from '@nestjs/common';
import { User } from 'src/modules/user/entities/user.entity';
import { Company } from 'src/modules/company/entities/company.entity';

export interface AppContext {
  user?: Partial<User>;
  company?: Partial<Company>;
  permissions: string[];
  modules: string[];
}

@Injectable({ scope: Scope.REQUEST })
export class ContextService {
  private context: AppContext = { permissions: [], modules: [] };

  setContext(user: Partial<User> | undefined, company: Partial<Company> | undefined) {
    const permissions = this.calculatePermissions(user as any);
    const modules = (user?.modules || []).map((m: any) => m.name);
    this.context = { user, company, permissions, modules };
  }

  getContext(): AppContext {
    return this.context;
  }

  hasPermission(action: string): boolean {
    return (this.context.permissions || []).includes(action);
  }

  hasModule(name: string): boolean {
    return (this.context.modules || []).includes(name);
  }

  private calculatePermissions(user: any): string[] {
    const perms = new Set<string>();
    (user?.roles || []).forEach((role: any) => {
      (role.permissions || []).forEach((p: any) => perms.add(p.action));
    });
    return Array.from(perms);
  }
}
