import Folder from './src/entities/folder';
import Role, { RoleName } from './src/entities/role';
import Session from './src/entities/session';
import Snippet, { SnippetVisibility } from './src/entities/snippet';
import User, { OauthProvider } from './src/entities/user';
import prisma, { PrismaClient } from './src/prisma';
import FolderRepository from './src/repositories/folder.repository';
import FolderRepositoryInterface from './src/repositories/interfaces/folder';
import RoleRepositoryInterface from './src/repositories/interfaces/role';
import SnippetRepositoryInterface from './src/repositories/interfaces/snippet';
import UserRepositoryInterface from './src/repositories/interfaces/user';
import RoleRepository from './src/repositories/role.repository';
import SnippetRepository from './src/repositories/snippet.repository';
import UserRepository from './src/repositories/user.repository';
import dbId from './src/utils/id';

export { prisma as dbClient, PrismaClient };
export { dbId };
export type { Role, RoleName, User, OauthProvider, Folder, Session, Snippet, SnippetVisibility };
export type { FolderRepositoryInterface, RoleRepositoryInterface, SnippetRepositoryInterface, UserRepositoryInterface };
export { RoleRepository, UserRepository, FolderRepository, SnippetRepository };
