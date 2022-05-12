import { FolderRepository, RoleRepository, SnippetRepository, UserRepository } from '@sharingan/database';

import CreateFolderDto from './src/folders/dtos/create-folder-dto';
import CreateUserRootFolderDto from './src/folders/dtos/create-user-root-folder-dto';
import FolderService from './src/folders/folder.service';
import NewsletterService from './src/newsletters/newsletter.service';
import CreateRoleDto from './src/roles/dtos/create-role-dto';
import RoleService from './src/roles/role.service';
import CreateSnippetDto from './src/snippets/dtos/create-snippet-dto';
import SnippetService from './src/snippets/snippet.service';
import CreateUserDto from './src/users/dtos/create-user-dto';
import UpdateUserDto from './src/users/dtos/update-user-dto';
import UserService from './src/users/user.service';

const roleService = new RoleService(new RoleRepository());
const userService = new UserService(new UserRepository());
const newsletterService = new NewsletterService();
const folderService = new FolderService(new FolderRepository());
const snippetService = new SnippetService(new SnippetRepository());

export {
  folderService,
  newsletterService,
  roleService,
  snippetService,
  userService,
  CreateRoleDto,
  CreateUserDto,
  UpdateUserDto,
  CreateFolderDto,
  CreateSnippetDto,
  CreateUserRootFolderDto,
};
export type { NewsletterService, RoleService, UserService, FolderService, SnippetService };
