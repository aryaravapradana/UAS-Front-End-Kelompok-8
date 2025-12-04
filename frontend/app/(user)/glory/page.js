'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import styles from './glory.module.css';
import { useTransition } from '../context/TransitionContext';
import FadeInOnScroll from '../components/FadeInOnScroll';
import API from '@/lib/api';

export default function GloryPage() {
  const { endTransition } = useTransition();

  useEffect(() => {
    endTransition();
  }, [endTransition]);

  return (
    <div className={styles.gloryPage}>
      <Header />
      <FadeInOnScroll>
        <HeroSection />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <WhatIsSection />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <HallOfAchievementSection />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <GloryKnowMoreSection />
      </FadeInOnScroll>
      <AppFooter />
    </div>
  );
}

function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1>
            Celebrating Achievements
            <br />
            that Inspire
          </h1>
          <p>
            UCCD Glory honors the outstanding accomplishments of FTI UNTAR students in academic and technology competitions.
          </p>
        </div>
      </div>
    </section>
  );
}

function WhatIsSection() {
  return (
    <section className={styles.whatIsSection}>
      <div className={styles.container}>
        <div className={styles.whatIsContent}>
          <div className={styles.whatIsText}>
            <h2>What is<br />UCCD Glory?</h2>
            <p>
              UCCD Glory is a platform to <strong>recognize and appreciate</strong> the outstanding achievements of FTI UNTAR students in academic and technology competitions. It serves as a hall of fame to celebrate their success and inspire other students.
            </p>
          </div>
          <div className={styles.whatIsImage}>
            <Image
              src="/glory/trophyphoto1.png"
              alt="Glory Hall of Achievement"
              width={550}
              height={400}
              className={styles.bootcampImg}
              quality={100}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function HallOfAchievementSection() {
  const winners = [
    {
      title: "I/O Festival 2025",
      subtitle: "Juara Harapan 2",
      members: ["Nathan Ginta Thiores", "Michael Chan", "Hengky Laurencio"],
      image: "/glory/winner1.png"
    },
    {
      title: "Recursion 2025",
      subtitle: "Juara 2",
      members: ["Nathan Filza Ardika", "Angel Fransisca Wijaya", "Samuel Supardjo"],
      image: "/glory/winner2.png"
    },
    {
      title: "IT Fest 2024",
      subtitle: "Juara 2",
      members: ["Celvin", "Melisa Olivia", "Michelle"],
      image: "/glory/winner3.png"
    }
  ];

  return (
    <section className={styles.hallOfAchievementSection}>
      <div className="container text-center">
        <div className={styles.titleWrapper} style={{ '--line-left-offset': '-140px', '--line-left-length': '140px', '--line-right-offset': '-140px', '--line-right-length': '140px' }}>
          <span className={`${styles.dot} ${styles.dotLeft}`}></span>
          <h2 className={styles.sectionTitle}>Hall of Achievement</h2>
          <span className={`${styles.dot} ${styles.dotRight}`}></span>
        </div>
        <p className={styles.sectionSubtitle}>Celebrating the champions who have demonstrated exceptional skill and dedication.</p>

        <div className={styles.container}>
          {winners.map((winner, index) => (
            <div key={index} className={styles.winnerCard}>
              <div className={styles.winnerCardContent}>
                <h3 className={styles.winnerTitle}>{winner.title}</h3>
                <p className={styles.winnerSubtitle}>{winner.subtitle}</p>
                <ul className={styles.winnerList}>
                  {winner.members.map((member, idx) => (
                    <li key={idx}><i className="fas fa-user"></i> {member}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.winnerCardImageWrapper}>
                <Image
                  src={winner.image}
                  alt={winner.title}
                  width={1575}
                  height={1825}
                  className={styles.winnerCardImage}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GloryKnowMoreSection() {
  return (
    <section className={styles.gloryKnowMoreSection}>
      <div className="container text-center">
        <div className="mb-5">
          <div className={styles.bootcampTitleWrapper} style={{ '--line-left-offset': '-140px', '--line-left-length': '130px', '--line-right-offset': '-140px', '--line-right-length': '130px' }}>
            <span className={`${styles.bootcampDot} ${styles.bootcampDotLeft}`}></span>
            <h2 className={styles.bootcampFeaturesTitle}>Get To Know More</h2>
            <span className={`${styles.bootcampDot} ${styles.bootcampDotRight}`}></span>
          </div>
          <p className={styles.bootcampFeaturesSubtext}>Gain the information you need to level up your skills here</p>
        </div>

        <div className={`row gy-4 justify-content-center ${styles.featureCardsContainer}`}>
          <div className="col-lg-4 col-md-6">
            <Link href="/info" className={`${styles.featureCard} ${styles.infoCard} shadow-sm`}>
              <Image src="/info.png" width={64} height={64} alt="Info" className={styles.featureImg} />
              <h3>INFO</h3>
              <p>Updates on tech competitions and scholarships to support student growth.</p>
            </Link>
          </div>

          <div className="col-lg-4 col-md-6">
            <Link href="/talk" className={`${styles.featureCard} ${styles.talksCard} shadow-sm`}>
              <Image src="/talks.png" width={64} height={64} alt="Talks" className={styles.featureImg} />
              <h3>TALKS</h3>
              <p>Talkshows with tech professionals sharing industry insights and career experiences.</p>
            </Link>
          </div>

          <div className="col-lg-4 col-md-6">
            <Link href="/bootcamp" className={`${styles.featureCard} ${styles.bootcampCard} shadow-sm`}>
              <Image src="/bootcamp.png" width={64} height={64} alt="Bootcamp" className={styles.featureImg} />
              <h3>BOOTCAMP</h3>
              <p>Intensive training programs designed to enhance technical skills and knowledge in various tech domains.</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function AppFooter() {
  return (
    <footer className={styles.infoFooter}>
      <div className={styles.container}>
        <div className={styles.infoFooterContent}>
          <div className={styles.infoFooterLeft}>
            <div className={styles.infoFooterLogoWrapper}>
              <div className={styles.infoFooterLogo}>
                <Image src="/uccd-logo@2x.png" alt="UCCD" width={50} height={50} className={styles.infoFooterLogoImg} unoptimized />
              </div>
              <div>
                <div className={styles.infoFooterLogoText}>UCCD</div>
                <div className={styles.infoFooterLogoSubtext}>
                  UNTAR COMPUTER<br />
                  CLUB DEVELOPMENT
                </div>
              </div>
            </div>
            <p className={styles.infoFooterDescription}>
              UCCD is a student organization under BEM FTI UNTAR focused on developing IT-related academic and extracurricular programs.
            </p>
          </div>

          <div className={styles.infoFooterMiddle}>
            <h4 className={styles.infoFooterTitle}>Contact</h4>
            <a href="mailto:uccd@untar.ac.id" className={styles.infoFooterLink}>
              <i className="fas fa-envelope me-2"></i>
              uccd@untar.ac.id
            </a>
            <a
              href="https://www.instagram.com/uccdfti.untar?igsh=MW00ZjJtZmJpMTEwMQ=="
              className={`${styles.infoFooterLink} ${styles.infoInstagramLink}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={`fab fa-instagram ${styles.infoInstagramIcon}`}></i>
              @uccdfti.untar
            </a>
          </div>
          
          <div className={styles.infoFooterRight}>
            <h4 className={styles.infoFooterTitle}>About</h4>
            <Link href="/" className={styles.infoFooterLink}>Home</Link>
            <Link href="/bootcamp" className={styles.infoFooterLink}>Bootcamp</Link>
            <Link href="/glory" className={styles.infoFooterLink}>Glory</Link>
            <Link href="/talk" className={styles.infoFooterLink}>Talks</Link>
            <Link href="/info" className={styles.infoFooterLink}>Info</Link>
          </div>
        </div>

        <p className={styles.infoFooterCopyright}>
          © 2025 UCCD - Untar Computer Club Development. All rights reserved.
        </p>
      </div>
    </footer>
  );
}