"use client";
import React, { CSSProperties } from 'react';

const AboutPage: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* About Us Section */}
      <section style={styles.aboutSection}>
        <h1 style={styles.mainHeader}>Welcome to Our Store</h1>
        <p style={styles.paragraph}>
          We are a passionate team dedicated to providing high-quality products that enhance your lifestyle. Our mission is to offer the latest and most innovative electronics with exceptional customer service.
        </p>
        <p style={styles.subText}>
          With a focus on technology, quality, and value, we strive to be your go-to destination for all your electronics needs.
        </p>
      </section>

      {/* Mission Statement */}
      <section style={styles.missionSection}>
        <h2 style={styles.sectionHeader}>Our Mission</h2>
        <p style={styles.paragraph}>
          Our mission is to provide our customers with an unmatched shopping experience by offering the best in cutting-edge electronics. We aim to be a trusted partner in your tech journey, delivering high-quality products and offering reliable support every step of the way.
        </p>
      </section>

      {/* Our Team */}
      <section style={styles.teamSection}>
        <h2 style={styles.sectionHeader}>Meet the Team</h2>
        <div style={styles.cardRow}>
          <div style={styles.cardWrapper}>
            <div style={styles.card}>
              <img src="https://via.placeholder.com/300" alt="Team Member 1" style={styles.cardImage} />
              <div style={styles.cardBody}>
                <h5 style={styles.cardTitle}>John Doe</h5>
                <p style={styles.cardText}>CEO & Founder</p>
                <p style={styles.textMuted}>
                  John has over 15 years of experience in the tech industry and founded the company to share his passion for innovation with the world.
                </p>
              </div>
            </div>
          </div>
          <div style={styles.cardWrapper}>
            <div style={styles.card}>
              <img src="https://via.placeholder.com/300" alt="Team Member 2" style={styles.cardImage} />
              <div style={styles.cardBody}>
                <h5 style={styles.cardTitle}>Jane Smith</h5>
                <p style={styles.cardText}>Chief Operating Officer</p>
                <p style={styles.textMuted}>
                  Jane oversees daily operations and ensures that our products and services exceed customer expectations.
                </p>
              </div>
            </div>
          </div>
          <div style={styles.cardWrapper}>
            <div style={styles.card}>
              <img src="https://via.placeholder.com/300" alt="Team Member 3" style={styles.cardImage} />
              <div style={styles.cardBody}>
                <h5 style={styles.cardTitle}>David Lee</h5>
                <p style={styles.cardText}>Head of Customer Support</p>
                <p style={styles.textMuted}>
                  David leads our customer support team, ensuring that every customer has a positive experience with us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section style={styles.contactSection}>
        <h2 style={styles.sectionHeader}>Contact Us</h2>
        <div style={styles.contactRow}>
          <div style={styles.contactCard}>
            <h5 style={styles.contactHeader}>Email</h5>
            <p style={styles.contactText}>support@ourstore.com</p>
          </div>
          <div style={styles.contactCard}>
            <h5 style={styles.contactHeader}>Phone</h5>
            <p style={styles.contactText}>(123) 456-7890</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    fontFamily: '"Poppins", sans-serif',
    padding: '5rem 2rem',
    backgroundColor: '#f0f0f0',
    color: '#333',
  },
  aboutSection: {
    backgroundColor: '#2E3B4E',
    color: '#fff',
    textAlign: 'center',
    padding: '3rem 1.5rem',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    marginBottom: '4rem',
    transition: 'all 0.3s ease-in-out',
  },
  mainHeader: {
    fontSize: '3rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    color: '#F7A100', // Vibrant Accent
  },
  subText: {
    fontSize: '1rem',
    color: '#B0B0B0',
  },
  missionSection: {
    backgroundColor: '#DCE2E8',
    padding: '4rem 2rem',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    marginBottom: '4rem',
    transition: 'all 0.3s ease-in-out',
  },
  sectionHeader: {
    fontSize: '2.5rem',
    fontWeight: '600',
    color: '#F7A100',
    marginBottom: '1.5rem',
  },
  teamSection: {
    padding: '5rem 2rem',
    textAlign: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    marginBottom: '4rem',
  },
  cardRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  cardWrapper: {
    width: '280px',
    transition: 'transform 0.3s ease-in-out',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 'auto',
    transition: 'transform 0.3s ease-in-out',
  },
  cardBody: {
    padding: '1.5rem',
    textAlign: 'center',
    backgroundColor: '#F8F9FA',
  },
  cardTitle: {
    fontSize: '1.6rem',
    fontWeight: '500',
    color: '#2E3B4E',
  },
  cardText: {
    fontSize: '1rem',
    color: '#7E7E7E',
  },
  textMuted: {
    fontSize: '0.9rem',
    color: '#A0A0A0',
  },
  contactSection: {
    backgroundColor: '#34495E',
    color: '#fff',
    padding: '3rem 1.5rem',
    textAlign: 'center',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    marginBottom: '4rem',
  },
  contactRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  contactCard: {
    width: '280px',
    padding: '1.5rem',
    backgroundColor: '#2C3E50',
    borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    color: '#fff',
  },
  contactHeader: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
    color: '#F7A100',
  },
  contactText: {
    fontSize: '1.2rem',
  },
};

export default AboutPage;
