import { BookTable } from "@/db/schemas";
import { BookRepository } from "@/repository/BookRepository";
import { BaseService } from "@/lib/core/BaseService";

export class BookService extends BaseService<
  typeof BookTable,
  BookRepository
> {}
