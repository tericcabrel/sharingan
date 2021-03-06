import { Folder, dbClient } from '@sharingan/database';
import SharinganError, { errors } from '@sharingan/utils';

import CreateFolderDto from './dtos/create-folder-dto';
import CreateUserRootFolderDto from './dtos/create-user-root-folder-dto';
import { isFoldersBelongToUser, isFoldersContainRoot } from './utils/folders';

export default class FolderService {
  async createUserRootFolder(dto: CreateUserRootFolderDto): Promise<Folder> {
    const input = dto.toFolder();

    return dbClient.folder.create({
      data: {
        id: input.id,
        name: input.name,
        parentId: input.parentId,
        userId: input.userId,
      },
    });
  }

  async create(createFolderDto: CreateFolderDto): Promise<Folder> {
    const isFolderExist = await this.isFolderExistInParentFolder({
      folderName: createFolderDto.name,
      parentFolderId: createFolderDto.parentFolderId,
      userId: createFolderDto.user,
    });

    if (isFolderExist) {
      throw new SharinganError(errors.FOLDER_ALREADY_EXIST(createFolderDto.name), 'FOLDER_ALREADY_EXIST');
    }

    const input = createFolderDto.toFolder();

    return dbClient.folder.create({
      data: {
        id: input.id,
        name: input.name,
        parentId: input.parentId,
        userId: input.userId,
      },
    });
  }

  async findUserFolders(userId: string): Promise<Folder[]> {
    return dbClient.folder.findMany({ orderBy: { name: 'asc' }, where: { userId } });
  }

  async findById(id: string): Promise<Folder | null> {
    return dbClient.folder.findUnique({ where: { id } });
  }

  async findUserRootFolder(userId: string): Promise<Folder> {
    const folders = await this.findUserFolders(userId);

    const rootFolder = folders.find((folder) => folder.parentId === null);

    if (!rootFolder) {
      throw new SharinganError(errors.USER_ROOT_FOLDER_NOT_FOUND(userId), 'USER_ROOT_FOLDER_NOT_FOUND');
    }

    return rootFolder;
  }

  async findSubFolders(userId: string, folderId?: string | null): Promise<Folder[]> {
    if (folderId) {
      return this.findFolderSubFolders(folderId, userId);
    }

    const rootFolder = await this.findUserRootFolder(userId);

    return this.findFolderSubFolders(rootFolder.id, userId);
  }

  async deleteMany(folderIds: string[], userId: string): Promise<void> {
    const foldersToDelete = await dbClient.folder.findMany({
      where: {
        id: {
          in: folderIds,
        },
        userId,
      },
    });

    if (!isFoldersBelongToUser(foldersToDelete, userId)) {
      throw new SharinganError(errors.FOLDERS_DONT_BELONG_TO_USER, 'FOLDERS_DONT_BELONG_TO_USER');
    }

    if (isFoldersContainRoot(foldersToDelete)) {
      throw new SharinganError(errors.CANT_DELETE_ROOT_FOLDER, 'CANT_DELETE_ROOT_FOLDER');
    }

    // TODO Delete snippets

    const ids = foldersToDelete.map((folder) => folder.id);

    await dbClient.folder.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  private findFolderSubFolders(folderId: string, userId: string): Promise<Folder[]> {
    return dbClient.folder.findMany({
      where: {
        parentId: folderId,
        userId,
      },
    });
  }

  private async isFolderExistInParentFolder(args: {
    folderName: string;
    parentFolderId: string;
    userId: string;
  }): Promise<boolean> {
    const folders = await this.findSubFolders(args.userId, args.parentFolderId);

    return folders.some((folder) => folder.name.toLowerCase() === args.folderName.trim().toLowerCase());
  }
}
