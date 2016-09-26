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
