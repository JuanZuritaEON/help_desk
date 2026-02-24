export interface SubHeaderComponentTypes {
  cleanData: {
    status: JSX.Element;
    period: JSX.Element;
    viewFile: JSX.Element;
    id: number;
    upDate: string;
    fileName: string;
    consultNumber: string;
    companyName: string;
    shortName: string;
    consultType: string;
    lastUpdate: string;
    eTag: string;
    fileRef: string;
  }[],
  setFilterData: React.Dispatch<React.SetStateAction<{
    status: JSX.Element;
    period: JSX.Element;
    viewFile: JSX.Element;
    id: number;
    upDate: string;
    fileName: string;
    consultNumber: string;
    companyName: string;
    shortName: string;
    consultType: string;
    lastUpdate: string;
    eTag: string;
    fileRef: string;
  }[]>>,
  alertText?: string;
  handleReload?: any;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  filterValues?: string[];
}