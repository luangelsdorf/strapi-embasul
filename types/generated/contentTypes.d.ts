import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAiDesignAiDesign extends Schema.SingleType {
  collectionName: 'ai_designs';
  info: {
    singularName: 'ai-design';
    pluralName: 'ai-designs';
    displayName: 'Produtos - Design Suportado por AI';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    banner: Attribute.Component<'nested.overline-card'> & Attribute.Required;
    highlights: Attribute.Component<'nested.statistics', true> &
      Attribute.SetMinMax<{
        min: 3;
        max: 6;
      }>;
    cta: Attribute.Component<'common.call-to-action'> & Attribute.Required;
    imageNote: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ai-design.ai-design',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ai-design.ai-design',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCompanyCompany extends Schema.SingleType {
  collectionName: 'companies';
  info: {
    singularName: 'company';
    pluralName: 'companies';
    displayName: 'Empresa';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    history: Attribute.Component<'about.our-history'> & Attribute.Required;
    principles: Attribute.Component<'about.principles'> & Attribute.Required;
    structure: Attribute.Component<'about.structure'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::company.company',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::company.company',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactContact extends Schema.SingleType {
  collectionName: 'contacts';
  info: {
    singularName: 'contact';
    pluralName: 'contacts';
    displayName: 'Contato';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    headline: Attribute.Component<'common.title'> & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
    button: Attribute.Component<'common.link'>;
    cta: Attribute.Component<'common.call-to-action'> & Attribute.Required;
    sendBtnLabel: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact.contact',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contact.contact',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCustomCompositionCustomComposition
  extends Schema.SingleType {
  collectionName: 'custom_compositions';
  info: {
    singularName: 'custom-composition';
    pluralName: 'custom-compositions';
    displayName: 'Produtos - Composi\u00E7\u00F5es Customizadas';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    banner: Attribute.Component<'common.title'> & Attribute.Required;
    content: Attribute.Component<'products.content'> & Attribute.Required;
    cta: Attribute.Component<'common.call-to-action'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::custom-composition.custom-composition',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::custom-composition.custom-composition',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDigitalPrintingDigitalPrinting extends Schema.SingleType {
  collectionName: 'digital_printings';
  info: {
    singularName: 'digital-printing';
    pluralName: 'digital-printings';
    displayName: 'Produtos - Impress\u00E3o Digital';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    banner: Attribute.Component<'products.banner-cta'> & Attribute.Required;
    details: Attribute.Component<'products.2-image-content'> &
      Attribute.Required;
    benefits: Attribute.Component<'products.mosaic'>;
    cta: Attribute.Component<'common.call-to-action'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::digital-printing.digital-printing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::digital-printing.digital-printing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFlexoFlexo extends Schema.SingleType {
  collectionName: 'flexos';
  info: {
    singularName: 'flexo';
    pluralName: 'flexos';
    displayName: 'Produtos - Impress\u00E3o Flexogr\u00E1fica';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    banner: Attribute.Component<'products.banner-cta'> & Attribute.Required;
    highlights: Attribute.Component<'nested.icon-card-title', true> &
      Attribute.SetMinMax<{
        min: 2;
        max: 4;
      }>;
    cta: Attribute.Component<'common.call-to-action'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::flexo.flexo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::flexo.flexo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFooterFooter extends Schema.SingleType {
  collectionName: 'footers';
  info: {
    singularName: 'footer';
    pluralName: 'footers';
    displayName: 'Rodap\u00E9';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
    phone: Attribute.String & Attribute.Required;
    address: Attribute.Text & Attribute.Required;
    usefulLinks: Attribute.Component<'common.link', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
        max: 5;
      }>;
    socials: Attribute.Component<'nested.social-icon', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
        max: 3;
      }>;
    email: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHomeHome extends Schema.SingleType {
  collectionName: 'homes';
  info: {
    singularName: 'home';
    pluralName: 'homes';
    displayName: 'Home';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    banner: Attribute.Component<'home.banner'> & Attribute.Required;
    cases: Attribute.Component<'home.cases'> & Attribute.Required;
    serviceHighlights: Attribute.Component<'home.service-highlight', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 4;
        max: 8;
      }>;
    sustainability: Attribute.Component<'home.sustainability'> &
      Attribute.Required;
    certificates: Attribute.Component<'home.certificates'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::home.home', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::home.home', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiPackagingDesignPackagingDesign extends Schema.SingleType {
  collectionName: 'packaging_designs';
  info: {
    singularName: 'packaging-design';
    pluralName: 'packaging-designs';
    displayName: 'Produtos - Design de Embalagens';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    banner: Attribute.Component<'products.banner-cta'> & Attribute.Required;
    highlights: Attribute.Component<'nested.icon-card-title', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 4;
        max: 4;
      }>;
    cta: Attribute.Component<'common.call-to-action'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::packaging-design.packaging-design',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::packaging-design.packaging-design',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPeoplePeople extends Schema.SingleType {
  collectionName: 'peoples';
  info: {
    singularName: 'people';
    pluralName: 'peoples';
    displayName: 'Pessoas';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    banner: Attribute.Component<'products.banner-cta'> & Attribute.Required;
    ethicsChannel: Attribute.Component<'people.ethics-channel'> &
      Attribute.Required;
    ethicsAndConduct: Attribute.Component<'people.ethics-and-conduct'> &
      Attribute.Required;
    people: Attribute.Component<'people.people'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::people.people',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::people.people',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPoliticaDePrivacidadePoliticaDePrivacidade
  extends Schema.SingleType {
  collectionName: 'politica_de_privacidades';
  info: {
    singularName: 'politica-de-privacidade';
    pluralName: 'politica-de-privacidades';
    displayName: 'Pol\u00EDtica de Privacidade';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    text: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'light';
        }
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::politica-de-privacidade.politica-de-privacidade',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::politica-de-privacidade.politica-de-privacidade',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProcessosIso9001ProcessosIso9001 extends Schema.SingleType {
  collectionName: 'processos_iso_9001s';
  info: {
    singularName: 'processos-iso-9001';
    pluralName: 'processos-iso-9001s';
    displayName: 'Processos ISO9001';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    banner: Attribute.Component<'nested.icon-card-title'> & Attribute.Required;
    highlights: Attribute.Component<'nested.statistics', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 3;
        max: 6;
      }>;
    cta: Attribute.Component<'common.call-to-action'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::processos-iso-9001.processos-iso-9001',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::processos-iso-9001.processos-iso-9001',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectProject extends Schema.SingleType {
  collectionName: 'projects';
  info: {
    singularName: 'project';
    pluralName: 'projects';
    displayName: 'Produtos - Projetos Realizados';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    headline: Attribute.Component<'common.title'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectCategoryProjectCategory
  extends Schema.CollectionType {
  collectionName: 'project_categories';
  info: {
    singularName: 'project-category';
    pluralName: 'project-categories';
    displayName: 'Categorias (Projetos)';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    slug: Attribute.UID<'api::project-category.project-category', 'name'>;
    projects: Attribute.Relation<
      'api::project-category.project-category',
      'manyToMany',
      'api::projeto.projeto'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-category.project-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-category.project-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjetoProjeto extends Schema.CollectionType {
  collectionName: 'portfolio';
  info: {
    singularName: 'projeto';
    pluralName: 'portfolio';
    displayName: 'Projetos (Lista)';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    categories: Attribute.Relation<
      'api::projeto.projeto',
      'manyToMany',
      'api::project-category.project-category'
    >;
    cover: Attribute.Media & Attribute.Required;
    text: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'light';
        }
      >;
    gallery: Attribute.Media & Attribute.Required;
    slug: Attribute.UID<'api::projeto.projeto', 'title'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::projeto.projeto',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::projeto.projeto',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSustainabilitySustainability extends Schema.SingleType {
  collectionName: 'sustainabilities';
  info: {
    singularName: 'sustainability';
    pluralName: 'sustainabilities';
    displayName: 'Sustentabilidade';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    banner: Attribute.Component<'nested.icon-card-short'> & Attribute.Required;
    highlights: Attribute.Component<'home.service-highlight', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 4;
        max: 6;
      }>;
    policy: Attribute.Component<'sustainability.policy'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sustainability.sustainability',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sustainability.sustainability',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTechSupportTechSupport extends Schema.SingleType {
  collectionName: 'tech_supports';
  info: {
    singularName: 'tech-support';
    pluralName: 'tech-supports';
    displayName: 'Produtos - Suporte T\u00E9cnico';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    banner: Attribute.Component<'products.banner-cta'> & Attribute.Required;
    highlights: Attribute.Component<'nested.icon-card-title', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 4;
        max: 4;
      }>;
    cta: Attribute.Component<'common.call-to-action'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tech-support.tech-support',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::tech-support.tech-support',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::ai-design.ai-design': ApiAiDesignAiDesign;
      'api::company.company': ApiCompanyCompany;
      'api::contact.contact': ApiContactContact;
      'api::custom-composition.custom-composition': ApiCustomCompositionCustomComposition;
      'api::digital-printing.digital-printing': ApiDigitalPrintingDigitalPrinting;
      'api::flexo.flexo': ApiFlexoFlexo;
      'api::footer.footer': ApiFooterFooter;
      'api::home.home': ApiHomeHome;
      'api::packaging-design.packaging-design': ApiPackagingDesignPackagingDesign;
      'api::people.people': ApiPeoplePeople;
      'api::politica-de-privacidade.politica-de-privacidade': ApiPoliticaDePrivacidadePoliticaDePrivacidade;
      'api::processos-iso-9001.processos-iso-9001': ApiProcessosIso9001ProcessosIso9001;
      'api::project.project': ApiProjectProject;
      'api::project-category.project-category': ApiProjectCategoryProjectCategory;
      'api::projeto.projeto': ApiProjetoProjeto;
      'api::sustainability.sustainability': ApiSustainabilitySustainability;
      'api::tech-support.tech-support': ApiTechSupportTechSupport;
    }
  }
}
