import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Role, User, Folder, Snippet } from 'models';
import { AppContext } from './common';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info?: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
};

export type CreateFolderInput = {
  name: Scalars['String'];
  parentId: Scalars['String'];
};

export type CreateSnippetInput = {
  __typename?: 'CreateSnippetInput';
  content: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  folderId: Scalars['String'];
  language: Scalars['String'];
  name: Scalars['String'];
  size: Scalars['Int'];
  visibility: SnippetVisibility;
};

export type Folder = {
  __typename?: 'Folder';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  isFavorite: Scalars['Boolean'];
  name: Scalars['String'];
  parent?: Maybe<Folder>;
  subFolders: Array<Folder>;
  updatedAt: Scalars['Date'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createFolder: Folder;
  createSnippet: Folder;
  deleteFolders: Scalars['Boolean'];
  logoutUser: Scalars['Boolean'];
  subscribeToNewsletter: Result;
};


export type MutationCreateFolderArgs = {
  input: CreateFolderInput;
};


export type MutationCreateSnippetArgs = {
  input: CreateSnippetInput;
};


export type MutationDeleteFoldersArgs = {
  folderIds: Array<Scalars['String']>;
};


export type MutationSubscribeToNewsletterArgs = {
  email: Scalars['String'];
};

export const OauthProvider = {
  Github: 'github',
  Stackoverflow: 'stackoverflow',
  Twitter: 'twitter'
} as const;

export type OauthProvider = typeof OauthProvider[keyof typeof OauthProvider];
export type Query = {
  __typename?: 'Query';
  allSnippets: Array<Snippet>;
  authenticatedUser?: Maybe<User>;
  listFolders: Array<Folder>;
  mySnippets: Array<Snippet>;
};


export type QueryListFoldersArgs = {
  folderId?: InputMaybe<Scalars['String']>;
};

export type Result = {
  __typename?: 'Result';
  message: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  level: Scalars['Int'];
  name: RoleName;
  updatedAt: Scalars['Date'];
};

export const RoleName = {
  Admin: 'admin',
  User: 'user'
} as const;

export type RoleName = typeof RoleName[keyof typeof RoleName];
export type Snippet = {
  __typename?: 'Snippet';
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  folder: Folder;
  id: Scalars['ID'];
  language: Scalars['String'];
  name: Scalars['String'];
  size: Scalars['Int'];
  updatedAt: Scalars['Date'];
  user: User;
  visibility: SnippetVisibility;
};

export const SnippetVisibility = {
  Private: 'private',
  Public: 'public'
} as const;

export type SnippetVisibility = typeof SnippetVisibility[keyof typeof SnippetVisibility];
export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  folders: Array<Folder>;
  id: Scalars['ID'];
  isEnabled: Scalars['Boolean'];
  name: Scalars['String'];
  oauthProvider?: Maybe<OauthProvider>;
  pictureUrl?: Maybe<Scalars['String']>;
  role: Role;
  timezone?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
  username?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateFolderInput: CreateFolderInput;
  CreateSnippetInput: ResolverTypeWrapper<CreateSnippetInput>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Folder: ResolverTypeWrapper<Folder>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  OauthProvider: OauthProvider;
  Query: ResolverTypeWrapper<{}>;
  Result: ResolverTypeWrapper<Result>;
  Role: ResolverTypeWrapper<Role>;
  RoleName: RoleName;
  Snippet: ResolverTypeWrapper<Snippet>;
  SnippetVisibility: SnippetVisibility;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CreateFolderInput: CreateFolderInput;
  CreateSnippetInput: CreateSnippetInput;
  Date: Scalars['Date'];
  Folder: Folder;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  Result: Result;
  Role: Role;
  Snippet: Snippet;
  String: Scalars['String'];
  User: User;
};

export type CreateSnippetInputResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['CreateSnippetInput'] = ResolversParentTypes['CreateSnippetInput']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  folderId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  visibility?: Resolver<ResolversTypes['SnippetVisibility'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type FolderResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Folder'] = ResolversParentTypes['Folder']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isFavorite?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['Folder']>, ParentType, ContextType>;
  subFolders?: Resolver<Array<ResolversTypes['Folder']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createFolder?: Resolver<ResolversTypes['Folder'], ParentType, ContextType, RequireFields<MutationCreateFolderArgs, 'input'>>;
  createSnippet?: Resolver<ResolversTypes['Folder'], ParentType, ContextType, RequireFields<MutationCreateSnippetArgs, 'input'>>;
  deleteFolders?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteFoldersArgs, 'folderIds'>>;
  logoutUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  subscribeToNewsletter?: Resolver<ResolversTypes['Result'], ParentType, ContextType, RequireFields<MutationSubscribeToNewsletterArgs, 'email'>>;
};

export type QueryResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allSnippets?: Resolver<Array<ResolversTypes['Snippet']>, ParentType, ContextType>;
  authenticatedUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  listFolders?: Resolver<Array<ResolversTypes['Folder']>, ParentType, ContextType, Partial<QueryListFoldersArgs>>;
  mySnippets?: Resolver<Array<ResolversTypes['Snippet']>, ParentType, ContextType>;
};

export type ResultResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Result'] = ResolversParentTypes['Result']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoleResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['RoleName'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SnippetResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Snippet'] = ResolversParentTypes['Snippet']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  folder?: Resolver<ResolversTypes['Folder'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  visibility?: Resolver<ResolversTypes['SnippetVisibility'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  folders?: Resolver<Array<ResolversTypes['Folder']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  oauthProvider?: Resolver<Maybe<ResolversTypes['OauthProvider']>, ParentType, ContextType>;
  pictureUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  timezone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = AppContext> = {
  CreateSnippetInput?: CreateSnippetInputResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Folder?: FolderResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Result?: ResultResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  Snippet?: SnippetResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

