import { create } from 'zustand';

export type ProductItem = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
};

export type SelectedItem = ProductItem & {
  quantity: number;
};

interface BuilderState {
  occasion: string;
  boxType: string;
  themeColor: string;
  items: SelectedItem[];
  
  setOccasion: (occ: string) => void;
  setBoxType: (box: string) => void;
  setThemeColor: (color: string) => void;
  
  addItem: (item: ProductItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  
  getTotalPrice: () => number;
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  occasion: 'Birthday',
  boxType: 'Luxury',
  themeColor: 'Pink',
  items: [],
  
  setOccasion: (occ) => set({ occasion: occ }),
  setBoxType: (box) => set({ boxType: box }),
  setThemeColor: (color) => set({ themeColor: color }),
  
  addItem: (item) => set((state) => {
    const existing = state.items.find(i => i.id === item.id);
    if (existing) {
      return {
        items: state.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      };
    }
    return { items: [...state.items, { ...item, quantity: 1 }] };
  }),
  
  removeItem: (id) => set((state) => ({
    items: state.items.filter(i => i.id !== id)
  })),
  
  updateQuantity: (id, qty) => set((state) => {
    if (qty <= 0) {
      return { items: state.items.filter(i => i.id !== id) };
    }
    return {
      items: state.items.map(i => i.id === id ? { ...i, quantity: qty } : i)
    };
  }),
  
  getTotalPrice: () => {
    const state = get();
    // Add base price for box type
    let basePrice = 50; // default
    if (state.boxType === 'Premium Leather') basePrice = 120;
    if (state.boxType === 'Wooden') basePrice = 80;
    
    const itemsTotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    return basePrice + itemsTotal;
  }
}));
