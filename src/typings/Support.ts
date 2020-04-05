export interface Data {
  total?: number;
  items?: Support[];
}

export interface Support {
  id?: string;
  catalog?: Catalog;
  publish_date?: Date;
  language?: Language;
  update_info?: CompetentAuthorityUpdateInfo;
  has_case_studies?: boolean;
  title?: string;
  competent_authorities?: CompetentAuthority[];
  number?: string;
  target?: string;
  prefectures?: string[];
  summary?: string;
  body?: string;
  reception_start_date?: Date;
  refernece?: string;
  support_organization?: string;
  inquiry?: string;
  industry_categories?: Category[];
  stage_categories?: StageCategory[];
  service_categories?: Category[];
  purpose_categories?: PurposeCategory[];
  disasters?: Disaster[];
  keywords?: string[];
  application_target?: string;
  usage?: string;
  subtitle?: string;
}

export interface Catalog {
  id?: string;
  name?: CatalogName;
  image?: Image;
  published?: boolean;
  update_info?: ImageUpdateInfo;
}

export interface Image {
  id?: string;
  name?: ImageName;
  mng_group?: string;
  url?: string;
  thumbnail_url?: string;
  update_info?: ImageUpdateInfo;
}

export enum ImageName {
  Covid19PNG = 'covid-19.png',
}

export interface ImageUpdateInfo {
  created_by?: PurposeCategory;
  created_at?: Date;
  last_modified_by?: PurposeCategory;
  last_modified_at?: Date;
}

export interface PurposeCategory {
  id?: string;
  name?: PurposeCategoryName;
}

export enum PurposeCategoryName {
  Cloud02MsterCoJp = 'cloud02@mster.co.jp',
  NishitaniKaoriMetiGoJp = 'nishitani-kaori@meti.go.jp',
  信用保証 = '信用保証',
  '情報提供・相談' = '情報提供・相談',
  災害対応 = '災害対応',
  貸付融資 = '貸付(融資）',
  資金繰り = '資金繰り',
  金融その他 = '金融その他',
}

export enum CatalogName {
  新型コロナウイルス感染症関連 = '新型コロナウイルス感染症関連',
}

export interface CompetentAuthority {
  id?: string;
  name?: CompetentAuthorityName;
  code?: string;
  kind?: Kind;
  level?: number;
  deletable?: boolean;
  update_info?: CompetentAuthorityUpdateInfo;
}

export enum Kind {
  Gov = 'gov',
}

export enum CompetentAuthorityName {
  経済産業省 = '経済産業省',
}

export interface CompetentAuthorityUpdateInfo {
  created_at?: Date;
  last_modified_at?: Date;
}

export interface Disaster {
  id?: string;
  name?: DisasterName;
  deletable?: boolean;
  update_info?: CompetentAuthorityUpdateInfo;
}

export enum DisasterName {
  新型コロナウイルス = '新型コロナウイルス',
}

export interface Category {
  id?: string;
  name?: IndustryCategoryName;
  number?: string;
  sub_categories?: PurposeCategory[];
}

export enum IndustryCategoryName {
  サービス = 'サービス',
  宿泊業飲食サービス業 = '宿泊業，飲食サービス業',
  金融 = '金融',
}

export enum Language {
  日本語 = '日本語',
}

export interface StageCategory {
  id?: string;
  name?: StageCategoryName;
  remarks?: Remarks;
}

export enum StageCategoryName {
  '事業計画・経営企画' = '事業計画・経営企画',
}

export enum Remarks {
  '成長期・成熟期' = '成長期・成熟期',
}

export interface Data {
  id?: string;
  catalog?: Catalog;
  publish_date?: Date;
  language?: string;
  update_info?: CompetentAuthorityUpdateInfo;
  has_case_studies?: boolean;
  title?: string;
  competent_authorities?: CompetentAuthority[];
  number?: string;
  target?: string;
  application_target?: string;
  prefectures?: any[];
  summary?: string;
  body?: string;
  usage?: string;
  reception_start_date?: Date;
  refernece?: string;
  support_organization?: string;
  inquiry?: string;
  industry_categories?: any[];
  stage_categories?: StageCategory[];
  service_categories?: ServiceCategory[];
  purpose_categories?: PurposeCategory[];
  disasters?: Disaster[];
  keywords?: string[];
}

export interface Catalog {
  id?: string;
  name?: CatalogName;
  image?: Image;
  published?: boolean;
  update_info?: ImageUpdateInfo;
}

export interface Image {
  id?: string;
  name?: ImageName;
  mng_group?: string;
  url?: string;
  thumbnail_url?: string;
  update_info?: ImageUpdateInfo;
}

export interface ImageUpdateInfo {
  created_by?: PurposeCategory;
  created_at?: Date;
  last_modified_by?: PurposeCategory;
  last_modified_at?: Date;
}

export interface PurposeCategory {
  id?: string;
  name?: PurposeCategoryName;
}

export interface CompetentAuthority {
  id?: string;
  name?: CompetentAuthorityName;
  code?: string;
  kind?: Kind;
  level?: number;
  deletable?: boolean;
  update_info?: CompetentAuthorityUpdateInfo;
}

export interface CompetentAuthorityUpdateInfo {
  created_at?: Date;
  last_modified_at?: Date;
}

export interface Disaster {
  id?: string;
  name?: DisasterName;
  deletable?: boolean;
  update_info?: CompetentAuthorityUpdateInfo;
}

export interface ServiceCategory {
  id?: string;
  name?: string;
  sub_categories?: PurposeCategory[];
}

export interface StageCategory {
  id?: string;
  name?: StageCategoryName;
  remarks?: Remarks;
}
