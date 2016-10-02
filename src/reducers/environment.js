const initialState = {
  isMobile: false,
  height: null,
  width: null,
  widgetHeight: "100%",
  scrollIndex: 10,
  referenceToConversationBody: ""
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
      return {...state, widgetHeight: state.widgetHeight === "100%" ?
      "600px" : "100%"
        }

    case "CHANGE_SCROLL_INDEX":
      return {...state, scrollIndex: action.scrollIndex
      }

    case "RECEIVE_REF_TO_CONVERSATION_BODY":
      return {...state, referenceToConversationBody: action.ref}
    default:
      return state;
  }
}
