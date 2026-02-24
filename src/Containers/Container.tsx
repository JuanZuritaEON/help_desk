import React from 'react'
import { Texts, useAppDispatch, apiSlice, useAppSelector, SAVE_APP_FLUX, SAVE_ERRORS } from '../Redux';
import { ArrowUpTrayIcon, Bars3Icon } from '@heroicons/react/16/solid'
import BodyContainer from './BodyContainer';
import { Loader } from '../Components';

const Container = (props: { numOtorgante: string; }) => {
  const { numOtorgante } = props
  const dispatch = useAppDispatch()
  const { DEFAULT_CONSULT_NUMBER, NAME_USER, SPECIAL_TAB, NEW_REQUEST, CONSULT_STATUS } = Texts
  const consultantNumber = numOtorgante ?? DEFAULT_CONSULT_NUMBER
  const {
    generalLoader,
    actualTab,
    sectionTabs,
    endDate,
    liferayUser: { data: {nameUser, userId} },
    sectionLoader
  } = useAppSelector((state) => state.app.appFluxContext)
  const { useGetHistoryDataQuery } = apiSlice

  const {
    data: historyData,
    isLoading: loadingHistory,
    isSuccess: successHistory,
    isError: hasErrorHistory,
    error: errorHistory
  } = useGetHistoryDataQuery({ numeroOtorgante: consultantNumber, estatusSolicitud: '', tipoOtorgante: '' })

  React.useEffect(() => {
    if (loadingHistory) dispatch(SAVE_APP_FLUX({ generalLoader: true }))
      else dispatch(SAVE_APP_FLUX({ generalLoader: false }))
    let errorsState = [] as any[]
    if (hasErrorHistory) errorsState = [...errorsState, errorHistory]
    if (errorsState.length && !loadingHistory) { dispatch(SAVE_ERRORS(errorsState)); dispatch(SAVE_APP_FLUX({ noInfoRequest: true })) }
    if (successHistory) dispatch(SAVE_APP_FLUX({ requestStatus: historyData, noInfoRequest: historyData[0].id === 0 }))
  }, [historyData, errorHistory, hasErrorHistory, successHistory, loadingHistory, dispatch]);

  React.useEffect(() => {
    if (actualTab === SPECIAL_TAB) dispatch(SAVE_APP_FLUX({
      sectionTabs: [
        {
          name: NEW_REQUEST,
          icon: <ArrowUpTrayIcon title={NEW_REQUEST} className='iconStandardStyle' />,
          active: true
        },
        {
          name: CONSULT_STATUS,
          icon: <Bars3Icon title={CONSULT_STATUS} className='iconStandardStyle'/>,
          active: false
        }
      ]
    }))
    else dispatch(SAVE_APP_FLUX({ sectionTabs: [] }))
  }, [actualTab, SPECIAL_TAB, CONSULT_STATUS, NEW_REQUEST, dispatch]) 

  if (generalLoader) return <Loader width={180} height={180} wrapperClass='generalLoader' />
  return (
    <main className='containerMainFluid'>
      <BodyContainer
        actualTab={actualTab}
        actualDate={endDate}
        userData={{ name: nameUser ?? NAME_USER, numOtor: consultantNumber, userId }}
        sectionTabs={sectionTabs}
        sectionLoader={sectionLoader}
      />
    </main>
  )
}

export default Container