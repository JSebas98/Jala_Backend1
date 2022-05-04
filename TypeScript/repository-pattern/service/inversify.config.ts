import { Container } from "inversify";
import { UserRepository } from '../infrastructure/repository-implementation/UserRepository';
import { UserService } from './UserService';
import { types } from "../src/types";

export const myContainer = new Container();
myContainer.bind<UserRepository>(types.UserRepository).to(UserService);