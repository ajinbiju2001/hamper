'use client';

import React from 'react';
import { useBuilderStore } from '@/store/useBuilderStore';
import styles from '@/app/customize/page.module.css';

export default function LeftPanel() {
  const { occasion, setOccasion, boxType, setBoxType, themeColor, setThemeColor } = useBuilderStore();

  const occasions = ['Birthday', 'Anniversary', 'Wedding', 'Corporate', 'Custom'];
  const boxTypes = ['Small', 'Medium', 'Luxury', 'Wooden', 'Premium Leather'];
  const colors = ['Pink', 'Red', 'White', 'Purple', 'Rose Gold', 'Gold'];

  return (
    <div className={styles.leftPanel}>
      <h2 className={styles.panelTitle}>1. Base Settings</h2>
      
      <div className={styles.stepSection}>
        <h3 className={styles.stepTitle}>Choose Occasion</h3>
        <div className={styles.optionGrid}>
          {occasions.map(occ => (
            <button 
              key={occ}
              className={`${styles.optionBtn} ${occasion === occ ? styles.active : ''}`}
              onClick={() => setOccasion(occ)}
            >
              {occ}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.stepSection}>
        <h3 className={styles.stepTitle}>Choose Hamper Box</h3>
        <div className={styles.optionGrid}>
          {boxTypes.map(box => (
            <button 
              key={box}
              className={`${styles.optionBtn} ${boxType === box ? styles.active : ''}`}
              onClick={() => setBoxType(box)}
            >
              {box}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.stepSection}>
        <h3 className={styles.stepTitle}>Choose Theme Color</h3>
        <div className={styles.optionGrid}>
          {colors.map(color => (
            <button 
              key={color}
              className={`${styles.optionBtn} ${themeColor === color ? styles.active : ''}`}
              onClick={() => setThemeColor(color)}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
