import React, { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    });
  }, []);

  return (
    <>
      {showScroll && (
        <button
          className="btn btn-secondary"
          id="ScrollButton"
          onClick={scrollTop}
        >
          <i className="fa fa-angle-double-up"></i>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
