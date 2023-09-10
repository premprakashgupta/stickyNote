import {
  LOAD_FAIL,
  LOAD_START,
  LOAD_SUCCESS,
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
} from "../constent/userConstant";

export const LoginReducer = (state = { loginDetail: {} }, action) => {
  switch (action.type) {
    case LOGIN_START:
    case LOAD_START:
      return {
        loading: true,
        loginDetail: {},
      };
    case LOGIN_SUCCESS:
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loginDetail: action.payload,
      };
    case LOGIN_FAIL:
    case LOAD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
