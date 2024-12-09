import { useUser } from "@/context/UserContext";
import React from "react";

const Footer: React.FC = () => {
  const { user } = useUser();
  
  return (
    <footer style={styles.footer}>
      <div className="container">
        <div className="row">
          {/* About Us Section */}
          <div className="col-md-6 mb-4 mb-md-0">
            <h5 style={styles.footerHeading}>About Us</h5>
            <p style={styles.footerText}>
              We are a leading ecommerce platform offering the latest gadgets and technology at affordable prices.
            </p>
          </div>

          {/* Spacer Column */}
          <div className="col-md-1"></div>

          {/* Quick Links Section */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 style={styles.footerHeading}>Quick Links</h5>
            <ul style={styles.footerList}>
              <li><a href={!user?'#':'/'} style={styles.footerLink}>Home</a></li>
              <li><a href={!user?'#':'/shop'} style={styles.footerLink}>Shop</a></li>
              <li><a href={!user?'#':'/contact'} style={styles.footerLink}>Contact</a></li>
              <li><a href={!user?'#':'/about'} style={styles.footerLink}>About</a></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="col-md-2 mb-4 mb-md-0">
            <h5 style={styles.footerHeading}>Follow Us</h5>
            <ul className="list-unstyled d-flex justify-content-between">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                  <i className="bi bi-facebook"></i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                  <i className="bi bi-twitter"></i>
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                  <i className="bi bi-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                  <i className="bi bi-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-4">
          <p style={styles.footerBottomText}>
            &copy; {new Date().getFullYear()} Capstone Project All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#2E3B4E',
    color: '#fff',
    padding: '40px 0',
  },
  footerHeading: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '20px',
  },
  footerText: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#ccc',
  },
  footerList: {
    paddingLeft: '0',
    listStyleType: 'none',
  },
  footerLink: {
    fontSize: '1rem',
    color: '#F7A100',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  footerLinkHover: {
    color: '#F39C12',
  },
  socialLink: {
    color: '#fff',
    fontSize: '1.5rem',
    transition: 'color 0.3s ease',
  },
  socialLinkHover: {
    color: '#F7A100',
  },
  footerBottomText: {
    fontSize: '1rem',
    color: '#ccc',
  },
};

export default Footer;
