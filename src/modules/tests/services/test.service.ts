import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateTestDto } from '../dto/create-test.dto';
import { UpdateTestDto } from '../dto/update-test.dto';
import { Test } from '../entities/test.entity';
import { Company } from 'src/modules/organization/modules/company/entities/company.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createTestDto: CreateTestDto) {
    // Verificar se a empresa existe
    const company = await this.companyRepository.findOne({
      where: { id: createTestDto.companyId },
    });

    if (!company) {
      throw new NotFoundException(
        `Empresa com ID ${createTestDto.companyId} não encontrada`,
      );
    }

    // Verificar se já existe teste com o mesmo código
    const existingTest = await this.testRepository.findOne({
      where: { code: createTestDto.code },
    });

    if (existingTest) {
      throw new ConflictException(
        `Já existe um exame cadastrado com o código ${createTestDto.code}`,
      );
    }

    const test = this.testRepository.create(createTestDto);
    return await this.testRepository.save(test);
  }

  async findAll(
    search?: string,
    category?: string,
    companyId?: number,
    isActive?: boolean,
  ) {
    const query = this.testRepository.createQueryBuilder('test');

    if (search) {
      query.andWhere(
        '(test.name LIKE :search OR test.code LIKE :search OR test.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (category) {
      query.andWhere('test.category = :category', { category });
    }

    if (companyId) {
      query.andWhere('test.companyId = :companyId', { companyId });
    }

    if (isActive !== undefined) {
      query.andWhere('test.isActive = :isActive', { isActive });
    }

    query.orderBy('test.name', 'ASC');

    return await query.getMany();
  }

  async findOne(id: number) {
    const test = await this.testRepository.findOne({
      where: { id },
    });

    if (!test) {
      throw new NotFoundException(`Exame com ID ${id} não encontrado`);
    }

    return test;
  }

  async findByCode(code: string) {
    const test = await this.testRepository.findOne({
      where: { code },
    });

    if (!test) {
      throw new NotFoundException(`Exame com código ${code} não encontrado`);
    }

    return test;
  }

  async update(id: number, updateTestDto: UpdateTestDto) {
    const test = await this.testRepository.findOne({
      where: { id },
    });

    if (!test) {
      throw new NotFoundException(`Exame com ID ${id} não encontrado`);
    }

    // Se estiver atualizando o código, verificar se já existe outro teste com o mesmo código
    if (updateTestDto.code && updateTestDto.code !== test.code) {
      const existingCode = await this.testRepository.findOne({
        where: { code: updateTestDto.code },
      });

      if (existingCode) {
        throw new ConflictException(
          `Já existe outro exame cadastrado com o código ${updateTestDto.code}`,
        );
      }
    }

    await this.testRepository.update(id, updateTestDto);

    return await this.testRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number) {
    const test = await this.testRepository.findOne({
      where: { id },
    });

    if (!test) {
      throw new NotFoundException(`Exame com ID ${id} não encontrado`);
    }

    await this.testRepository.softDelete(id);

    return {
      message: `Exame ${test.name} removido com sucesso`,
      id,
    };
  }

  async deactivate(id: number) {
    const test = await this.testRepository.findOne({
      where: { id },
    });

    if (!test) {
      throw new NotFoundException(`Exame com ID ${id} não encontrado`);
    }

    await this.testRepository.update(id, { isActive: false });

    return {
      message: `Exame ${test.name} desativado com sucesso`,
      id,
    };
  }
}
