
import { ExecOptions } from "child_process";
import { SQLWrapper } from "drizzle-orm";
import { PgColumn, PgTable } from "drizzle-orm/pg-core";

export type ID = string | number
export type OrderDirection = 'asc' | 'desc'

export type FindOptionSQL = {
    where?: SQLWrapper,
    limit?: number,
    offset?: number,
    orderBy?:{
        column: PgColumn,
        direction: OrderDirection
    }[]
}

export interface IBaseRepository <TTable extends PgTable & {id: SQLWrapper}>{
    //Queries
    findAll(options?: FindOptionSQL): Promise<TTable['$inferSelect'][]>
    findById(id: ID): Promise<TTable['$inferSelect'] | null>
    findOne(where: SQLWrapper): Promise<TTable['$inferSelect'] | null>
    findAndCount(where: SQLWrapper): Promise<[TTable['$inferSelect'][], number]>

    count(where: SQLWrapper): Promise<number>
    checkExists(where: SQLWrapper): Promise<boolean>


    //Mutation: create

    create(data: TTable['$inferInsert']): Promise<TTable['$inferSelect']>
    createMany(data: TTable['$inferInsert'][]): Promise<TTable['$inferSelect'][]>

    //Mutation: update

    updata(id: ID, data: Partial<TTable['$inferInsert']>): Promise<TTable['$inferSelect']>
    updataMany(data: (Partial<TTable['$inferInsert']> & {id: string})[]): Promise<TTable['$inferSelect'][]>

    //Mutation: Delete
    delete(id: string): Promise<void>
    deleteMany(ids: string[]): Promise<any[]>

}