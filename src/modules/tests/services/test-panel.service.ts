import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateTestPanelDto } from '../dto/create-test-panel.dto';
import { UpdateTestPanelDto } from '../dto/update-test-panel.dto';
import { TestPanel } from '../entities/test-panel.entity';
import { Test } from '../entities/test.entity';
import { Company } from 'src/modules/organization/modules/company/entities/company.entity';

@Injectable()
export class TestPanelService {
  constructor(
    @InjectRepository(TestPanel)
    private readonly panelRepository: Repository<TestPanel>,
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createPanelDto: CreateTestPanelDto) {
    // Verificar se a empresa existe
    const company = await this.companyRepository.findOne({
      where: { id: createPanelDto.companyId },
    });

    if (!company) {
      throw new NotFoundException(
        `Empresa com ID ${createPanelDto.companyId} não encontrada`,
      );
    }

    // Verificar se já existe painel com o mesmo código
    const existingPanel = await this.panelRepository.findOne({
      where: { code: createPanelDto.code },
    });

    if (existingPanel) {
      throw new ConflictException(
        `Já existe um painel cadastrado com o código ${createPanelDto.code}`,
      );
    }

    // Buscar os testes
    const tests = await this.testRepository.find({
      where: { id: In(createPanelDto.testIds) },
    });

    if (tests.length !== createPanelDto.testIds.length) {
      throw new NotFoundException(
        'Um ou mais exames especificados não foram encontrados',
      );
    }

    const { testIds, ...panelData } = createPanelDto;
    const panel = this.panelRepository.create({
      ...panelData,
      tests,
    });

    return await this.panelRepository.save(panel);
  }

  async findAll(search?: string, companyId?: number, isActive?: boolean) {
    const query = this.panelRepository
      .createQueryBuilder('panel')
      .leftJoinAndSelect('panel.tests', 'test');

    if (search) {
      query.andWhere(
        '(panel.name LIKE :search OR panel.code LIKE :search OR panel.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (companyId) {
      query.andWhere('panel.companyId = :companyId', { companyId });
    }

    if (isActive !== undefined) {
      query.andWhere('panel.isActive = :isActive', { isActive });
    }

    query.orderBy('panel.name', 'ASC');

    return await query.getMany();
  }

  async findOne(id: number) {
    const panel = await this.panelRepository.findOne({
      where: { id },
      relations: ['tests'],
    });

    if (!panel) {
      throw new NotFoundException(`Painel com ID ${id} não encontrado`);
    }

    return panel;
  }

  async update(id: number, updatePanelDto: UpdateTestPanelDto) {
    const panel = await this.panelRepository.findOne({
      where: { id },
      relations: ['tests'],
    });

    if (!panel) {
      throw new NotFoundException(`Painel com ID ${id} não encontrado`);
    }

    // Se estiver atualizando o código, verificar se já existe outro painel com o mesmo código
    if (updatePanelDto.code && updatePanelDto.code !== panel.code) {
      const existingCode = await this.panelRepository.findOne({
        where: { code: updatePanelDto.code },
      });

      if (existingCode) {
        throw new ConflictException(
          `Já existe outro painel cadastrado com o código ${updatePanelDto.code}`,
        );
      }
    }

    // Se estiver atualizando os testes
    if (updatePanelDto.testIds) {
      const tests = await this.testRepository.find({
        where: { id: In(updatePanelDto.testIds) },
      });

      if (tests.length !== updatePanelDto.testIds.length) {
        throw new NotFoundException(
          'Um ou mais exames especificados não foram encontrados',
        );
      }

      panel.tests = tests;
    }

    // Atualizar os outros campos
    const { testIds, ...updateData } = updatePanelDto;
    Object.assign(panel, updateData);

    return await this.panelRepository.save(panel);
  }

  async remove(id: number) {
    const panel = await this.panelRepository.findOne({
      where: { id },
    });

    if (!panel) {
      throw new NotFoundException(`Painel com ID ${id} não encontrado`);
    }

    await this.panelRepository.softDelete(id);

    return {
      message: `Painel ${panel.name} removido com sucesso`,
      id,
    };
  }
}
