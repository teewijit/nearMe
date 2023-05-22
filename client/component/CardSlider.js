import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="card-body text-center m-3 col-12 col-lg-3 col-sm-10 col-xs-12 min-height-100-vh">
        <img src="/slide1.jpg" className="img-thumbnail mb-3" alt="..." />
        <span>Test Pig 1</span>
      </div>
      <div className="card-body text-center m-3 col-12 col-lg-3 col-sm-10 col-xs-12">
        <img src="/slide2.jpg" className="img-thumbnail mb-3" alt="..." />
        <span>Test Pig 2</span>
      </div>
      <div className="card-body text-center m-3 col-12 col-lg-3 col-sm-10 col-xs-12">
        <img src="/slide3.jpg" className="img-thumbnail mb-3" alt="..." />
        <span>Test Pig 3</span>
      </div>
      <div className="card-body text-center m-3 col-12 col-lg-3 col-sm-10 col-xs-12">
        <img src="/slide4.jpg" className="img-thumbnail mb-3" alt="..." />
        <span>Test Pig 4</span>
      </div>
      <div className="card-body text-center m-3 col-12 col-lg-3 col-sm-10 col-xs-12">
        <img src="/slide5.jpg" className="img-thumbnail mb-3" alt="..." />
        <span>Test Pig 5</span>
      </div>
      <div className="card-body text-center m-3 col-12 col-lg-3 col-sm-10 col-xs-12">
        <img src="/slide6.jpg" className="img-thumbnail mb-3" alt="..." />
        <span>Test Pig 6</span>
      </div>
    </Slider>
  );
};

export default CardSlider;
