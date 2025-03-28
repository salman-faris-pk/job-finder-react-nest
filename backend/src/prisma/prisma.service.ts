import { Injectable,OnApplicationShutdown,OnModuleDestroy,OnModuleInit} from '@nestjs/common';
import { PrismaClient } from "@prisma/client"

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy, OnApplicationShutdown {

    async onModuleInit() {
        await this.$connect();
    }

    private async disconnect() {
        await this.$disconnect();
    }

    async onModuleDestroy() {
        await this.disconnect();
    }

    async onApplicationShutdown() {
        await this.disconnect();
    }
}
