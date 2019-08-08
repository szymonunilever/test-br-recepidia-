const image = {
  url: '',
  alt: '',
};
const questionsMock = [
  {
    orderIndex: 1,
    id: 1,
    key: 'question1',
    label: 'Select the recipes that appeal to you',
    type: {
      control: 'radio',
      labelPosition: 'bottom',
    },
    options: [
      {
        value: '1',
        label: {
          text: 'I like to try new foods',
          image,
        },
      },
      {
        value: '2',
        label: {
          text: 'Heart of palm pie',
          image,
        },
      },
      {
        value: '3',
        label: {
          text: 'Chocolate cake',
          image,
        },
      },
      {
        value: '4',
        label: {
          text: 'Burger',
          image,
        },
      },
      {
        value: '5',
        label: {
          text: 'Kids Food',
          image,
        },
      },
      {
        value: '6',
        label: {
          text: 'Barbecue',
          image,
        },
      },
      {
        value: '7',
        label: {
          text: 'Quinoa and Organic Dish',
          image,
        },
      },
      {
        value: '8',
        label: {
          text: 'Salad with chicken',
          image,
        },
      },
      {
        value: '9',
        label: {
          text: 'Christmas Food',
          image,
        },
      },
    ],
  },
  {
    orderIndex: 2,
    id: 2,
    key: 'question2',
    label: 'Any allergies or diets?',
    type: {
      control: 'checkbox',
      labelPosition: 'bottom',
    },
    options: [
      {
        value: '1',
        label: {
          text: 'No restriction',
          image,
        },
      },
      {
        value: '2',
        label: {
          text: 'Vegan',
          image,
        },
      },
      {
        value: '3',
        label: {
          text: 'Vegetarian',
          image,
        },
      },
      {
        value: '4',
        label: {
          text: 'Sugar Free',
          image,
        },
      },
      {
        value: '5',
        label: {
          text: 'Lactose Free',
          image,
        },
      },
      {
        value: '6',
        label: {
          text: 'Gluten free',
          image,
        },
      },
      {
        value: '7',
        label: {
          text: 'No sea food',
          image,
        },
      },
      {
        value: '8',
        label: {
          text: 'No soy',
          image,
        },
      },
    ],
  },
  {
    orderIndex: 3,
    id: 3,
    key: 'question3',
    label: 'What is your perfect dinner like?',
    type: {
      control: 'radio',
      labelPosition: 'bottom',
    },
    options: [
      {
        value: '1',
        label: {
          text: 'Friends',
          image,
        },
      },
      {
        value: '2',
        label: {
          text: 'Romantic dinner',
          image,
        },
      },
      {
        value: '3',
        label: {
          text: 'Family Fun',
          image,
        },
      },
      {
        value: '4',
        label: {
          text: 'Calm dinner with partner',
          image,
        },
      },
    ],
  },
  {
    orderIndex: 4,
    id: 4,
    key: 'question4',
    label: 'How do you see yourself in the kitchen?',
    type: {
      control: 'radio',
      labelPosition: 'bottom',
    },
    options: [
      {
        value: '1457',
        label: {
          text: 'I only know how to make ice',
          image,
        },
      },
      {
        value: '1460',
        label: {
          text: 'I can survive',
          image,
        },
      },
      {
        value: '1458;1459',
        label: {
          text: 'I am a master chef',
          image,
        },
      },
    ],
  },
];

export default questionsMock;
