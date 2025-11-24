'use client';

import React from 'react';
import Image from 'next/image';
import styles from './BeasiswaDetailModal.module.css';

const BeasiswaDetailModal = ({ isOpen, onClose, beasiswa }) => {
  if (!isOpen || !beasiswa) return null;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Placeholder for description and benefits if not available
  const description = beasiswa.deskripsi || "This scholarship provides financial support and mentorship for students demonstrating academic excellence and leadership potential.";
  const benefits = beasiswa.benefits || [
    "Full tuition coverage",
    "Monthly stipend",
    "Mentorship program",
    "Networking opportunities"
  ];

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
      <div className={`${styles.modalContent} ${isOpen ? styles.open : ''}`} onClick={(e) => e.stopPropagation()}>
        {/* Left Half: Poster and Back Button */}
        <div className={styles.leftHalf}>
          <button className={styles.backButton} onClick={onClose}>
            <i className="fas fa-arrow-left"></i>
          </button>
          {beasiswa.posterUrl ? (
            <Image
              src={beasiswa.posterUrl}
              alt="Scholarship Poster"
              layout="fill"
              objectFit="contain"
              className={styles.posterImage}
            />
          ) : (
            <div className={styles.noPoster}>No poster available.</div>
          )}
        </div>

        {/* Right Half: Details */}
        <div className={styles.rightHalf}>
          <h2 className={styles.beasiswaName}>{beasiswa.nama_beasiswa}</h2>
          <p className={styles.beasiswaDescription}>{description}</p>

          <div className={styles.detailItem}>
            <i className="fas fa-calendar-alt"></i>
            <div className={styles.detailTextContainer}>
              <div className={styles.detailLabel}>Deadline</div>
              <div className={styles.detailValue}>{formatDate(beasiswa.tanggal_deadline)}</div>
            </div>
          </div>

          <div className={styles.detailItem}>
            <i className="fas fa-building"></i>
            <div className={styles.detailTextContainer}>
              <div className={styles.detailLabel}>Provider</div>
              <div className={styles.detailValue}>{beasiswa.penyelenggara}</div>
            </div>
          </div>

          <div className={styles.detailItem}>
            <i className="fas fa-gift"></i>
            <div className={styles.detailTextContainer}>
              <span className={styles.detailLabel}>Benefits</span>
              <ul className={styles.benefitsList}>
                {benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>

          <button className={styles.registerButton}>Apply Now</button>
        </div>
      </div>
    </div>
  );
};

export default BeasiswaDetailModal;
