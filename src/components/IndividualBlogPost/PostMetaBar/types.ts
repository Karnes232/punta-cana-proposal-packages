export interface PostMetaBarData {
    categoryTag: string;
    publishedAt: string;
    readingTime: number;
  }
  
  export interface PostMetaBarContent {
    categoryLabelEn: string;
    categoryLabelEs: string;
    publishedLabelEn: string;
    publishedLabelEs: string;
    readTimeLabelEn: string;
    readTimeLabelEs: string;
    readTimeSuffixEn: string;
    readTimeSuffixEs: string;
  }
  
  export const defaultPostMetaBarContent: PostMetaBarContent = {
    categoryLabelEn: "Category",
    categoryLabelEs: "Categoría",
    publishedLabelEn: "Published",
    publishedLabelEs: "Publicado",
    readTimeLabelEn: "Reading Time",
    readTimeLabelEs: "Tiempo de Lectura",
    readTimeSuffixEn: "min read",
    readTimeSuffixEs: "min de lectura",
  };