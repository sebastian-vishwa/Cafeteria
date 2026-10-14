export const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'buns', name: 'Buns' },
  { id: 'grills', name: 'Grills' },
  { id: 'mojitos', name: 'Mojitos' },
];

export const PRODUCTS = [
  {
    id: 'chicken-cheese-bun',
    name: 'Chicken cheese bun',
    category: 'buns',
    price: 650,
    description: 'A soft bun filled with chicken, cheese and house sauce.',
    image: '/images/chicken-cheese-bun.png',
    tags: ['Chicken', 'Cheese'],
    available: true,
    rating: null,
    reviewsCount: 0,
  },
  {
    id: 'spicy-chicken-bun',
    name: 'Spicy chicken bun',
    category: 'buns',
    price: 600,
    description: 'Chicken, crisp lettuce and a spicy sauce in a soft bun.',
    image: '/images/spicy-chicken-bun.png',
    tags: ['Chicken', 'Spicy'],
    available: true,
    rating: null,
    reviewsCount: 0,
  },
  {
    id: 'grilled-chicken',
    name: 'Grilled chicken',
    category: 'grills',
    price: 1450,
    description: 'Grilled chicken with a smoky seasoning and house sauce.',
    image: '/images/grilled-chicken.png',
    tags: ['Chicken', 'Grilled'],
    available: true,
    rating: null,
    reviewsCount: 0,
  },
  {
    id: 'bbq-chicken-wings',
    name: 'BBQ chicken wings',
    category: 'grills',
    price: 1100,
    description: 'Chicken wings coated in a rich barbecue sauce.',
    image: '/images/bbq-chicken-wings.png',
    tags: ['Chicken', 'BBQ'],
    available: true,
    rating: null,
    reviewsCount: 0,
  },
  {
    id: 'classic-lime-mojito',
    name: 'Classic lime mojito',
    category: 'mojitos',
    price: 550,
    description: 'A refreshing mix of lime, mint and soda. Alcohol-free.',
    image: '/images/classic-lime-mojito.png',
    tags: ['Lime', 'Mint', 'Cold'],
    available: true,
    rating: null,
    reviewsCount: 0,
  },
  {
    id: 'passion-fruit-mojito',
    name: 'Passion fruit mojito',
    category: 'mojitos',
    price: 650,
    description: 'Passion fruit, lime and mint topped with soda. Alcohol-free.',
    image: '/images/passion-fruit-mojito.png',
    tags: ['Passion fruit', 'Cold'],
    available: true,
    rating: null,
    reviewsCount: 0,
  },
];

export const HOMEPAGE_FAVORITES = PRODUCTS.slice(0, 4).map(
  (product) => product.id
);

// Compatibility with older demo imports.
export const SINGLE_ORIGIN_SPECIAL = {
  ...PRODUCTS[0],
  subtitle: 'Josh Cafe',
  notes: PRODUCTS[0].description,
  weight: 'portion',
};

export const formatPrice = (amount) =>
  `LKR ${Number(amount).toLocaleString('en-LK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;