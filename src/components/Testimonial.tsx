import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const testimonials = [
  { id: 1, name: "John Doe", product: "Wireless Headphones", review: "Amazing sound quality, best headphones I've used!" },
  { id: 2, name: "Jane Smith", product: "Smartphone XYZ", review: "Incredible battery life and smooth performance." },
  { id: 3, name: "Mark Wilson", product: "Mechanical Keyboard", review: "Great tactile feel, perfect for gaming!" },
  { id: 4, name: "Emma Johnson", product: "Noise Cancelling Headphones", review: "Perfect for blocking out background noise." },
  { id: 5, name: "James Brown", product: "Gaming Phone", review: "A powerhouse for mobile gaming, highly recommend!" },
  { id: 6, name: "Sophia Miller", product: "Bluetooth Speaker", review: "Impressive sound for such a compact device!" },
  { id: 7, name: "Liam Davis", product: "Smartwatch Pro", review: "Great features and seamless integration with my phone." },
  { id: 8, name: "Olivia Garcia", product: "Wireless Earbuds", review: "Comfortable and great sound quality!" },
  { id: 9, name: "Lucas Martinez", product: "Gaming Mouse", review: "Perfect for FPS games, smooth and responsive." },
  { id: 10, name: "Mia Rodriguez", product: "Portable Charger", review: "Charges my devices super fast, very portable!" },
];

const TestimonialSlider: React.FC = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">What Our Customers Say</h2>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        interval={2500}
        transitionTime={1000}
        showIndicators={false}
        showArrows={false}
        showStatus={false}
        dynamicHeight={false}
        centerMode
      >
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="text-center p-4">
            <div className="bg-light p-4 rounded shadow-sm">
              <h5>{testimonial.name}</h5>
              <p className="text-muted">{testimonial.product}</p>
              <p>{testimonial.review}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TestimonialSlider;
