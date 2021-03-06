export function toggleResize() {
  return {
    type: "TOGGLE_RESIZE"
  }
}

function changeWidthAndHeight(screenHeight, screenWidth) {
  return {
    type: "CHANGE_WIDTH_AND_HEIGHT",
    screenHeight,
    screenWidth
  };
}

function changeIsMobile(isMobile) {
  return {
    type: "CHANGE_IS_MOBILE",
    isMobile,
  };
}

export function widgetToggle() {
  return {
    type: "WIDGET_TOGGLE"
  }
}
export function changeScrollIndex(scrollIndex) {
  return {
    type: "CHANGE_SCROLL_INDEX",
    scrollIndex
  }
}

export function infiniteLoading() {
  return {
    type: "INFINITE_LOADING"
  }
}

export function saveTotalHeightOfHistoryMessages(ref) {
  return {
    type: "SAVE_TOTAL_HEIGHT_OF_HISTORY_MSGS",
    ref
  }
}
export function infiniteLoadingDone() {
  return {
    type: "INFINITE_LOADING_DONE"
  }
}

export function referenceToConversationBody(ref) {
  return {
    type: "RECEIVE_REF_TO_CONVERSATION_BODY",
    ref
  }
}

export function storeUserScrollPosition(userScrollPosition) {
  return {
    type: "STORE_USER_SCROLL_POSITION",
    userScrollPosition
  }
}

export function initEnvironment() {
  return dispatch => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      document.body.style.overflow = 'hidden';
    }

    dispatch(changeIsMobile(isMobile));
    dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth));

    window.onresize = () => {
      dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth));
    }
  };
}
