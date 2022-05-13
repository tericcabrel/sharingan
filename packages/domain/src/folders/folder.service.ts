import { Folder, FolderRepository } from '@sharingan/database';
import SharinganError, { errors } from '@sharingan/utils';

import CreateFolderDto from './dtos/create-folder-dto';
import CreateUserRootFolderDto from './dtos/create-user-root-folder-dto';
import { isFoldersBelongToUser, isFoldersContainRoot } from './utils/folders';

export default class FolderService {
  constructor(private folderRepository: FolderRepository) {}

  async createUserRootFolder(dto: CreateUserRootFolderDto): Promise<void> {
    await this.folderRepository.create(dto.toFolder());
  }

  async create(createFolderDto: CreateFolderDto): Promise<Folder> {
    const isFolderExist = await this.isFolderExistInParentFolder(createFolderDto.parentFolderId, createFolderDto.name);

    if (isFolderExist) {
      throw new SharinganError(errors.FOLDER_ALREADY_EXIST(createFolderDto.name), 'FOLDER_ALREADY_EXIST');
    }

    return this.folderRepository.create(createFolderDto.toFolder());
  }

  async findUserFolders(userId: string): Promise<Folder[]> {
    return this.folderRepository.findByUser(userId);
  }

  async findById(id: string): Promise<Folder | null> {
    return this.folderRepository.findById(id);
  }

  async findUserRootFolder(userId: string): Promise<Folder | null> {
    const folders = await this.findUserFolders(userId);

    const rootFolder = folders.find((folder) => folder.parentId === null);

    return rootFolder ?? null;
  }

  async findSubFolders(folderId: string): Promise<Folder[]> {
    return this.folderRepository.findSubFolders(folderId);
  }

  async isFolderExistInParentFolder(parentFolderId: string, folderName: string): Promise<boolean> {
    const folders = await this.findSubFolders(parentFolderId);

    return folders.some((folder) => folder.name.toLowerCase() === folderName.trim().toLowerCase());
  }

  async deleteMany(folderIds: string[], userId: string): Promise<void> {
    const foldersToDelete = await this.findFolders(folderIds);

    if (!isFoldersBelongToUser(foldersToDelete, userId)) {
      throw new SharinganError(errors.FOLDERS_DONT_BELONG_TO_USER, 'FOLDERS_DONT_BELONG_TO_USER');
    }

    if (isFoldersContainRoot(foldersToDelete)) {
      throw new SharinganError(errors.CANT_DELETE_ROOT_FOLDER, 'CANT_DELETE_ROOT_FOLDER');
    }

    // TODO Delete snippets

    return this.folderRepository.bulkDelete(folderIds);
  }

  findFolders(folderIds: string[]): Promise<Folder[]> {
    return this.folderRepository.findFolders(folderIds);
  }
}
