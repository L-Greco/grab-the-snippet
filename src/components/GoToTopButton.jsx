import React, { useState, useEffect } from "react";

export default function GoToTopButton() {
  const returnToTop = function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  const [scroll, setScroll] = useState(1);
  useEffect(() => {
    const onScroll = () => {
      // console.log(document.documentElement.scrollTop);
      const scrollCheck =
        document.documentElement.scrollTop < 10 || document.body.scrolTop < 10;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [scroll, setScroll]);
  if (scroll === 1) return null;
  return <div className="goToTopBtn"></div>;
}
