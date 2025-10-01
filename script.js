// reveal.js (loaded with defer)
// Wraps everything in a function called start, load the script with defer so runs after html is parses, meaning all .reveal elements exist.
const start = () => {
  // wait a frame so .reveal-init styles apply before we start toggling classes. Real browser API, used to smooth animations. And does a one frame delay, if you warp the .reaveal-init -> .is-visible toggle in the request animation frame.
  requestAnimationFrame(() => {
    // Single intersection observer that watches all elements and tells you when they enter annd leave view port. Takes callback and options
    const io = new IntersectionObserver(
      // Loops through each visiblity update,
      (entries, obs) => {
        // entries is an array of intersectionobserverentry objects. literally html elements and it looks at isintersecting, insectionratio and returns an array could be 1 or more as multiple arrays can pass threshold, and obs is the observer instance itself
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // e.intersectiing is true when element is at or beyond the treshold of  visibility.
            e.target.classList.add("is-visible"); // Adds is-visble class to element then transition runs.
            obs.unobserve(e.target); // Stops watching the element so wont be reanimated later.
          }
        });
      },
      { threshold: 0.15 } // Fires when 15% of the element becomes visible
    );

    document.querySelectorAll(".reveal").forEach((el) => io.observe(el)); // Selects all elements with .reveal and registers each with the observer
  });
};
start(); // Call start to run the code immediately since we are loading with defer.
