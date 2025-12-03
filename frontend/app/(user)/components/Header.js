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

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const getLinkClass = (path, activeClass) => {
    const isActive = pathname === path;
    return `${styles.navLink} ${isActive ? `${styles.activePill} ${styles[activeClass]}` : ''}`;
  };

  return (
    <header className={`${styles.navbar} ${!isVisible ? styles.hidden : ''}`}>
      <div className="container d-flex align-items-center justify-content-between">
        {/* Left Side: Logo */}
        <div className="d-flex align-items-center" style={{ width: '200px' }}>
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

        {/* Center: Navigation Links */}
        <nav className="d-none d-lg-flex align-items-center gap-4 justify-content-center flex-grow-1">
          <TransitionLink href="/" className={getLinkClass('/', 'activeHome')}>Home</TransitionLink>
          <TransitionLink href="/bootcamp" className={getLinkClass('/bootcamp', 'activeBootcamp')}>Bootcamp</TransitionLink>
          <TransitionLink href="/info" className={getLinkClass('/info', 'activeInfo')}>Info</TransitionLink>
          <TransitionLink href="/talk" className={getLinkClass('/talk', 'activeTalk')}>Talks</TransitionLink>
          <TransitionLink href="/glory" className={getLinkClass('/glory', 'activeGlory')}>Glory</TransitionLink>
          <TransitionLink href="/dashboard" className={getLinkClass('/dashboard', 'activeDashboard')}>Dashboard</TransitionLink>
        </nav>

        {/* Right Side: Action Buttons */}
        <div className="d-flex align-items-center gap-3 justify-content-end" style={{ width: '200px' }}>
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
              {!isLoggedIn && <LoginButton />}
              {isLoggedIn && <ProfileButton />}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;