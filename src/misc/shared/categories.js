import * as categoryicons from '../../assets/categoryicons/index';

export const categoryIcons = [
    {
        src: categoryicons.foodsAndDrinks,
        category: 'Foods & Drinks'
    },
    {
        src: categoryicons.healthCare,
        category: 'Health Care'
    },
    {
        src: categoryicons.sports,
        category: 'Sports'
    },
    {
        src: categoryicons.businessAndFinance,
        category: 'Business & Finance'
    },
    {
        src: categoryicons.fashionAndClothing,
        category: 'Fashion & Clothing'
    },
    {
        src: categoryicons.online,
        category: 'Online'
    },
];

// construction
// sports
// packaging
// electronics
// business and finance
// fashion and clothing
// internet
// media
// tourism
// automotive and transport
// retail


export const categories = categoryIcons.map(obj => obj.category);