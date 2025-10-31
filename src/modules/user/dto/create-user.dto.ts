import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
	@ApiProperty({ 
		description: 'Nome completo do usuário',
		example: 'João Silva'
	})
	@IsString()
	name: string;

	@ApiProperty({ 
		description: 'Email do usuário (deve ser único)',
		example: 'joao.silva@example.com'
	})
	@IsEmail()
	email: string;

	@ApiProperty({ 
		description: 'Senha do usuário (mínimo 6 caracteres)',
		example: 'Senha@123',
		minLength: 6
	})
	@IsString()
	@MinLength(6)
	password: string;
}
