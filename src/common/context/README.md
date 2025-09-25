ContextService and ContextInterceptor

How it works

- `ContextService` is request-scoped and stores a small `context` object with `user`, `company`, `permissions` and `modules`.
- `ContextInterceptor` runs on every request (registered as a global interceptor) and calls `ContextService.setContext(user, company)` when `request.user` is present.

What your authentication layer must do

- Attach the authenticated user to `request.user` (typical for Passport/JWT strategies).
- Optionally attach `request.company` if you determine a company from the token or a header. If omitted, the interceptor will default to `user.companies?.[0]`.

How to use

- Inject `ContextService` anywhere (controllers/providers) and call `getContext()` to access the context for the current request.
- In handlers that receive the request, `request.context` will also be available after the interceptor runs.

Notes & next steps

- If you use Passport with guards, ensure guard runs before interceptors (default). If you have a custom auth flow, make sure it adds `request.user` early.
- Consider adding types for the context and small helper methods (e.g., `hasPermission(action: string)`).

Checklist

| Item                    | Fazer                                                     | Não fazer                                     |
| ----------------------- | --------------------------------------------------------- | --------------------------------------------- |
| Ordem dos guards        | `AuthGuard` primeiro, `PermissionGuard` depois            | Permissão antes do user estar carregado       |
| Aplicação de permissões | Usar decorator + guard injetado                           | Instanciar guard em cada rota manualmente     |
| Request-scoped guard    | Só se precisar injetar context diretamente                | Não usar sem necessidade (performance)        |
| Helper de permissões    | Criar `hasPermission()` e `hasModule()` no ContextService | Repetir lógica de verificação em cada serviço |
| Consistência            | Padronizar uso em todas as rotas de um módulo             | Misturar abordagens diferentes                |

