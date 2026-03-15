export interface StoryMetaBarData {
    packageTag: string;
    date: string;       // pre-formatted — e.g. "December 2024"
    location: string;
  }
  
  export interface StoryMetaBarContent {
    packageLabelEn: string;
    packageLabelEs: string;
    dateLabelEn: string;
    dateLabelEs: string;
    locationLabelEn: string;
    locationLabelEs: string;
  }
  
  export const defaultStoryMetaBarContent: StoryMetaBarContent = {
    packageLabelEn: "Package",
    packageLabelEs: "Paquete",
    dateLabelEn: "Date",
    dateLabelEs: "Fecha",
    locationLabelEn: "Location",
    locationLabelEs: "Lugar",
  };