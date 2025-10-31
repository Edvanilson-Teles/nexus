import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sample, SampleStatus } from '../entities/sample.entity';
import { CreateSampleDto } from '../dto/create-sample.dto';
import { UpdateSampleDto } from '../dto/update-sample.dto';
import { OrderItem, OrderItemStatus } from 'src/modules/orders/entities/order-item.entity';

@Injectable()
export class SampleService {
  constructor(
    @InjectRepository(Sample)
    private readonly sampleRepository: Repository<Sample>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(createSampleDto: CreateSampleDto) {
    // Validar item da ordem
    const orderItem = await this.orderItemRepository.findOne({
      where: { id: createSampleDto.orderItemId },
      relations: ['order'],
    });

    if (!orderItem) {
      throw new NotFoundException(
        `Item da ordem com ID ${createSampleDto.orderItemId} não encontrado`,
      );
    }

    // Gerar código de barras único
    const barcode = await this.generateBarcode();

    // Criar amostra
    const sample = this.sampleRepository.create({
      ...createSampleDto,
      barcode,
      status: SampleStatus.COLLECTED,
      collectedAt: new Date(),
    });

    const savedSample = await this.sampleRepository.save(sample);

    // Atualizar status do item da ordem
    await this.orderItemRepository.update(orderItem.id, {
      status: OrderItemStatus.COLLECTED,
    });

    return savedSample;
  }

  async findAll(
    status?: SampleStatus,
    orderItemId?: number,
    barcode?: string,
  ) {
    const query = this.sampleRepository
      .createQueryBuilder('sample')
      .leftJoinAndSelect('sample.orderItem', 'orderItem')
      .leftJoinAndSelect('orderItem.order', 'order')
      .leftJoinAndSelect('order.patient', 'patient')
      .leftJoinAndSelect('sample.collectedBy', 'collectedBy');

    if (status) {
      query.andWhere('sample.status = :status', { status });
    }

    if (orderItemId) {
      query.andWhere('sample.orderItemId = :orderItemId', { orderItemId });
    }

    if (barcode) {
      query.andWhere('sample.barcode LIKE :barcode', {
        barcode: `%${barcode}%`,
      });
    }

    query.orderBy('sample.createdAt', 'DESC');

    return await query.getMany();
  }

  async findOne(id: number) {
    const sample = await this.sampleRepository.findOne({
      where: { id },
      relations: [
        'orderItem',
        'orderItem.order',
        'orderItem.order.patient',
        'orderItem.test',
        'orderItem.panel',
        'collectedBy',
      ],
    });

    if (!sample) {
      throw new NotFoundException(`Amostra com ID ${id} não encontrada`);
    }

    return sample;
  }

  async findByBarcode(barcode: string) {
    const sample = await this.sampleRepository.findOne({
      where: { barcode },
      relations: [
        'orderItem',
        'orderItem.order',
        'orderItem.order.patient',
        'orderItem.test',
        'collectedBy',
      ],
    });

    if (!sample) {
      throw new NotFoundException(
        `Amostra com código de barras ${barcode} não encontrada`,
      );
    }

    return sample;
  }

  async update(id: number, updateSampleDto: UpdateSampleDto) {
    const sample = await this.findOne(id);

    await this.sampleRepository.update(id, updateSampleDto);

    // Se marcar como analisada, atualizar o item da ordem
    if (updateSampleDto.status === SampleStatus.ANALYZED) {
      await this.orderItemRepository.update(sample.orderItemId, {
        status: OrderItemStatus.COMPLETED,
      });
    }

    // Se rejeitar, atualizar o item também
    if (updateSampleDto.status === SampleStatus.REJECTED) {
      await this.orderItemRepository.update(sample.orderItemId, {
        status: OrderItemStatus.REJECTED,
      });
    }

    return await this.findOne(id);
  }

  async reject(id: number, reason: string) {
    const sample = await this.findOne(id);

    await this.sampleRepository.update(id, {
      status: SampleStatus.REJECTED,
      isAcceptable: false,
      rejectionReason: reason,
    });

    await this.orderItemRepository.update(sample.orderItemId, {
      status: OrderItemStatus.REJECTED,
    });

    return {
      message: `Amostra ${sample.barcode} rejeitada`,
      id,
    };
  }

  private async generateBarcode(): Promise<string> {
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    // Contar amostras do dia
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const count = await this.sampleRepository
      .createQueryBuilder('sample')
      .where('sample.createdAt BETWEEN :start AND :end', {
        start: startOfDay,
        end: endOfDay,
      })
      .getCount();

    const sequence = (count + 1).toString().padStart(6, '0');

    return `SMP${year}${month}${day}${sequence}`;
  }
}
