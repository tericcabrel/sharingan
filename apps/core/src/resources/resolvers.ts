import { Resolvers } from '../types/graphql';
import { dateScalar } from './types/date';
import { createFolder } from './folders/createFolder';
import { subscribeToNewsletter } from './newsletter/mutations/subscribe';
import { logoutUser } from './users/mutations/logout-user';
import { authenticatedUser } from './users/queries/authenticated-user';

export const resolvers: Resolvers = {
  Date: dateScalar,
  Folder: {
    parent: (folder, _args, context) => {
      return context.db.folder.findById(folder.parentId);
    },
    user: (folder, _args, context) => {
      return context.db.user.findById(folder.userId);
    },
  },
  Mutation: {
    createFolder,
    logoutUser,
    subscribeToNewsletter,
  },
  Query: {
    authenticatedUser,
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
