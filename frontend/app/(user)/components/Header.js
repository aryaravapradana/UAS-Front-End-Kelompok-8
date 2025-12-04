'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import TransitionLink from './TransitionLink';
import Image from 'next/image';
import styles from './Header.module.css';
import LoginButton from './LoginButton';
import ProfileButton from './ProfileButton';
import NotificationDropdown from './NotificationDropdown';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isLoggedIn, loading } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and passed threshold
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const getLinkClass = (path, activeClass) => {
    const isActive = pathname === path;
    return `${styles.navLink} ${isActive ? `${styles.activePill} ${styles[activeClass]}` : ''}`;
  };

  return (
    <header className={`${styles.navbar} ${!isVisible ? styles.hidden : ''}`}>
      <div className="container d-flex align-items-center justify-content-between">
        {/* Left Side: Logo */}
        <div className={styles.leftSide}>
          <TransitionLink href="/" className="d-flex align-items-center text-decoration-none">
            <div className={styles.logoContainer}>
              <Image
                src="/uccd-logo@2x.png"
                alt="UCCD Logo"
                width={70}
                height={70}
                className={styles.logo3D}
              />
            </div>
            <span className={styles.logoText}>UCCD</span>
          </TransitionLink>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="d-none d-lg-flex align-items-center gap-4 justify-content-center flex-grow-1">
          <TransitionLink href="/" className={getLinkClass('/', 'activeHome')}>Home</TransitionLink>
          <TransitionLink href="/bootcamp" className={getLinkClass('/bootcamp', 'activeBootcamp')}>Bootcamp</TransitionLink>
          <TransitionLink href="/info" className={getLinkClass('/info', 'activeInfo')}>Info</TransitionLink>
          <TransitionLink href="/talk" className={getLinkClass('/talk', 'activeTalk')}>Talks</TransitionLink>
          <TransitionLink href="/glory" className={getLinkClass('/glory', 'activeGlory')}>Glory</TransitionLink>
          <TransitionLink href="/dashboard" className={getLinkClass('/dashboard', 'activeDashboard')}>Dashboard</TransitionLink>
        </nav>

        {/* Right Side: Action Buttons */}
        <div className={styles.rightSide}>
          {!loading && (
            <>
              {isLoggedIn && (
                <div className={styles.notificationWrapper} ref={dropdownRef}>
                  <button onClick={toggleDropdown} className={styles.notificationBell}>
                    <i className="fas fa-bell"></i>
                  </button>
                  {isDropdownOpen && <NotificationDropdown />}
                </div>
              )}
              {/* Always show Login/Profile */}
              <div>
                {!isLoggedIn && <LoginButton />}
                {isLoggedIn && <ProfileButton />}
              </div>
            </>
          )}
          
          {/* Hamburger Menu Button */}
          <button 
            className={`${styles.hamburger} ${isMobileMenuOpen ? styles.active : ''}`} 
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu Overlay */}
      <div className={`${styles.mobileNavOverlay} ${isMobileMenuOpen ? styles.open : ''}`} onClick={closeMobileMenu}></div>

      {/* Mobile Navigation Menu */}
      <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ''}`}>
        <TransitionLink href="/" className={styles.mobileNavLink} onClick={closeMobileMenu}>Home</TransitionLink>
        <TransitionLink href="/bootcamp" className={styles.mobileNavLink} onClick={closeMobileMenu}>Bootcamp</TransitionLink>
        <TransitionLink href="/info" className={styles.mobileNavLink} onClick={closeMobileMenu}>Info</TransitionLink>
        <TransitionLink href="/talk" className={styles.mobileNavLink} onClick={closeMobileMenu}>Talks</TransitionLink>
        <TransitionLink href="/glory" className={styles.mobileNavLink} onClick={closeMobileMenu}>Glory</TransitionLink>
        <TransitionLink href="/dashboard" className={styles.mobileNavLink} onClick={closeMobileMenu}>Dashboard</TransitionLink>
      </div>
    </header>
  );
};

export default Header;