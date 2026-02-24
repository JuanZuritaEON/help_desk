import { ExpandableRowsComponent } from "react-data-table-component/dist/src/DataTable/types";

export interface DatatableTypes {
  data: {
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
  }[];
  title?: string;
  expanded: boolean;
  className?: string;
  rowDetailComponent?: ExpandableRowsComponent<any>;
  subHeaderComponent?: JSX.Element;
  noInfoRequest: boolean;
}