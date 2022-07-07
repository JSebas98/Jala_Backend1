import { UserDomain } from "../shared/types";

export interface UserServiceInterface {
    getSingleUser(userId: string): Promise<UserDomain | null>;
}