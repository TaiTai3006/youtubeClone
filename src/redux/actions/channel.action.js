import request from "../../api";
import axios from "axios";
import {
  CHANNEL_DETAILS_FAIL,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  SET_SUBSCRIPTION_STATUS,
  SUBSCRIBED_CHANNEL_FAIL,
  SUBSCRIBED_CHANNEL_SUCCESS,
} from "../actionType";

export const getChannelDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CHANNEL_DETAILS_REQUEST,
    });

    const { data } = await request("/channels", {
      params: {
        part: "snippet,statistics,contentDetails",
        id,
      },
    });
    dispatch({
      type: CHANNEL_DETAILS_SUCCESS,
      payload: data.items[0],
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: CHANNEL_DETAILS_FAIL,
      payload: error.response.data,
    });
  }
};

export const checkSubscriptionStatus = (id) => async (dispatch, getState) => {
  try {
    const { data } = await request("/subscriptions", {
      params: {
        part: "snippet",
        forChannelId: id,
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    console.log(id);
    dispatch({
      type: SET_SUBSCRIPTION_STATUS,
      payload: data.items[0],
    });
  } catch (error) {
    console.log(error);
  }
};

export const subscribedChannel = (id) => async (dispatch, getState) => {
  try {
    const obj = {
      snippet: {
        resourceId: {
          kind: "youtube#channel",
          channelId: id,
        },
      },
    };

    await request.post("/subscriptions", obj, {
      params: {
        part: "id,snippet",
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    dispatch({
      type: SUBSCRIBED_CHANNEL_SUCCESS,
    });
    setTimeout(() => dispatch(checkSubscriptionStatus(id)), 1000);
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: SUBSCRIBED_CHANNEL_FAIL,
    });
  }
};

export const unsubscribeChannel =
  (id, idChannel) => async (dispatch, getState) => {
    const apiUrl = `https://youtube.googleapis.com/youtube/v3/subscriptions?id=${id}&key=${process.env.REACT_APP_YT_API_KEY}`;
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      getState().auth.accessToken
    }`;
    axios
      .delete(apiUrl)
      .then((response) => {
        checkSubscriptionStatus(idChannel);
      })
      .catch((error) => {
        console.log(error);
      });
  };
