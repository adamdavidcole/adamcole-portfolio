import { useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Slider from "react-slick";

import { SPACING_PX, color } from "../utility/style-constants";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  id,
  lazyLoad = "ondemand",
}) {
  const slider = useRef();

  useEffect(() => {
    if (!slider.current) return;

    console.log("begin lazy load", slider);
    slider.current?.innerSlider?.progressiveLazyLoad();
  }, [slider]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad,
  };

  return (
    <SliderContainer>
      <GlobalStyle />
      <Slider {...settings} key={id} ref={slider}>
        {slides.map((slide, i) => (
          <SlideContainer key={i}>{slide}</SlideContainer>
        ))}
      </Slider>
    </SliderContainer>
  );
}
