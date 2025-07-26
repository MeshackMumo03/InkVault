export const zines = [
  {
    id: '1',
    title: 'Concrete Jungles',
    author: 'Alex Urban',
    coverImage: 'https://placehold.co/400x600',
    aiHint: 'city architecture',
    description: 'An exploration of brutalist architecture in modern cities.',
  },
  {
    id: '2',
    title: 'Midnight Thoughts',
    author: 'Sam Night',
    coverImage: 'https://placehold.co/400x600',
    aiHint: 'night sky',
    description: 'A collection of poems and sketches created after midnight.',
  },
  {
    id: '3',
    title: 'Gourmet Gazette',
    author: 'Chloe Cuisinier',
    coverImage: 'https://placehold.co/400x600',
    aiHint: 'food photography',
    description: 'Recipes and stories from a passionate home cook.',
  },
  {
    id: '4',
    title: 'The Wanderer',
    author: 'Joaquin Viajero',
    coverImage: 'https://placehold.co/400x600',
    aiHint: 'mountain landscape',
    description: 'Travel photography and journal entries from a year-long journey.',
  },
  {
    id: '5',
    title: 'Pixel Pioneers',
    author: 'Dev Dude',
    coverImage: 'https://placehold.co/400x600',
    aiHint: 'retro gaming',
    description: 'A retro look at the history of 8-bit video games.',
  },
  {
    id: '6',
    title: 'Flora & Fauna',
    author: 'Gaia Green',
    coverImage: 'https://placehold.co/400x600',
    aiHint: 'botanical illustration',
    description: 'Beautiful botanical illustrations and nature observations.',
  },
];

export const comments = [
    { id: 'c1', zineId: '1', author: 'Ben Struct', avatar: 'https://placehold.co/40x40', text: 'Love the stark visuals in this one!' },
    { id: 'c2', zineId: '1', author: 'Urban Explorer', avatar: 'https://placehold.co/40x40', text: 'Great showcase of brutalism. A true concrete masterpiece.' },
    { id: 'c3', zineId: '2', author: 'Dreamer', avatar: 'https://placehold.co/40x40', text: 'So moody and atmospheric. I read it every night.' },
];

export const userProfile = {
    name: 'Casey Creative',
    avatar: 'https://placehold.co/128x128',
    aiHint: 'person smiling',
    bio: 'Designer, illustrator, and zine enthusiast. Turning ideas into ink.',
    myZines: zines.slice(0, 2),
    bookmarkedZines: zines.slice(2, 4),
};

export type Zine = (typeof zines)[0];
export type Comment = (typeof comments)[0];
export type UserProfile = typeof userProfile;
