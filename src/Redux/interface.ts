import { ReactNode } from "react";

export interface BodyData {
  actualTab: string;
  actualDate: Date;
  userData: {
    name: string;
    numOtor: string;
    userId: number;
  };
  sectionTabs: {
    name: string;
    icon: string;
    active: boolean;
  }[];
  sectionLoader: boolean;
}

export interface SidebarData {
  actualTab: string;
  nameUser: string;
  date: string;
}

export interface ResultsData {
  actualTab: string;
  changeSectionTab: (name: string) => void;
  sectionsTabs: {
    name: string;
    icon: string;
    active: boolean;
  }[];
  sectionLoader: boolean;
  component: JSX.Element;
}

export interface SpecialComponentData {
  actualDate: Date;
  currentTab: string;
  userData: {
    name: string;
    numOtor: string;
    userId: number;
  }
}

export interface SpecialConsult {
  initialDate: Date;
  finalDate: Date;
  handleChange: {
    handleInitial: (date: Date) => void;
    handleFinal: (date: Date) => void;
  };
  userData: {
    name: string;
    numOtor: string;
    userId: number;
  }
}

export interface ModalData {
  title: string;
  children: ReactNode;
  activeModal: {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
  };
  headerComponent?: JSX.Element;
  footerComponent?: JSX.Element;
  noHeader?: boolean;
  noFooter?: boolean;
  onAccept?: () => void;
}

///////////////Terminar de asignar los types a cada componente y container