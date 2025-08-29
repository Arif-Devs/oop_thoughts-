import { UserTable } from "@/db/schemas";
import { BaseRepository } from "../core/BaseRepository";

export class userRepository extends BaseRepository<typeof UserTable> {}
