import { Coffee, Leaf, CakeSlice } from 'lucide-react';

export const categories = [
  { id: 'coffee', label: 'Coffee', icon: Coffee },
  { id: 'tea', label: 'Tea', icon: Leaf },
  { id: 'pastries', label: 'Pastries', icon: CakeSlice },
];

export const menuItems = {
  coffee: [
    { id: 1, name: 'Neon Espresso', price: '$4.50', desc: 'Double shot of our vibrant house blend.', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80' },
    { id: 2, name: 'Pink Velvet Latte', price: '$6.00', desc: 'Smooth latte with a hint of beetroot and vanilla.', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80' },
    { id: 3, name: 'Golden Macchiato', price: '$5.50', desc: 'Caramel infused espresso with steamed milk.', img: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80' },
    { id: 4, name: 'Cold Brew Glow', price: '$5.00', desc: '24-hour steeped cold brew over crystal ice.', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80' },
  ],
  tea: [
    { id: 5, name: 'Matcha Cloud', price: '$6.50', desc: 'Ceremonial grade matcha with oat milk foam.', img: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=600&q=80' },
    { id: 6, name: 'Hibiscus Burst', price: '$5.00', desc: 'Iced hibiscus tea with fresh berries.', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80' },
    { id: 7, name: 'Lavender Earl Grey', price: '$5.50', desc: 'Classic Earl Grey infused with lavender.', img: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cbf9?auto=format&fit=crop&w=600&q=80' },
    { id: 8, name: 'Peach Oolong', price: '$6.00', desc: 'Premium oolong tea with sweet peach notes.', img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80' },
  ],
  pastries: [
    { id: 9, name: 'Rainbow Croissant', price: '$5.50', desc: 'Flaky, buttery croissant with colorful layers.', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80' },
    { id: 10, name: 'Berry Tart', price: '$7.00', desc: 'Fresh seasonal berries on a crisp pastry shell.', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80' },
    { id: 11, name: 'Neon Macarons', price: '$8.00', desc: 'Box of 3 vibrant, assorted flavor macarons.', img: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80' },
    { id: 12, name: 'Chocolate Lava', price: '$7.50', desc: 'Warm chocolate cake with a gooey center.', img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=600&q=80' },
  ]
};

export const allMenuItems = [
  ...menuItems.coffee,
  ...menuItems.tea,
  ...menuItems.pastries
];
