'use client';
import React from 'react';
import Link from 'next/link';
import { Star, Gift, Truck, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './page.module.css';

export default function Home() {
  const occasions = [
    { title: 'Happy Birthday', img: 'https://picsum.photos/seed/gift1/600/600' },
    { title: 'Anniversary', img: 'https://picsum.photos/seed/gift2/600/600' },
    { title: 'Love & Romance', img: 'https://picsum.photos/seed/gift3/600/600' },
    { title: 'Corporate Gifts', img: 'https://picsum.photos/seed/gift4/600/600' },
  ];

  return (
    <div className={styles.main}>
      
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <motion.div 
            className={styles.heroLeft}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1>Create Beautiful Personalized Gift Hampers Made With Love</h1>
            <p>
              Design your dream hamper by choosing chocolates, flowers, teddy bears, 
              perfumes, candles, greeting cards, cakes and more.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/customize" className={styles.primaryBtn}>
                Start Customizing
              </Link>
              <Link href="/collections" className={styles.secondaryBtn}>
                Browse Collection
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className={styles.heroRight}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className={styles.placeholderHamper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hero.png" alt="Premium Luxury Hamper" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className={styles.trustSection}>
        <div className={`container ${styles.trustGrid}`}>
          <div className={styles.trustCard}>
            <Star className={styles.trustIcon} size={48} />
            <h3>Premium Quality</h3>
            <p>Only the finest luxury items in every hamper.</p>
          </div>
          <div className={styles.trustCard}>
            <Gift className={styles.trustIcon} size={48} />
            <h3>100% Customizable</h3>
            <p>You choose every single item, we arrange it beautifully.</p>
          </div>
          <div className={styles.trustCard}>
            <Heart className={styles.trustIcon} size={48} />
            <h3>Handcrafted</h3>
            <p>Assembled with love and extreme attention to detail.</p>
          </div>
          <div className={styles.trustCard}>
            <Truck className={styles.trustIcon} size={48} />
            <h3>Fast Delivery</h3>
            <p>Safely delivered to your loved ones on time.</p>
          </div>
        </div>
      </section>

      {/* SHOP BY OCCASION */}
      <section className={styles.occasionsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Shop by Occasion</h2>
            <p>Find the perfect gift for every special moment in life.</p>
          </div>
          
          <motion.div 
            className={styles.occasionsGrid}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
          >
            {occasions.map((occ, idx) => (
              <motion.div 
                key={idx} 
                className={styles.occasionCard}
                whileHover={{ y: -10 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={occ.img} alt={occ.title} />
                <div className={styles.occasionBg}></div>
                <div className={styles.occasionContent}>
                  <h3>{occ.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
