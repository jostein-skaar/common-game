export function reloadWhenResize(window: Window) {
  const hackForIos = Date.now();
  const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
  let restartTimeout: any;
  window.onresize = () => {
    if (isIos && Date.now() - hackForIos < 1000) {
      return;
    }

    clearTimeout(restartTimeout);
    restartTimeout = setTimeout(() => {
      window.location.reload();
    }, 200);
  };
}
