import Image from "next/image";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import image4 from "../images/image4.jpg";

const HomeSlider: React.FC = () => {
  return (
    <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <Image
            src={image1}
            alt="image1"
            layout="responsive"
            className="d-block"
          />
        </div>
        <div className="carousel-item">
          <Image
            src={image2}
            alt="image2"
            layout="responsive"
            className="d-block "
          />
        </div>
        <div className="carousel-item">
          <Image
            src={image3}
            alt="image3"
            layout="responsive"
            className="d-block "
          />
        </div>
        <div className="carousel-item">
          <Image
            src={image4}
            alt="image4"
            layout="responsive"
            className="d-block "
          />
        </div>
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#homeCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#homeCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default HomeSlider;
