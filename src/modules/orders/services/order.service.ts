import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Patient } from 'src/modules/patients/entities/patient.entity';
import { Company } from 'src/modules/organization/modules/company/entities/company.entity';
import { Test } from 'src/modules/tests/entities/test.entity';
import { TestPanel } from 'src/modules/tests/entities/test-panel.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
    @InjectRepository(TestPanel)
    private readonly panelRepository: Repository<TestPanel>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    // Validar paciente
    const patient = await this.patientRepository.findOne({
      where: { id: createOrderDto.patientId },
    });
    if (!patient) {
      throw new NotFoundException(
        `Paciente com ID ${createOrderDto.patientId} não encontrado`,
      );
    }

    // Validar empresa
    const company = await this.companyRepository.findOne({
      where: { id: createOrderDto.companyId },
    });
    if (!company) {
      throw new NotFoundException(
        `Empresa com ID ${createOrderDto.companyId} não encontrada`,
      );
    }

    // Validar itens
    for (const item of createOrderDto.items) {
      if (!item.testId && !item.panelId) {
        throw new BadRequestException(
          'Cada item deve ter um testId ou panelId',
        );
      }

      if (item.testId) {
        const test = await this.testRepository.findOne({
          where: { id: item.testId },
        });
        if (!test) {
          throw new NotFoundException(`Exame com ID ${item.testId} não encontrado`);
        }
      }

      if (item.panelId) {
        const panel = await this.panelRepository.findOne({
          where: { id: item.panelId },
        });
        if (!panel) {
          throw new NotFoundException(`Painel com ID ${item.panelId} não encontrado`);
        }
      }
    }

    // Gerar número único da ordem
    const orderNumber = await this.generateOrderNumber();

    // Criar ordem
    const order = this.orderRepository.create({
      ...createOrderDto,
      orderNumber,
      scheduledAt: createOrderDto.scheduledAt
        ? new Date(createOrderDto.scheduledAt)
        : undefined,
    });

    // Criar itens
    order.items = createOrderDto.items.map((itemDto) =>
      this.orderItemRepository.create({
        testId: itemDto.testId,
        panelId: itemDto.panelId,
        price: itemDto.price,
        quantity: itemDto.quantity || 1,
        discount: itemDto.discount || 0,
        notes: itemDto.notes,
      }),
    );

    const savedOrder = await this.orderRepository.save(order);
    return await this.findOne(savedOrder.id);
  }

  async findAll(
    status?: OrderStatus,
    patientId?: number,
    companyId?: number,
  ) {
    const query = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.patient', 'patient')
      .leftJoinAndSelect('order.requestedBy', 'requestedBy')
      .leftJoinAndSelect('order.items', 'items')
      .leftJoinAndSelect('items.test', 'test')
      .leftJoinAndSelect('items.panel', 'panel');

    if (status) {
      query.andWhere('order.status = :status', { status });
    }

    if (patientId) {
      query.andWhere('order.patientId = :patientId', { patientId });
    }

    if (companyId) {
      query.andWhere('order.companyId = :companyId', { companyId });
    }

    query.orderBy('order.createdAt', 'DESC');

    return await query.getMany();
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['patient', 'requestedBy', 'items', 'items.test', 'items.panel'],
    });

    if (!order) {
      throw new NotFoundException(`Ordem com ID ${id} não encontrada`);
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);

    const updateData: any = { ...updateOrderDto };

    if (updateOrderDto.scheduledAt) {
      updateData.scheduledAt = new Date(updateOrderDto.scheduledAt);
    }

    // Atualizar datas baseado no status
    if (updateOrderDto.status) {
      if (updateOrderDto.status === OrderStatus.COLLECTED && !order.collectedAt) {
        updateData.collectedAt = new Date();
      }
      if (updateOrderDto.status === OrderStatus.COMPLETED && !order.completedAt) {
        updateData.completedAt = new Date();
      }
    }

    await this.orderRepository.update(id, updateData);

    return await this.findOne(id);
  }

  async cancel(id: number) {
    const order = await this.findOne(id);

    if (order.status === OrderStatus.COMPLETED) {
      throw new BadRequestException('Não é possível cancelar uma ordem concluída');
    }

    await this.orderRepository.update(id, {
      status: OrderStatus.CANCELLED,
    });

    return {
      message: `Ordem ${order.orderNumber} cancelada com sucesso`,
      id,
    };
  }

  private async generateOrderNumber(): Promise<string> {
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    // Contar ordens do dia
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const count = await this.orderRepository
      .createQueryBuilder('order')
      .where('order.createdAt BETWEEN :start AND :end', {
        start: startOfDay,
        end: endOfDay,
      })
      .getCount();

    const sequence = (count + 1).toString().padStart(4, '0');

    return `ORD${year}${month}${day}${sequence}`;
  }
}
