import React from 'react';
import LeftPanel from '@/components/builder/LeftPanel';
import CenterPanel from '@/components/builder/CenterPanel';
import RightPanel from '@/components/builder/RightPanel';
import styles from './page.module.css';

export default function CustomizePage() {
  return (
    <div className={styles.builderLayout}>
      <LeftPanel />
      <CenterPanel />
      <RightPanel />
    </div>
  );
}
