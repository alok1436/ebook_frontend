import { SET_MESSAGE, CLEAR_MESSAGE, SET_REGISTER_MESSAGE } from "../actions/type";
const initialState = {};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_MESSAGE:
      return { message: payload };
      case SET_REGISTER_MESSAGE:
      return { registerMessage: payload };
    case CLEAR_MESSAGE:
      return { message: "" };
    default:
      return state;
  }
}