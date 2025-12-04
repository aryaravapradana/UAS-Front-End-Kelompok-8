'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ForgotPassword.module.css';
import API from '@/lib/api';
import FadeInOnScroll from '../../components/FadeInOnScroll';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch(API.auth.forgotPassword(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
      } else {
        setError(data.message || 'An error occurred.');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <FadeInOnScroll>
        <div className={styles.formWrapper}>
          <div className={styles.formHeader}>
            <div className={styles.formIcon}>
              <Image src="/uccd-logo@2x.png" alt="UCCD" width={40} height={40} className={styles.formIconImage} />
            </div>
            <h1 className={styles.title}>Forgot Password</h1>
            <p className={styles.subtitle}>
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {message && <div className={styles.alertSuccess}>{message}</div>}
          {error && <div className={styles.alertError}>{error}</div>}

          {!message && (
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <div className={styles.inputWrapper}>
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <button type="submit" className={styles.button} disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          )}

          <div className={styles.backToLogin}>
            Remember your password? <Link href="/login">Sign In</Link>
          </div>
        </div>
      </FadeInOnScroll>
    </div>
  );
}
