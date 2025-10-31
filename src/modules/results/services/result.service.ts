import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Result } from '../entities/result.entity';
import { CreateResultDto } from '../dto/create-result.dto';
import { UpdateResultDto } from '../dto/update-result.dto';
import { ValidateResultDto } from '../dto/validate-result.dto';
import { Sample } from '../../samples/entities/sample.entity';
import { Test } from '../../tests/entities/test.entity';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    @InjectRepository(Sample)
    private readonly sampleRepository: Repository<Sample>,
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
  ) {}

  async create(createResultDto: CreateResultDto): Promise<Result> {
    // Validate sample exists
    const sample = await this.sampleRepository.findOne({
      where: { id: createResultDto.sampleId, deletedAt: IsNull() },
    });
    if (!sample) {
      throw new NotFoundException(`Sample with ID ${createResultDto.sampleId} not found`);
    }

    // Validate test exists
    const test = await this.testRepository.findOne({
      where: { id: createResultDto.testId, deletedAt: IsNull() },
    });
    if (!test) {
      throw new NotFoundException(`Test with ID ${createResultDto.testId} not found`);
    }

    // Auto-calculate flag based on reference values for numeric tests
    let flag = createResultDto.flag;
    if (test.type === 'numeric' && createResultDto.numericValue !== undefined) {
      flag = this.calculateFlag(
        createResultDto.numericValue,
        test.referenceMin,
        test.referenceMax,
      );
    }

    // Set entered_at timestamp
    const enteredAt = new Date();

    const result = this.resultRepository.create({
      ...createResultDto,
      flag,
      enteredAt,
      referenceRange: createResultDto.referenceRange || this.buildReferenceRange(test),
      unit: createResultDto.unit || test.unit,
      method: createResultDto.method || test.method,
    });

    return await this.resultRepository.save(result);
  }

  async findAll(filters?: {
    sampleId?: number;
    testId?: number;
    companyId?: number;
    status?: string;
    flag?: string;
  }): Promise<Result[]> {
    const query = this.resultRepository.createQueryBuilder('result')
      .leftJoinAndSelect('result.sample', 'sample')
      .leftJoinAndSelect('result.test', 'test')
      .leftJoinAndSelect('result.company', 'company')
      .leftJoinAndSelect('result.enteredByUser', 'enteredByUser')
      .leftJoinAndSelect('result.validatedByUser', 'validatedByUser')
      .where('result.deletedAt IS NULL');

    if (filters?.sampleId) {
      query.andWhere('result.sampleId = :sampleId', { sampleId: filters.sampleId });
    }

    if (filters?.testId) {
      query.andWhere('result.testId = :testId', { testId: filters.testId });
    }

    if (filters?.companyId) {
      query.andWhere('result.companyId = :companyId', { companyId: filters.companyId });
    }

    if (filters?.status) {
      query.andWhere('result.status = :status', { status: filters.status });
    }

    if (filters?.flag) {
      query.andWhere('result.flag = :flag', { flag: filters.flag });
    }

    query.orderBy('result.createdAt', 'DESC');

    return await query.getMany();
  }

  async findOne(id: number): Promise<Result> {
    const result = await this.resultRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['sample', 'test', 'company', 'enteredByUser', 'validatedByUser', 'reviewedByUser'],
    });

    if (!result) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }

    return result;
  }

  async findByPatient(patientId: number): Promise<Result[]> {
    return await this.resultRepository.createQueryBuilder('result')
      .leftJoinAndSelect('result.sample', 'sample')
      .leftJoinAndSelect('sample.orderItem', 'orderItem')
      .leftJoinAndSelect('orderItem.order', 'order')
      .leftJoinAndSelect('result.test', 'test')
      .where('order.patientId = :patientId', { patientId })
      .andWhere('result.deletedAt IS NULL')
      .orderBy('result.createdAt', 'DESC')
      .getMany();
  }

  async update(id: number, updateResultDto: UpdateResultDto): Promise<Result> {
    const result = await this.findOne(id);

    // If result is already validated or released, prevent updates
    if (result.status === 'released') {
      throw new BadRequestException('Cannot update a released result. Create a correction instead.');
    }

    // Recalculate flag if numeric value changed
    if (updateResultDto.numericValue !== undefined && result.test.type === 'numeric') {
      updateResultDto.flag = this.calculateFlag(
        updateResultDto.numericValue,
        result.test.referenceMin,
        result.test.referenceMax,
      );
    }

    Object.assign(result, updateResultDto);
    return await this.resultRepository.save(result);
  }

  async validate(id: number, validateDto: ValidateResultDto): Promise<Result> {
    const result = await this.findOne(id);

    if (result.status === 'released') {
      throw new BadRequestException('Cannot validate a released result');
    }

    result.validatedBy = validateDto.validatedBy;
    result.validatedAt = new Date();
    result.status = 'validated';
    
    if (validateDto.comments) {
      result.comments = validateDto.comments;
    }

    return await this.resultRepository.save(result);
  }

  async release(id: number, reviewedBy: number): Promise<Result> {
    const result = await this.findOne(id);

    if (result.status !== 'validated') {
      throw new BadRequestException('Result must be validated before release');
    }

    result.reviewedBy = reviewedBy;
    result.reviewedAt = new Date();
    result.status = 'released';

    return await this.resultRepository.save(result);
  }

  async createCorrection(
    originalId: number,
    correctionDto: CreateResultDto,
    correctionReason: string,
  ): Promise<Result> {
    const originalResult = await this.findOne(originalId);

    // Mark original as corrected
    originalResult.isCorrected = true;
    await this.resultRepository.save(originalResult);

    // Create new corrected result
    const correctedResult = this.resultRepository.create({
      ...correctionDto,
      correctedFromId: originalId,
      correctionReason,
      status: 'pending',
    });

    return await this.resultRepository.save(correctedResult);
  }

  async delete(id: number): Promise<void> {
    const result = await this.findOne(id);
    
    if (result.status === 'released') {
      throw new BadRequestException('Cannot delete a released result. Create a correction instead.');
    }

    result.deletedAt = new Date();
    await this.resultRepository.save(result);
  }

  private calculateFlag(value: number, min?: number, max?: number): string {
    if (min === undefined || max === undefined) {
      return 'normal';
    }

    const criticalLowThreshold = min * 0.5;
    const criticalHighThreshold = max * 1.5;

    if (value < criticalLowThreshold) {
      return 'critical_low';
    } else if (value < min) {
      return 'low';
    } else if (value > criticalHighThreshold) {
      return 'critical_high';
    } else if (value > max) {
      return 'high';
    } else {
      return 'normal';
    }
  }

  private buildReferenceRange(test: Test): string {
    if (test.type === 'numeric' && test.referenceMin !== undefined && test.referenceMax !== undefined) {
      return `${test.referenceMin}-${test.referenceMax} ${test.unit || ''}`;
    } else if (test.referenceText) {
      return test.referenceText;
    }
    return '';
  }
}
