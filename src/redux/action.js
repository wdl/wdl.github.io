import * as consts from "./consts"

export const interfaceSetLight = (payload) => ({
  type: consts.INTERFACE_SET_LIGHT,
  payload
});

export const interfaceSetDark = (payload) => ({
  type: consts.INTERFACE_SET_DARK,
  payload
});