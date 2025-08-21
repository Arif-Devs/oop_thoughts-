import {integer, pgEnum, pgTable, timestamp, uuid, varchar} from 'drizzle-orm/pg-core'
import { Many, relations } from 'drizzle-orm'
import {createInsertSchema} from 'drizzle-zod'
import { z } from 'zod'
import { BookTable } from './book'


export const UserRole = pgEnum('user_role',['admin', 'user'])
export const UserStatus = pgEnum('user_status', ['active', 'inactive'])


export const UserTable = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', {length: 20}).notNull(),
    email: varchar('email', {length: 50}).notNull().unique(),
    password: varchar('password', {length:225}).notNull(),
    role: UserRole('role').default('user'),
    status: UserStatus('status').default('active'),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow()

});

export type User = typeof UserTable.$inferSelect

export const NewUserSchema = createInsertSchema(UserTable).omit({
    id: true,
    createdAt: true,
    updatedAt: true

})

export type NewUser = z.infer<typeof NewUserSchema>;

export const UpdateUserSchema = createInsertSchema(UserTable).omit({
    id: true,
    createdAt: true,
    updatedAt: true
}).partial()

export type UpdateUser = z.infer<typeof UpdateUserSchema>

export const UserRelations = relations(UserTable, ({many})=>({
    books: many(BookTable),
}))



