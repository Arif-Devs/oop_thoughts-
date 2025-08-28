import {integer, pgEnum, pgTable, text, timestamp, uuid, varchar} from 'drizzle-orm/pg-core'
import { UserTable } from './user'
import { relations } from 'drizzle-orm'



export const PublisherTable = pgTable('publishers',{
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', {length: 225}).notNull(),
    description: text('description').notNull(),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow(),
})


export type Publishers = typeof PublisherTable.$inferSelect;
export type NewPublisher = typeof PublisherTable.$inferInsert;
export type UpdatePublisher = Partial<NewPublisher>;


export const BookGenreTable = pgTable('books_genre',{
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', {length: 255}).notNull(),
    description: text('description').notNull(),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow() 

})


export type BookGenre = typeof BookGenreTable.$inferSelect
export type NewBookGenre = typeof BookGenreTable.$inferInsert
export type UpdateBookGenre = Partial<NewBookGenre>


export const BookStatus = pgEnum('book_status', ['draft', 'publisher', 'archived'])


export const BookTable = pgTable('books', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', {length: 255}).notNull(),
    publisher: uuid('publisher_id').references(()=>PublisherTable.id,{
        onDelete: 'set null'
    }),
    author: uuid('author_id').references(()=>UserTable.id,{
        onDelete: 'cascade'
    }),
    summery: text('summery').notNull(),
    status: BookStatus('status').default('draft'),
    pages: integer('pages').notNull(),
    genre: uuid('genre_id').references(()=>BookGenreTable.id,{
        onDelete: 'set null'
    }),
    publishedAt: timestamp('published_at', {withTimezone: true}).notNull(),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow()

})


export const BookRelation = relations(BookTable, ({one})=>({
    author: one(UserTable, {
        fields:[BookTable.author],
        references: [UserTable.id]
    }),

    publisher: one(PublisherTable, {
        fields: [BookTable.publisher],
        references: [PublisherTable.id]
    }),

    genre: one(BookGenreTable, {
        fields: [BookTable.genre],
        references: [BookGenreTable.id]
    })

}))


export const BookGenreRelation = relations(BookGenreTable, ({many})=>({
    books: many(BookTable)
}))

export const PublisherRelation = relations(PublisherTable, ({many})=>({
    books: many(BookTable)
}))