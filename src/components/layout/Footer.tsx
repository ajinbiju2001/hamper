import React from 'react';
import Link from 'next/link';
import { Camera, Mail, MessageCircle } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        
        <div className={styles.brandColumn}>
          <h2 className={styles.logo}>Cocobee</h2>
          <p className={styles.tagline}>Made With Love</p>
          <p className={styles.description}>
            Design your dream premium gift hamper and let us handcraft it with love, 
            care, and extreme attention to detail.
          </p>
          <div className={styles.socials}>
            <a href="#" aria-label="Instagram"><Camera size={24} /></a>
            <a href="#" aria-label="WhatsApp"><MessageCircle size={24} /></a>
            <a href="#" aria-label="Email"><Mail size={24} /></a>
          </div>
        </div>

        <div className={styles.linkColumn}>
          <h3>Quick Links</h3>
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/customize">Customize</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className={styles.linkColumn}>
          <h3>Collections</h3>
          <Link href="/collections/premium">Premium Gifts</Link>
          <Link href="/collections/anniversary">Anniversary</Link>
          <Link href="/collections/birthday">Birthday</Link>
          <Link href="/collections/corporate">Corporate Gifts</Link>
        </div>

        <div className={styles.newsletterColumn}>
          <h3>Join the Cocobee Family</h3>
          <p>Subscribe for exclusive luxury offers and gift ideas.</p>
          <form className={styles.newsletterForm}>
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>

      </div>
      
      <div className={styles.copyright}>
        <p>&copy; {new Date().getFullYear()} Cocobee. All rights reserved.</p>
      </div>
    </footer>
  );
}
