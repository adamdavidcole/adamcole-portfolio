import { useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Slider from "react-slick";

import preloadMedia from "../utility/preload-media";
import { SPACING_PX, color } from "../utility/style-constants";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DELAY_INITIAL_PRELOAD_SLIDE = 500;

const GlobalStyle = createGlobalStyle`
  .slick-arrow {
    z-index: 1;
    transition: color 0.25s ease;
  }

//   .slick-arrow:before {
//     color: white;
//     transition: color 0.25s ease;
//   }

//   .slick-arrow:hover:before {
//     color: ${color.blue}
//   } 

  .slick-dots li.slick-active button:before, 
  .slick-dots li:hover button:before {
    color: ${color.blue}
  }

  .slick-arrow.slick-prev {
    left: ${SPACING_PX[150]};
  }

  .slick-arrow.slick-next {
    right: ${SPACING_PX[150]};
  }

  #video_preload {
    display: none;
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: gray;

  .slick-arrow {
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  &:hover .slick-arrow {
    opacity: 0.5;

    &:hover {
      opacity: 0.7;
    }
  }
`;

const SlideContainer = styled.div`
  //   max-height: 800px;
  //   max-width: 800px;
`;

export default function SimpleSlider({
  slides = [],
  graphicURLs = [],
  id,
  lazyLoad = "ondemand",
}) {
  const videoRef = useRef();

  function preloadNextSlide(index) {
    if (!graphicURLs) return;

    const nextSlideIndex = (index + 1) % slides.length;
    const nextSlideGraphicURL = graphicURLs[nextSlideIndex];

    preloadMedia(nextSlideGraphicURL, videoRef);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad,
    onInit: () => {
      setTimeout(() => preloadNextSlide(0), DELAY_INITIAL_PRELOAD_SLIDE);
    },
    afterChange: (index) => {
      preloadNextSlide(index);
    },
  };

  return (
    <SliderContainer>
      <GlobalStyle />
      <Slider {...settings} key={id}>
        {slides.map((slide, i) => (
          <SlideContainer key={i}>{slide}</SlideContainer>
        ))}
      </Slider>
      <video
        ref={videoRef}
        id="video_preload"
        preload="auto"
        src=""
        playsInline
        muted
      ></video>
    </SliderContainer>
  );
}
