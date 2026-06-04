import React from 'react'
import { ArrowDownTrayIcon, ExclamationCircleIcon, FolderArrowDownIcon } from '@heroicons/react/20/solid'
import { Button, DataTable, DetailedRow, Loader, Modal, SpecialConsult, SubHeaderComponent } from '..'
import { RootState, S3Slice, SAVE_ERRORS, Texts, useAppDispatch, useAppSelector, SpecialComponentData } from '../../Redux'
import { assignPeriodDate, getStatusInfo, reportStatus, validateActualDate } from '../../Utils'
import './Special.css'

const SpecialComponent = (props: SpecialComponentData) => {
  const { actualDate, currentTab, userData } = props
  const { requestStatus, noInfoRequest } = useAppSelector((state: RootState) => state.app.appFluxContext)
  const dispatch = useAppDispatch()
  const { endpoints: { s3DownloadFile }} = S3Slice
  const isFirstTab = currentTab === Texts.NEW_REQUEST
  //const actualMonth = actualDate.getMonth() + 1
  const initial = validateActualDate(new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate())).date
  const [initialDate, setInitialDate] = React.useState(initial)
	const [finalDate, setFinalDate] = React.useState(initial)
  const [expanded, setExpanded] = React.useState(false)
  const [active, setActive] = React.useState(false)
  const [fileReport, setFileReport] = React.useState({
    fileName: '',
    dataFile: ''
  })
  const [modalTitle, setModalTitle] = React.useState('')
  const [loadingFile, setLoadingFile] = React.useState(true)
  const handleInitial = (date: Date) => setInitialDate(date)
	const handleFinal = (date: Date) => setFinalDate(date)
  const handleDownloadReport = async (fileName: string, id: number, key: string, eTag: string) => {
    try {
      setActive(true)
      setLoadingFile(true)
      setModalTitle(`Histórico Consultas Solicitud: ${id}`)
      const fileReportPromise = dispatch(s3DownloadFile.initiate({
        key,
        eTag
      }, { forceRefetch: true }))
      const { data, isSuccess, isError, error } = await fileReportPromise
      if (isSuccess) setFileReport({ fileName: fileName, dataFile: data.isNotFound ? '' : data.data })
      if (isError) dispatch(SAVE_ERRORS([error]))
    } catch (error) {
      dispatch(SAVE_ERRORS([error]))
    } finally { setLoadingFile(false) }
  }

  const modifiedData = requestStatus.map(request => ({
    ...request,
    status: <div><img className='iconStandardStyle' title={getStatusInfo(request.status, true)} src={getStatusInfo(request.status)} alt='icon'/></div>,
    period: <div title={assignPeriodDate({ fechaInicio: request.period.start, fechaFin: request.period.end }, true)}>{assignPeriodDate({ fechaInicio: request.period.start, fechaFin: request.period.end }, true)}</div>,
    viewFile:
    <div title={`${request.viewFile ? 'Reporte Solicitud: '+request.id : reportStatus(request.status)}`}>
        {
          request.viewFile ?
          <ArrowDownTrayIcon
            onClick={() => handleDownloadReport(request.fileName, request.id, request.fileRef, request.eTag)}
            title={'Reporte Solicitud: ' + request.id}
            className='iconStandardStyle svgFill'
          />
          : reportStatus(request.status)
        }
    </div>,
  }))
  const [cleanData, setCleanData] = React.useState(modifiedData)

  if (isFirstTab) return <SpecialConsult
    initialDate={initialDate}
    finalDate={validateActualDate(finalDate).date}
    handleChange={{ handleInitial, handleFinal }}
    userData={userData}
  />
  return (
    <>
      <DataTable
        data={cleanData}
        expanded={expanded}
        rowDetailComponent={DetailedRow}
        subHeaderComponent={
          <SubHeaderComponent
            cleanData={modifiedData}
            setFilterData={setCleanData}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        }
        noInfoRequest={noInfoRequest}
      />
      <Modal title={modalTitle} activeModal={{ active, setActive }} noFooter>
        {
          loadingFile ? <Loader wrapperClass='generalLoader' /> : (
            <>
            {fileReport.dataFile ? (
            <Button className='fileReportDownload reportDown' onClick={() => {
              const a = document.createElement('a')
              a.href = fileReport.dataFile
              a.download = fileReport.fileName
              document.body.appendChild(a)
              a.click()
              a.remove()
              URL.revokeObjectURL(fileReport.dataFile)
            }}>
              <FolderArrowDownIcon className='iconStandardStyle' />
              <p>{fileReport.fileName}</p>
            </Button>
            ) : (
              <div className='fileReportError'>
                <ExclamationCircleIcon width={50} />
                <p>Hubo un error al descargar tu archivo, por favor inténtalo de nuevo.</p>
              </div>
            )
            }
            </>
          )
        }
      </Modal>
    </>
  )
}

export default SpecialComponent