import {
  GET_CONSUMERS_SUCCESS,
  SET_VISIBLE_CREATE_CONSUMER_FORM,
  UPLOAD,
  UPLOAD_SUCCESS,
  UPLOAD_FAIL,
  DOWNLOAD,
  DOWNLOAD_SUCCESS,
  DOWNLOAD_FAIL,
  DELETE_FILE,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_FAIL,
  UPDATE_CONSUMER,
  UPDATE_CONSUMER_SUCCESS,
  UPDATE_CONSUMER_FAIL
} from '../actions/consumer';

const INITIAL_STATE = {
  consumers: [],
  isVisibleCreateConsumerForm: false,
  // ids of uploading consumers
  uploadingConsumerIds: [],
  // fileId and consumerId of downloadingContext
  downloadingContexts: [],
  deletingFileIds: [],
  updatingConsumerIds: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CONSUMERS_SUCCESS:
      return {
        ...state,
        consumers: action.consumers,
        isVisibleCreateConsumerForm: false
      };
    case SET_VISIBLE_CREATE_CONSUMER_FORM:
      return { ...state, isVisibleCreateConsumerForm: action.isVisibleCreateConsumerForm };
    case UPLOAD:
      return { ...state, uploadingConsumerIds: [...state.uploadingConsumerIds, action.consumerId] };
    case UPLOAD_SUCCESS:
    case UPLOAD_FAIL:
      return {
        ...state,
        uploadingConsumerIds: state.uploadingConsumerIds.filter(pId => pId !== action.consumerId)
      };
    case DOWNLOAD:
      return {
        ...state,
        downloadingContexts: [...state.downloadingContexts, {
          consumerId: action.consumerId,
          fileId: action.fileId
        }]
      };
    case DOWNLOAD_SUCCESS:
    case DOWNLOAD_FAIL:
      return {
        ...state,
        downloadingContexts: state.downloadingContexts
          .filter(({ consumerId, fileId }) => consumerId !== action.consumerId
            || fileId !== action.fileId)
      };
    case DELETE_FILE:
      return {
        ...state,
        deletingFileIds: [...state.deletingFileIds, action.fileId]
      };
    case DELETE_FILE_SUCCESS:
    case DELETE_FILE_FAIL:
      return {
        ...state,
        deletingFileIds: state.deletingFileIds.filter(fileId => fileId !== action.fileId)
      };
    case UPDATE_CONSUMER:
      return {
        ...state,
        updatingConsumerIds: [...state.updatingConsumerIds, action.consumer.id]
      };
    case UPDATE_CONSUMER_SUCCESS:
      return {
        ...state,
        updatingConsumerIds: state.updatingConsumerIds.filter(id => id !== action.consumer.id),
        consumers: state.consumers.map(c => (c.id === action.consumer.id ? action.consumer : c))
      };
    case UPDATE_CONSUMER_FAIL:
      return {
        ...state,
        updatingConsumerIds: state.updatingConsumerIds.filter(id => id !== action.consumer.id)
      };
    default:
      return state;
  }
}
