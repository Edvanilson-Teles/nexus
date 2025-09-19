import { BadRequestException } from '@nestjs/common';

export async function handleDbError<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    // Postgres unique violation
    if (error && error.code === '23505') {
      const detail = error.detail || 'Unique constraint violated';
      throw new BadRequestException(detail);
    }

    throw error;
  }
}
