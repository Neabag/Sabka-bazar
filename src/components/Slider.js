import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import "./Slider.scss";

function Slider() {
  const [state, setState] = useState({
    slidesData: [],
    slideIndex: 0,
  });
  const bannerUrl = "http://localhost:3000/banners";
  const slideRef = useRef();
  const slidesRef = useRef();
  const prevRef = useRef();
  const nextRef = useRef();
  const btnsRef = useRef();

  var sliderEle = document.getElementById("slider");

  useEffect(() => {
    axios
      .get(bannerUrl)
      .then((response) => {
        setState((prevState) => {
          return { ...prevState, slidesData: response.data };
        });
        slide(
          sliderEle,
          response.data.length,
          slidesRef.current,
          prevRef,
          nextRef
        );
      })
      .catch(function (error) {
        // manipulate the error response here
      });
  }, [sliderEle]);

  function slide(wrapper, slidesLength, items, prev, next) {
    var posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      threshold = 100,
      slideSize = slideRef.current.offsetWidth,
      index = 0,
      allowShift = true;

    // Mouse events
    slidesRef.current.onmousedown = dragStart;
    // Touch events
    slidesRef.current.addEventListener("touchstart", dragStart);
    slidesRef.current.addEventListener("touchend", dragEnd);
    slidesRef.current.addEventListener("touchmove", dragAction);

    // Click events
    prevRef.current.addEventListener("click", function () {
      shiftSlide("-");
    });
    nextRef.current.addEventListener("click", function () {
      shiftSlide("+");
    });
    for (let j = 0; j < btnsRef.current.children.length; j++) {
      btnsRef.current.children[j].addEventListener("click", function () {
        shiftSlide(j);
      });
    }

    // Transition events
    slidesRef.current.addEventListener("transitionend", checkIndex);

    function dragStart(e) {
      e = e || window.event;
      e.preventDefault();
      posInitial = slidesRef.current.offsetLeft;
      if (e.type === "touchstart") {
        posX1 = e.touches[0].clientX;
      } else {
        posX1 = e.clientX;
        document.onmouseup = dragEnd;
        document.onmousemove = dragAction;
      }
    }

    function dragAction(e) {
      e = e || window.event;
      if (e.type === "touchmove") {
        posX2 = posX1 - e.touches[0].clientX;
        posX1 = e.touches[0].clientX;
      } else {
        posX2 = posX1 - e.clientX;
        posX1 = e.clientX;
      }
      slidesRef.current.style.left =
        slidesRef.current.offsetLeft - posX2 + "px";
    }

    function dragEnd(e) {
      posFinal = slidesRef.current.offsetLeft;
      if (posFinal - posInitial < -threshold) {
        shiftSlide("+", "drag");
      } else if (posFinal - posInitial > threshold) {
        shiftSlide("-", "drag");
      } else {
        slidesRef.current.style.left = posInitial + "px";
      }
      document.onmouseup = null;
      document.onmousemove = null;
    }

    function shiftSlide(dir, action) {
      slidesRef.current.classList.add("shifting");
      if (allowShift) {
        if (!action) {
          posInitial = slidesRef.current.offsetLeft;
        }
        if (dir === "+") {
          slidesRef.current.style.left = posInitial - slideSize + "px";
          index++;
          setState((prevState) => {
            return { ...prevState, slideIndex: prevState.slideIndex + 1 };
          });
        } else if (dir === "-") {
          slidesRef.current.style.left = posInitial + slideSize + "px";
          index--;
          setState((prevState) => {
            return { ...prevState, slideIndex: prevState.slideIndex - 1 };
          });
        } else if (dir === 0 || dir > 0) {
          slidesRef.current.style.left = -slideSize * (dir + 1) + "px";
          index = dir;
          setState((prevState) => {
            return { ...prevState, slideIndex: dir };
          });
        }
      }

      allowShift = false;
    }

    function checkIndex() {
      slidesRef.current.classList.remove("shifting");
      if (index === -1) {
        slidesRef.current.style.left = -(slidesLength * slideSize) + "px";
        index = slidesLength - 1;
        setState((prevState) => {
          return { ...prevState, slideIndex: slidesLength - 1 };
        });
      }
      if (index === slidesLength) {
        slidesRef.current.style.left = -(1 * slideSize) + "px";
        index = 0;
        setState((prevState) => {
          return { ...prevState, slideIndex: 0 };
        });
      }
      allowShift = true;
    }
  }

  return (
    <div id="slider" className="slider">
      <div className="wrapper" tabIndex="0">
        <div id="slides" ref={slidesRef} className="slides">
          {state.slidesData.length !== 0 ? (
            <span className="slide">
              <img
                src={
                  ".." +
                  state.slidesData[state.slidesData.length - 1].bannerImageUrl
                }
                alt={
                  state.slidesData[state.slidesData.length - 1].bannerImageAlt
                }
              />
            </span>
          ) : (
            ""
          )}
          {state.slidesData.map((item, index) => {
            return (
              <span key={index} className="slide" ref={slideRef}>
                <img
                  src={".." + item.bannerImageUrl}
                  alt={item.bannerImageAlt}
                />
              </span>
            );
          })}
          {state.slidesData.length !== 0 ? (
            <span className="slide">
              <img
                src={".." + state.slidesData[0].bannerImageUrl}
                alt={state.slidesData[0].bannerImageAlt}
              />
            </span>
          ) : (
            ""
          )}
        </div>
        <div
          tabIndex="0"
          role="button"
          className="control prev"
          title="Prev"
          ref={prevRef}
        >
          PREV
        </div>
        <div
          tabIndex="0"
          role="button"
          className="control next"
          title="Next"
          ref={nextRef}
        >
          NEXT
        </div>
      </div>
      <div className="slideBtns" ref={btnsRef}>
        {state.slidesData.map((item, ind) => {
          return (
            <span
              key={ind}
              className={ind === state.slideIndex ? "dot active" : "dot"}
            ></span>
          );
        })}
      </div>
    </div>
  );
}

export default Slider;
