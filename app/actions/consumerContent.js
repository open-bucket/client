export const SET_CONSUMER = 'SET_CONSUMER';
export const SET_CONSUMER_SUCCESS = 'SET_CONSUMER_SUCCESS';
export const SET_CONSUMER_FAIL = 'SET_CONSUMER_FAIL';

export function setConsumer({ id }) {
  return (dispatch, getState) => {
    dispatch({ type: SET_CONSUMER, id });
    const sate = getState();
    const consumer = sate.consumer.consumers.find(c => c.id == id);
    if (consumer) {
      dispatch({ type: SET_CONSUMER_SUCCESS, consumer });
    } else {
      dispatch({ type: SET_CONSUMER_FAIL });
    }
  };
}
