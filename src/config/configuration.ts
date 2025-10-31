export default () => {
  // Use SQLite for development if no DB config is provided
  const useSqlite = !process.env.DB_HOST && process.env.NODE_ENV !== 'production';
  
  return {
    port: parseInt(process.env.PORT || '3000', 10),
    database: useSqlite ? {
      type: 'sqlite',
      database: 'nexus-dev.sqlite',
    } : {
      type: process.env.DB_TYPE || 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      ssl: process.env.DB_SSL === 'true',
      rejectUnauthorized: process.env.DB_REJECT_UNAUTHORIZED === 'true',
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
      expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    },
  };
};
