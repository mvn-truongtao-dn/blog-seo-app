export interface Url {
  thumbUrl: string
}
export interface Work {
  id: string;
  title: string;
  tagList: string[];
  shortDescription: string;
  fullDescription?: string;
  createdAt: string;
  updatedAt?: string;
  thumbnailUrl: any;
}
