import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

@Injectable()
export class PrismaService extends PrismaClient {
	constructor() {
		const pool = new Pool({
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			user: process.env.POSTGRES_USER,
			password: String(process.env.POSTGRES_PASSWORD),
			database: process.env.POSTGRES_DATABASE
		})

		const adapter = new PrismaPg(pool)
		super({ adapter })
	}
}
