import { GET_CONSUMERS_SUCCESS,
  SET_VISIBLE_CREATE_CONSUMER_FORM,
  UPLOAD,
  UPLOAD_SUCCESS,
  UPLOAD_FAIL,
  DOWNLOAD,
  DOWNLOAD_SUCCESS,
  DOWNLOAD_FAIL } from '../actions/consumer';

const INITIAL_STATE = {
  consumers: [],
  isVisibleCreateConsumerForm: false,
  // ids of uploading consumers
  uploadingConsumerIds: [],
  // fileId and consumerId of downloadingContext
  downloadingContexts: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CONSUMERS_SUCCESS:
      return { ...state,
        consumers: action.consumers,
        isVisibleCreateConsumerForm: false };
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
      return { ...state,
        downloadingContexts: [...state.downloadingContexts, {
          consumerId: action.consumerId,
          fileId: action.fileId
        }] };
    case DOWNLOAD_SUCCESS:
    case DOWNLOAD_FAIL:
      return {
        ...state,
        downloadingContexts: state.downloadingContexts
          .filter(({ consumerId, fileId }) => consumerId !== action.consumerId
          && fileId !== action.fileId)
      };
    default:
      return state;
  }
}
