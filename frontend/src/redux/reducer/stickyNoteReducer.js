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

export const stickyNoteReducer = (state = { stickyNoteArr: [] }, action) => {
  switch (action.type) {
    case STICKY_NOTE_START:
      return {
        loading: true,
        stickyNoteArr: [],
      };
    case STICKY_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        stickyNoteArr: action.payload,
      };
    case STICKY_NOTE_FAIL:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case CREATE_STICKY_NOTE_START:
      return {
        ...state,
        loading: true,
      };
    case CREATE_STICKY_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload.message,
        stickyNoteArr: [...state.stickyNoteArr, action.payload.data],
      };
    case CREATE_STICKY_NOTE_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case STICKY_NOTE_DEL_START:
      return {
        ...state,
        loading: true,
      };
    case STICKY_NOTE_DEL_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload.message,
        stickyNoteArr: state.stickyNoteArr.filter(
          (f) => f._id.toString() !== action.payload.data.toString()
        ),
      };
    case STICKY_NOTE_DEL_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case UPDATE_STICKY_NOTE_START:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_STICKY_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload.message,
        ...state.stickyNoteArr.forEach((fe) => {
          if (fe._id.toString() === action.payload.data._id.toString()) {
            fe["heading"] = action.payload.data.heading;
            fe["content"] = action.payload.data.content;
          }
        }),
      };
    case UPDATE_STICKY_NOTE_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};
