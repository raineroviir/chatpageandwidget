const initialState = {
  isMobile: false,
  height: null,
  width: null,
  widgetWidth: "320px"
};

export function environment(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_IS_MOBILE":
      return {...state,
        isMobile: action.isMobile,
      }

    case "CHANGE_WIDTH_AND_HEIGHT":
      return {...state,
        height: action.screenHeight,
        width: action.screenWidth,
      }

    case "TOGGLE_RESIZE":
      return {...state, widgetWidth: state.widgetWidth === "320px" ?
      "100%" : "320px"
        }
    default:
      return state;
  }
}
