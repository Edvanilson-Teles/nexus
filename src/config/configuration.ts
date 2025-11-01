export default () => {
  // Helper: normalize driver name to what TypeORM expects
  const normalizeDriver = (driver?: string) => {
    if (!driver) return 'postgres';
    return driver === 'postgresql' ? 'postgres' : driver;
  };

  // Prefer discrete variables when provided (DB_HOST/DB_TYPE), otherwise use DATABASE_URL
  const preferDiscrete = !!process.env.DB_HOST || !!process.env.DB_TYPE || process.env.DB_PREFER_DISCRETE === 'true';
  const hasDatabaseUrl = !!process.env.DATABASE_URL && !preferDiscrete;

  // Use SQLite for development only when NO database config is provided at all
  const useSqlite = !hasDatabaseUrl && !process.env.DB_HOST && process.env.NODE_ENV !== 'production';

  // Derive SSL flags
  const dbSslEnv = String(process.env.DB_SSL || '').toLowerCase();
  const dbSsl = dbSslEnv === 'true' || dbSslEnv === '1' || dbSslEnv === 'on';
  const dbRejectUnauthorizedEnv = String(
    process.env.DB_SSL_REJECT_UNAUTHORIZED ?? process.env.DB_REJECT_UNAUTHORIZED ?? 'false',
  ).toLowerCase();
  const dbRejectUnauthorized = dbRejectUnauthorizedEnv === 'true' || dbRejectUnauthorizedEnv === '1' || dbRejectUnauthorizedEnv === 'on';

  const synchronizeEnv = String(process.env.DB_SYNCHRONIZE ?? (process.env.NODE_ENV === 'production' ? 'false' : 'true')).toLowerCase();
  const synchronize = synchronizeEnv === 'true' || synchronizeEnv === '1' || synchronizeEnv === 'on';
  const loggingEnv = String(process.env.DB_LOGGING ?? 'false').toLowerCase();
  const logging = loggingEnv === 'true' || loggingEnv === '1' || loggingEnv === 'on';
  const maxConnections = parseInt(process.env.DB_MAX_CONNECTIONS || '10', 10);
  const connectionTimeout = parseInt(process.env.DB_CONNECTION_TIMEOUT || '30000', 10);

  // If DATABASE_URL exists, build config around it
  const databaseFromUrl = hasDatabaseUrl
    ? {
        type: 'postgres' as const,
        url: process.env.DATABASE_URL as string,
        // For Neon and most managed Postgres, SSL is required
        ssl: dbSsl || /sslmode=(require|verify-full|verify-ca)/i.test(process.env.DATABASE_URL as string)
          ? { rejectUnauthorized: dbRejectUnauthorized }
          : false,
        synchronize,
        logging,
        extra: {
          max: maxConnections,
          connectionTimeoutMillis: connectionTimeout,
        },
      }
    : null;

  // Fallback to discrete env vars when no DATABASE_URL
  const databaseFromDiscreteEnv = !hasDatabaseUrl
    ? {
        type: normalizeDriver(process.env.DB_TYPE) as any,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        // Support both DB_DATABASE and DB_NAME
        database: process.env.DB_DATABASE || process.env.DB_NAME,
        ssl: dbSsl ? { rejectUnauthorized: dbRejectUnauthorized } : false,
        synchronize,
        logging,
        extra: {
          max: maxConnections,
          connectionTimeoutMillis: connectionTimeout,
        },
      }
    : null;

  return {
    port: parseInt(process.env.PORT || '3000', 10),
    database: useSqlite
      ? {
          type: 'sqlite' as const,
          database: 'nexus-dev.sqlite',
          synchronize: true,
          logging: false,
        }
      : (databaseFromUrl || databaseFromDiscreteEnv),
    jwt: {
      secret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
      expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    },
  };
};
