'use client';

import React, { useState } from 'react';
import { useBuilderStore, ProductItem } from '@/store/useBuilderStore';
import styles from '@/app/customize/page.module.css';

const MOCK_PRODUCTS: ProductItem[] = [
  { id: '1', name: 'Ferrero Rocher Box', price: 25, category: 'Chocolate', image: '/products/ferrero.png' },
  { id: '2', name: 'Lindt Truffles', price: 30, category: 'Chocolate', image: '/products/lindt.png' },
  { id: '3', name: 'Red Roses Bouquet', price: 45, category: 'Flowers', image: '/products/roses.png' },
  { id: '4', name: 'Premium Teddy Bear', price: 40, category: 'Soft Toys', image: '/products/teddy.png' },
  { id: '5', name: 'Chanel Perfume', price: 150, category: 'Perfumes', image: '/products/chanel.png' },
  { id: '6', name: 'Scented Candle', price: 20, category: 'Candles', image: '/products/candle.png' },
  { id: '7', name: 'Macarons Box', price: 35, category: 'Chocolate', image: '/products/macarons.png' },
  { id: '8', name: 'Coffee Mug', price: 18, category: 'Accessories', image: '/products/mug.png' },
  { id: '9', name: 'Mini Champagne', price: 55, category: 'Accessories', image: '/products/champagne.png' },
  { id: '10', name: 'Greeting Card', price: 12, category: 'Cards', image: '/products/card.png' },
  { id: '11', name: 'Gold Necklace', price: 250, category: 'Accessories', image: '/products/necklace.png' },
  { id: '12', name: 'Choco Strawberries', price: 45, category: 'Chocolate', image: '/products/strawberries.png' },
];

const CATEGORIES = ['All', 'Chocolate', 'Flowers', 'Perfumes', 'Soft Toys', 'Candles', 'Accessories', 'Cards'];

export default function CenterPanel() {
  const { addItem, items, updateQuantity } = useBuilderStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [customItemName, setCustomItemName] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState(false);

  const filteredProducts = activeCategory === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className={styles.centerPanel}>
      <h2 className={styles.panelTitle}>2. Select Items</h2>
      
      <div className={styles.stepSection}>
        <div className={styles.optionGrid} style={{ marginBottom: '24px' }}>
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              className={`${styles.optionBtn} ${activeCategory === cat ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.productGrid}>
          {filteredProducts.map(product => {
            const selected = items.find(i => i.id === product.id);
            return (
              <div key={product.id} className={styles.productCard}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt={product.name} className={styles.productImg} />
                <div className={styles.productInfo}>
                  <h4>{product.name}</h4>
                  <p>${product.price}</p>
                </div>
                {selected ? (
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button 
                      onClick={() => updateQuantity(product.id, selected.quantity - 1)}
                      style={{ padding: '4px 12px', background: '#eee', borderRadius: '4px' }}
                    >-</button>
                    <span>{selected.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(product.id, selected.quantity + 1)}
                      style={{ padding: '4px 12px', background: '#eee', borderRadius: '4px' }}
                    >+</button>
                  </div>
                ) : (
                  <button className={styles.addBtn} onClick={() => addItem(product)}>
                    + Add to Hamper
                  </button>
                )}
              </div>
            );
          })}

          {/* Custom Item Request Card */}
          <div className={styles.productCard} style={{ background: 'var(--blush-pink)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/products/custom.png" alt="Request Custom Item" className={styles.productImg} />
            <div className={styles.productInfo}>
              <h4>Custom Request</h4>
              <p>Price TBD</p>
            </div>
            
            {isAddingCustom ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input 
                  type="text" 
                  value={customItemName} 
                  onChange={e => setCustomItemName(e.target.value)} 
                  placeholder="What do you need?"
                  style={{ padding: '8px', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.9rem' }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => {
                      if (customItemName.trim()) {
                        addItem({ 
                          id: `custom-${Date.now()}`, 
                          name: customItemName, 
                          price: 0, 
                          category: 'Custom', 
                          image: '/products/custom.png' 
                        });
                        setCustomItemName('');
                        setIsAddingCustom(false);
                      }
                    }}
                    className={styles.addBtn}
                    style={{ flex: 1, padding: '8px' }}
                  >Add</button>
                  <button 
                    onClick={() => setIsAddingCustom(false)} 
                    style={{ padding: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}
                  >Cancel</button>
                </div>
              </div>
            ) : (
              <button className={styles.addBtn} onClick={() => setIsAddingCustom(true)}>
                + Request Item
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
