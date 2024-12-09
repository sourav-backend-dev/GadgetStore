"use client";
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <section className="container my-5">
      <h2 className="text-center mb-5 fade-in">Contact Us</h2>

      <div className="row">
        {/* Contact Information Section */}
        <div className="col-md-6 mb-4 fade-in-up">
          <h3>Our Address</h3>
          <p>
            12 Bridgeport Rd East<br />
            Waterloo, Ontario<br />
            Canada
          </p>

          <h3>Contact Information</h3>
          <p>
            <strong>Phone:</strong> +1 (123) 456-7890<br />
            <strong>Email:</strong> <a href="mailto:info@example.com">info@example.com</a><br />
            <strong>Business Hours:</strong><br />
            Monday - Friday: 9:00 AM - 5:00 PM<br />
            Saturday - Sunday: Closed
          </p>

          <h3>Follow Us</h3>
          <ul className="list-unstyled d-flex">
            <li className="mr-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-facebook text-dark"></i>
              </a>
            </li>
            <li className="mr-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-twitter text-dark"></i>
              </a>
            </li>
            <li className="mr-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-instagram text-dark"></i>
              </a>
            </li>
            <li className="mr-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-linkedin text-dark"></i>
              </a>
            </li>
          </ul>
        </div>

        {/* Google Maps Embed Section */}
        <div className="col-md-6 mb-4 fade-in-up">
          <h3>Find Us on the Map</h3>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2895.642605715962!2d-80.52461232418189!3d43.468058071111486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf40cc88c64e7%3A0xcb34620e28bfa482!2s12%20Bridgeport%20Rd%20E%2C%20Waterloo%2C%20ON%20N2J%202J3%2C%20Canada!5e0!3m2!1sen!2sin!4v1733404271700!5m2!1sen!2sin"
              width="600" height="450" loading="lazy" title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="row mt-5">
        <div className="col-md-12 fade-in-up">
          <h3 className="text-center">Send Us a Message</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control transition-effect"
                id="name"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control transition-effect"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Your Message</label>
              <textarea
                className="form-control transition-effect"
                id="message"
                rows={5}
                placeholder="Write your message"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100 transition-effect">Send Message</button>
          </form>
        </div>
      </div>

      {/* Internal CSS */}
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .fade-in {
          animation: fadeIn 1s ease-in-out;
        }
        
        .fade-in-up {
          animation: fadeInUp 1s ease-in-out;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .transition-effect {
          transition: all 0.3s ease-in-out;
        }

        .transition-effect:hover {
          transform: translateY(-5px);
        }

        .btn-primary {
          background-color: #007bff;
          border: none;
          padding: 10px 20px;
        }

        .btn-primary:hover {
          background-color: #0056b3;
        }
        
        .list-unstyled {
          list-style: none;
        }
        
        .list-unstyled li {
          display: inline-block;
        }

        .mr-3 {
          margin-right: 1rem;
        }

        .mr-4 {
          margin-right: 1.5rem;
        }

        .embed-responsive {
          position: relative;
          overflow: hidden;
          padding-bottom: 56.25%;
          height: 0;
        }

        .embed-responsive iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </section>
  );
};

export default ContactPage;
