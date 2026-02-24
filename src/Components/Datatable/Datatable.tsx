import { dataTableColumns, DataTableCustomStyles, dataTablePaginationOptions } from '../../Redux'
import DataTable from 'react-data-table-component'
import { DatatableTypes } from './Datatable.types'
import { isUndefined } from 'lodash'
import './Datatable.css'

const NoRenderer = (noInfo: boolean) => {
  if (noInfo) return <div className='noInfoComp alert_info'>Aún no tienes consultas, crea una nueva en "Nueva Solicitud"</div>
  return <div className='noInfoComp alert_info'>No hay información para tu búsqueda</div>
}

const Datatable = (props: DatatableTypes) => {
  
  const {
    data,
    title = '',
    expanded,
    className = '',
    rowDetailComponent,
    subHeaderComponent,
    noInfoRequest
  } = props

  const classes = `${expanded ? 'expandRow' : 'normalRow'} ${className}`
  return (
    <DataTable
      columns={dataTableColumns}
      className={classes}
      customStyles={DataTableCustomStyles}
      data={noInfoRequest ? [] : data}
      expandableRows={!isUndefined(rowDetailComponent)}
      expandableRowsComponent={rowDetailComponent}
      expandOnRowClicked={!isUndefined(rowDetailComponent)}
      highlightOnHover
      keyField='id'
      pagination
      paginationPerPage={30}
      paginationComponentOptions={dataTablePaginationOptions}
      responsive
      subHeader
      subHeaderComponent={noInfoRequest ? null : subHeaderComponent}
      title={title}
      noDataComponent={NoRenderer(noInfoRequest)}
    />
  )
}

export default Datatable