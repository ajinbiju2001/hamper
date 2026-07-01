'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          Cocobee
        </Link>
        
        <nav className={styles.navLinks}>
          <Link href="/">Home</Link>
          <Link href="/customize">Customize</Link>
          <Link href="/occasions">Occasions</Link>
          <Link href="/collections">Collections</Link>
          <Link href="/corporate">Corporate Gifts</Link>
        </nav>
        
        <div className={styles.navActions}>
          <button className={styles.iconBtn} aria-label="Wishlist">
            <Heart size={20} />
          </button>
          <button className={styles.iconBtn} aria-label="Profile">
            <User size={20} />
          </button>
          <button className={styles.iconBtn} aria-label="Cart">
            <ShoppingBag size={20} />
          </button>
          
          <Link href="/customize" className={styles.primaryCta}>
            Customize
          </Link>

          <button 
            className={styles.menuToggle} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNavLinks}>
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/customize" onClick={() => setMobileMenuOpen(false)}>Customize</Link>
            <Link href="/occasions" onClick={() => setMobileMenuOpen(false)}>Occasions</Link>
            <Link href="/collections" onClick={() => setMobileMenuOpen(false)}>Collections</Link>
            <Link href="/corporate" onClick={() => setMobileMenuOpen(false)}>Corporate Gifts</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
