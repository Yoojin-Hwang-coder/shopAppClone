const continents = [
  { _id: 1, name: 'Africa' },
  { _id: 2, name: 'Europe' },
  { _id: 3, name: 'Asia' },
  { _id: 4, name: 'North America' },
  { _id: 5, name: 'South America' },
  { _id: 6, name: 'Oceania' },
  { _id: 7, name: 'Antarctica' },
];

const price = [
  { _id: 1, name: 'Any', array: [] },
  { _id: 2, name: '$0 to $1000', array: [0, 1000] },
  { _id: 3, name: '$1001 to $2000', array: [1001, 2000] },
  { _id: 4, name: '$2001 to $3000', array: [2001, 3000] },
  { _id: 5, name: '$3001 to $4000', array: [3001, 4000] },
  { _id: 6, name: 'More than $4000', array: [4001, 1000000000000000] },
];
export { continents, price };
