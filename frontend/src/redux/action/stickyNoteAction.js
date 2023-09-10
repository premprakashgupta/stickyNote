import {
  CREATE_STICKY_NOTE_FAIL,
  CREATE_STICKY_NOTE_START,
  CREATE_STICKY_NOTE_SUCCESS,
  STICKY_NOTE_DEL_FAIL,
  STICKY_NOTE_DEL_START,
  STICKY_NOTE_DEL_SUCCESS,
  STICKY_NOTE_FAIL,
  STICKY_NOTE_START,
  STICKY_NOTE_SUCCESS,
  UPDATE_STICKY_NOTE_FAIL,
  UPDATE_STICKY_NOTE_START,
  UPDATE_STICKY_NOTE_SUCCESS,
} from "../constent/stickyNoteConstant";
import reqConfig from "../reqConfig";
import universalLink from "../universalLink";
import axios from "axios";
export const stickyNoteAction = () => async (dispatch) => {
  try {
    dispatch({
      type: STICKY_NOTE_START,
    });
    const { data } = await axios.get(
      `${universalLink}/getAllStickyNote`,

      reqConfig
    );

    dispatch({
      type: STICKY_NOTE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STICKY_NOTE_FAIL,
    });
  }
};
export const createStickyNoteAction = (stickyNoteData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_STICKY_NOTE_START,
    });
    const { data } = await axios.post(
      `${universalLink}/stickyNote_create`,
      stickyNoteData,
      reqConfig
    );

    dispatch({
      type: CREATE_STICKY_NOTE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_STICKY_NOTE_FAIL,
    });
  }
};
export const stickyNoteDelAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: STICKY_NOTE_DEL_START,
    });
    const { data } = await axios.delete(
      `${universalLink}/stickyNote_delete/${id}`,

      reqConfig
    );

    dispatch({
      type: STICKY_NOTE_DEL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STICKY_NOTE_DEL_FAIL,
    });
  }
};
export const stickyNoteUpdateAction = (id, noteUpdate) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_STICKY_NOTE_START,
    });
    const { data } = await axios.put(
      `${universalLink}/stickyNote_update/${id}`,
      noteUpdate,
      reqConfig
    );

    dispatch({
      type: UPDATE_STICKY_NOTE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_STICKY_NOTE_FAIL,
    });
  }
};
