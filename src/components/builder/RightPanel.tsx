'use client';

import React from 'react';
import { useBuilderStore } from '@/store/useBuilderStore';
import styles from '@/app/customize/page.module.css';

export default function RightPanel() {
  const { getTotalPrice, items } = useBuilderStore();

  return (
    <div className={styles.rightPanel}>
      {/* 2D Real Box Arrangement */}
      <div className={styles.boxComposer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/box.png" alt="Empty Box" className={styles.boxBg} />
        
        <div className={styles.itemsOverlay}>
          {items.map((item, index) => {
            // Distribute items inside the box
            const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
            
            // To render all quantities, we loop
            const elements = [];
            for(let q = 0; q < item.quantity; q++) {
              // Calculate some semi-random but distributed positions
              // Center offset
              const idOffset = parseInt(item.id) * 15;
              const qOffset = q * 20;
              const top = 30 + ((idOffset + qOffset) % 40);
              const left = 20 + (((idOffset * 2) + (qOffset * 3)) % 50);
              
              elements.push(
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  key={`${item.id}-${q}`}
                  src={item.image} 
                  alt={item.name} 
                  className={styles.overlayItem}
                  style={{
                    top: `${top}%`,
                    left: `${left}%`,
                    transform: `rotate(${((idOffset + qOffset) % 30) - 15}deg)`,
                    zIndex: index + q
                  }}
                />
              );
            }
            return elements;
          })}
        </div>
      </div>

      {/* Price Overlay */}
      <div className={styles.priceOverlay}>
        <div className={styles.priceInfo}>
          <h3>${getTotalPrice().toFixed(2)}</h3>
          <p>{items.length} Items Selected</p>
        </div>
        <button className={styles.checkoutBtn}>
          Proceed to WhatsApp
        </button>
      </div>
    </div>
  );
}
