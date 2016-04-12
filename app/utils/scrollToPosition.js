const scrollToPosition = (el, x) => {
  // requestAnimationFrame
  // Insparation from http://codepen.io/ifen/pen/ejcty
  const raf = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    // IE Fallback, you can even fallback to onscroll
    function requestAnimationFrame(callback) {
      window.setTimeout(callback, 1000 / 60);
    };

  const element = el;
  let lastPosition = -100;

  const animate = () => {
    // Avoid calculations if not needed
    /* eslint no-else-return: 0 */
    if (lastPosition === window.pageYOffset) {
      raf(animate);
      return false;
    } else lastPosition = window.pageYOffset;

    element.style.transform = `translate3d(0px, -${lastPosition}px, 0px)`;
    element.scrollTop = x;

    raf(animate);
  };
  animate();
};

export default scrollToPosition;
