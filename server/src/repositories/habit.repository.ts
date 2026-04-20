import { Habit, Prisma, PrismaClient } from '@prisma/client';
import { prisma as defaultPrisma } from '../infrastructure/prisma';

export class HabitRepository {
  constructor(private readonly prisma: PrismaClient = defaultPrisma) {}

  async findByUserId(userId: string): Promise<Habit[]> {
    return this.prisma.habit.findMany({ where: { userId } });
  }

  async findByIdsAndUserId(userId: string, ids: string[]): Promise<Habit[]> {
    return this.prisma.habit.findMany({
      where: { userId, id: { in: ids } },
    });
  }

  async transaction(operations: Prisma.PrismaPromise<unknown>[]): Promise<unknown[]> {
    return this.prisma.$transaction(operations);
  }

  createOperation(data: Prisma.HabitUncheckedCreateInput) {
    return this.prisma.habit.create({ data });
  }

  updateOperation(id: string, data: Prisma.HabitUncheckedUpdateInput) {
    return this.prisma.habit.update({ where: { id }, data });
  }
}
