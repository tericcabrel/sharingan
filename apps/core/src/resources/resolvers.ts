import { Resolvers } from '../types/graphql';
import { allSnippets } from './snippets/queries/allSnippets';
import { listFolders } from './folders/queries/list-folders';
import { createSnippet } from './snippets/mutations/createSnippet';
import { createFolder } from './folders/mutations/createFolder';
import { subscribeToNewsletter } from './newsletter/mutations/subscribe';
import { mySnippets } from './snippets/queries/mySnippets';
import { logoutUser } from './users/mutations/logout-user';
import { authenticatedUser } from './users/queries/authenticated-user';
import { deleteFolders } from './folders/mutations/deleteFolders';
import { dateScalar } from './types/date';

export const resolvers: Resolvers = {
  Date: dateScalar,
  Folder: {
    parent: (folder, _args, context) => {
      return context.db.folder.findById(folder.parentId);
    },
    subFolders: (folder, _args, context) => {
      return context.db.folder.findSubFolders(folder.id);
    },
    user: (folder, _args, context) => {
      return context.db.user.findById(folder.userId);
    },
  },
  Mutation: {
    createFolder,
    createSnippet,
    deleteFolders,
    logoutUser,
    subscribeToNewsletter,
  },
  Query: {
    allSnippets,
    authenticatedUser,
    listFolders,
    mySnippets,
  },
  Snippet: {
    folder: (snippet, _args, context) => {
      return context.db.folder.findById(snippet.folderId);
    },
    user: (snippet, _args, context) => {
      return context.db.user.findById(snippet.userId);
    },
  },
  User: {
    folders: (user, _args, context) => {
      return context.db.folder.findUserFolders(user.id);
    },
    role: (user, _args, context) => {
      return context.db.role.findById(user.roleId);
    },
  },
};
