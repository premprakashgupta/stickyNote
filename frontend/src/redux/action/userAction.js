import axios from "axios";
import {
  LOAD_FAIL,
  LOAD_START,
  LOAD_SUCCESS,
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
} from "../constent/userConstant";
import reqConfig from "../reqConfig";
import universalLink from "../universalLink";

export const loginAction = (email_password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_START,
    });
    const { data } = await axios.post(
      `${universalLink}/user_signin`,
      email_password,
      reqConfig
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
export const loadAction = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_START,
    });
    const { data } = await axios.get(
      `${universalLink}/me`,

      reqConfig
    );
    dispatch({
      type: LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_FAIL,
    });
  }
};
export const logOutAction = () => async (dispatch) => {
  try {
    await axios.get(
      `${universalLink}/logout`,

      reqConfig
    );
  } catch (error) {}
};
