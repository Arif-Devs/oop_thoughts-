import { SQLWrapper } from "drizzle-orm";
import { PgColumn, PgTable } from "drizzle-orm/pg-core";

export type ID = string | number;
export type OrderDirection = "asc" | "desc";

export type FindOptionsSQL = {
  where?: SQLWrapper;
  limit?: number;
  offset?: number;
  orderBy?: {
    column: PgColumn;
    direction: OrderDirection;
  }[];
};

export interface IBaseRepository<TTable extends PgTable & { id: SQLWrapper }> {
  //Queries
  findAll(options?: FindOptionsSQL): Promise<TTable["$inferSelect"][]>;
  findById(id: ID): Promise<TTable["$inferSelect"] | null>;
  findOne(where: SQLWrapper): Promise<TTable["$inferSelect"] | null>;
  findAndCount(
    options?: FindOptionsSQL
  ): Promise<[TTable["$inferSelect"][], number]>;

  count(where?: SQLWrapper): Promise<number>;
  checkExists(where: SQLWrapper): Promise<boolean>;

  //Mutation: create

  create(data: TTable["$inferInsert"]): Promise<TTable["$inferSelect"]>;
  createMany(data: TTable["$inferInsert"][]): Promise<TTable["$inferSelect"][]>;

  //Mutation: update

  update(
    id: ID,
    data: Partial<TTable["$inferInsert"]>
  ): Promise<TTable["$inferSelect"] | null>;
  updateMany(
    data: (Partial<TTable["$inferInsert"]> & { id: string })[]
  ): Promise<TTable["$inferSelect"][]>;

  //Mutation: Delete
  delete(id: string): Promise<void>;
  deleteMany(ids: ID[]): Promise<void>;
}
