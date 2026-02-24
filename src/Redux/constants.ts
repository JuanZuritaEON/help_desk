import { formatTableElement } from './../Utils/helpers';
import { Signature } from "../assets/images"

export enum Texts {
  CONSULT = 'Consultor',
  NAME_USER = 'Lorem Ipsum Data',
  CONSULT_DATE = 'Fecha',
  DEFAULT_CONSULT_NUMBER = '000268',
  DATE_RANGE = 'Rango de fecha de',
  PERIODS = 'Periodos',
  ALL_CONSULTS = 'Total de Consultas',
  ALL_CONSULTS_FINANCIAL = 'Total de Muestra',
  AUDIT = 'Auditadas',
  DELIVERED = 'Entregadas',
  PENDING = 'Pendientes',
  REJECTED = 'Rechazadas',
  BUTTON_SEARCH = 'Buscar',
  COMERCIAL = 'COMERCIAL',
  FINANCIERO = 'FINANCIERO',
  ERROR_CODE = 'Código de error',
  NO_CONSULTS = 'Este rango de fechas no contiene consultas. Prueba ingresando otra fecha',
  NO_INFO = 'Sin información',
  FIRST_TAB = 'Consultas del Periodo',
  TAB_FINANCIERO = 'Muestra del Periodo',
  SECOND_TAB = 'Firmas Auditadas',
  THIRD_TAB = 'Carga Masiva',
  SPECIAL_TAB = 'Histórico de Consultas',
  NEW_REQUEST = 'Nueva Solicitud',
  CONSULT_STATUS = 'Consultar Estatus'
}

export enum Labels {
  REQUIRED = 'Total Requeridas',
  DELIVERED = 'Firmas Entregadas',
  PENDING = 'Firmas Pendientes',
  AUDIT = 'Firmas Auditadas',
  REJECTED = 'Firmas Rechazadas'
}

export enum Petitions {
  REQUIRED = 'totalRequeridas',
  DELIVERED = 'totalEntregadas',
  PENDING = 'totalPendientes',
  AUDIT = 'totalAuditadas',
  REJECTED = 'totalRechazadas'
}

export const DataTableCustomStyles = {
  responsiveWrapper: {
		style: {
			borderRadius: '10px 10px 0px 0px',
		},
	},
  head: {
		style: {
			fontSize: '.8rem',
      color: 'white',
		},
	},
  subHeader: {
		style: {
      margin: '1.2rem 0'
		},
	},
  headRow: {
		style: {
      backgroundColor: '#4463B3',
      borderRadius: '10px 10px 0px 0px',
		},
	},
  rows: {
    style: {
      color: '#0b1a28'
    },
  },
}

export const SideBarItems = [
  {
    id: Texts.SPECIAL_TAB,
    src: Signature
  },
]

export const dataTableColumns = [
  {
    id: 'id',
    name: 'ID',
    selector: (row: any) => row.id,
    cell: (row: any) => formatTableElement(row.id),
    sortable: true,
    center: true
  },
  {
    id: 'consultNumber',
    name: 'Número Otorgante',
    selector: (row: any) => row.consultNumber,
    cell: (row: any) => formatTableElement(row.consultNumber),
    sortable: true
  },
  {
    id: 'lastUpdate',
    name: 'Última Actualización',
    selector: (row: any) => row.lastUpdate,
    cell: (row: any) => formatTableElement(row.lastUpdate),
    sortable: true,
  },
  {
    id: 'upDate',
    name: 'Fecha de Alta',
    selector: (row: any) => row.upDate,
    cell: (row: any) => formatTableElement(row.upDate),
    sortable: true,
  },
  {
    id: 'period',
    name: 'Periodo de Solicitud',
    selector: (row: any) => row.period,
    cell: (row: any) => row.period,
    sortable: true,
  },
  {
    id: 'status',
    name: 'Estatus',
    selector: (row: any) => row.status,
    cell: (row: any) => row.status,
    sortable: true,
    center: true
  },
  {
    id: 'report',
    name: 'Reporte de Solicitud',
    selector: (row: any) => row.viewFile,
    cell: (row: any) => row.viewFile,
    center: true
  },
]

export const dataTablePaginationOptions = {
  rowsPerPageText: 'Filas por página:', 
  rangeSeparatorText: 'de', 
  noRowsPerPage: false, 
  selectAllRowsItem: false, 
  selectAllRowsItemText: 'All'
};

export const modalComponentStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: '10',
    background: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    margin: '0',
    padding: '0',
    boxShadow: 'rgb(0 0 0 / 24%) 0 3px 8px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '.5rem',
    maxHeight: '100vh',
    maxWidth: '100dvw',
    width: 'fit-content',
    height: 'auto',
  },
};