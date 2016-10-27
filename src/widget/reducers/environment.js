const initialState = {
  isMobile: false,
  height: null,
  width: null,
  widgetHeight: "100%",
  scrollIndex: 0,
  referenceToConversationBody: "",
  isInfiniteLoading: false,
  totalHeightOfHistoryMessages: "",
  userScrollPosition: 0,
  initialLoading: false,
  inactive: true,
  waitingOnInitialMessage: false
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
    case "INFINITE_LOADING":
      return {...state, isInfiniteLoading: true
      }
    case "INFINITE_LOADING_DONE":
      return {...state, isInfiniteLoading: false}
    case "SAVE_TOTAL_HEIGHT_OF_HISTORY_MSGS":
      return {...state, totalHeightOfHistoryMessages: action.ref}
    case "STORE_USER_SCROLL_POSITION":
      return {...state, userScrollPosition: action.userScrollPosition}
    case "BEGUN_INITIAL_LOADING":
      return {...state, initialLoading: true}
    case "FINISHED_INITIAL_LOADING":
      return {...state, initialLoading: false}
    case "WIDGET_TOGGLE":
      return {...state, inactive: !state.inactive}
    case "CREATED_INITIAL_MSG":
      return {...state, waitingOnInitialMessage: true}
    case "DISPATCHED_INITIAL_MSG":
      return {...state, waitingOnInitialMessage: false}
    default:
      return state;

  }

}
