import * as consts from "./consts"

const initialState = {
  interface: "light",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case consts.INTERFACE_SET_LIGHT:
      return { ...state, interface: "light" };
    case consts.INTERFACE_SET_DARK:
      return { ...state, interface: "dark" };
    default:
      return state;
  }
};

export default rootReducer;