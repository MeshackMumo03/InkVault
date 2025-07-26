export const readingLists = [
  {
    name: 'To Read',
    publicationCount: 12,
    description: 'Publications I want to read',
  },
  {
    name: 'Completed',
    publicationCount: 2,
    description: 'Publications I have read',
  },
  {
    name: 'Favorites',
    publicationCount: 10,
    description: 'Publications I love',
  },
  {
    name: 'Travel',
    publicationCount: 15,
    description: 'Publications about travel',
  },
  {
    name: 'Cooking',
    publicationCount: 8,
    description: 'Publications about cooking',
  },
];

export const zines = [
    {
        id: '1',
        title: 'Concrete Jungles',
        author: 'Alex Urban',
        coverImage: 'https://placehold.co/150x225',
        aiHint: 'city architecture',
        description: 'An exploration of brutalist architecture in modern cities.',
    },
    {
        id: '2',
        title: 'Midnight Thoughts',
        author: 'Sam Night',
        coverImage: 'https://placehold.co/150x225',
        aiHint: 'night sky',
        description: 'A collection of poems and sketches created after midnight.',
    },
    {
        id: '3',
        title: 'Gourmet Gazette',
        author: 'Chloe Cuisinier',
        coverImage: 'https://placehold.co/150x225',
        aiHint: 'food photography',
        description: 'Recipes and stories from a passionate home cook.',
    },
    {
        id: '4',
        title: 'The Wanderer',
        author: 'Joaquin Viajero',
        coverImage: 'https://placehold.co/150x225',
        aiHint: 'mountain landscape',
        description: 'Travel photography and journal entries from a year-long journey.',
    },
    {
        id: '5',
        title: 'Pixel Pioneers',
        author: 'Dev Dude',
        coverImage: 'https://placehold.co/150x225',
        aiHint: 'retro gaming',
        description: 'A retro look at the history of 8-bit video games.',
    },
];

export type ReadingList = (typeof readingLists)[0];
export type Zine = (typeof zines)[0];
