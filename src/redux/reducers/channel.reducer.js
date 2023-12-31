import {
  CHANNEL_DETAILS_FAIL,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  SET_SUBSCRIPTION_STATUS,
} from "../actionType";

export const channelDetailsReducer = (
  state = {
    loading: true,
    channel: {},
    subscriptionStatus: false,
    idSubscribed: "",
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case CHANNEL_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANNEL_DETAILS_SUCCESS:
      return {
        ...state,
        channel: payload,
        loading: false,
      };
    case CHANNEL_DETAILS_FAIL:
      return {
        ...state,
        channel: null,
        loading: false,
      };
    case SET_SUBSCRIPTION_STATUS:
      return {
        ...state,
        subscriptionStatus: payload && true,
        idSubscribed: payload && payload.id,
      };
    default:
      return state;
  }
};
