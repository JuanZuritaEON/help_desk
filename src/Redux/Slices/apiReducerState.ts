import { createSlice } from '@reduxjs/toolkit'
import { Texts } from '../constants'

const initialState = {
  appFluxContext: {
    actualTab: Texts.SPECIAL_TAB,
    consultantNumber: Texts.DEFAULT_CONSULT_NUMBER,
    startDate: '',
    endDate: new Date(),
    requestStatus: [{
      id: 0,
      status: '',
      upDate: '',
      fileName: '',
      period: {
          start: '',
          end: ''
      },
      consultNumber: '',
      companyName: '',
      shortName: '',
      consultType: '',
      lastUpdate: '',
      eTag: '',
      fileRef: '',
      viewFile: false
    }],
    requestDetails: [{
      requestStatus: '',
      dateComplete: '',
      dateFailed: '',
      beginProcess: '',
      moreDetails: '',
      idRequest: 0,
      detailViewFile: false,
      dateExpired: ''
    }],
    sectionTabs: [{
      name: '',
      icon: '',
      active: false
    }],
    consultant: {
      status: '',
      type: '',
      periods: [{
        startDate: '',
        endDate:''
      }],
      media: [{
        idMedia: 0,
        descriptionMedia: '',
      }],
    },
    liferayUser: {
      data: {
        nameUser: 'Lorem ipsum dolor sit',
        numOtorgante: null,
        token: '',
        userId: 0,
      },
      properties: {
        CDC_ID_HDK: '',
        CDC_SEC_HDK: '',
        CDC_URL_HDK: '',
        CDC_AWS_HDK: '',
        CDC_SPW_HDK: ''
      }
    },
    generalLoader: false,
    sectionLoader: false,
    noInfoRequest: false,
  },
  errors: [{
    url: '',
    code: 0,
    message: '',
    active: false,
  }]
}

export const appReducerContext = createSlice({
  name: 'App Context State',
  initialState,
  reducers: {
    SAVE_APP_FLUX: (state, action) => {
      return {
        ...state,
        appFluxContext: {
          ...state.appFluxContext,
          ...action.payload
        }
      }
    },
    SAVE_ERRORS: (state, action) => {
      return {
        ...state,
        errors: action.payload
      }
    }
  }
})

export const { SAVE_APP_FLUX, SAVE_ERRORS } = appReducerContext.actions
export default appReducerContext.reducer