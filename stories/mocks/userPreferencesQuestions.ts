/* eslint-disable */
// @ts-ignore
import localImage from '../assets/localImage';

const image = {
  localImage,
  alt: 'some descriptive image text',
};
const questions1 = [
  {
    orderIndex: 1,
    id: 1,
    key: 'question1',
    label: 'What do you like?',
    type: {
      control: 'checkbox',
    },
    options: [
      {
        value: 'meat',
        label: {
          text: 'Some text about meat',
          image,
        },
      },
      {
        value: 'bread',
        label: {
          text: 'Some text about bread',
          image,
        },
      },
    ],
    selectedOptions: ['meat'],
  },
  {
    orderIndex: 2,
    id: 2,
    key: 'question2',
    label: 'Choose your favourite dish?',
    type: {
      control: 'radio',
    },
    options: [
      {
        value: 'meat',
        label: {
          text: 'Some text about meat',
          image,
        },
      },
      {
        value: 'bread',
        label: {
          text: 'Some text about bread',
          image,
        },
      },
    ],
    selectedOptions: ['bread'],
  },
];
const questions2 = [
  {
    orderIndex: 3,
    id: 3,
    key: 'question3',
    label: 'What do you dislike?',
    type: {
      control: 'checkbox',
    },
    options: [
      {
        value: 'meat',
        label: {
          text: 'Some text about meat',
          image,
        },
      },
      {
        value: 'bread',
        label: {
          text: 'Some text about bread',
          image,
        },
      },
    ],
    selectedOptions: ['meat'],
  },
  {
    orderIndex: 4,
    id: 4,
    key: 'question4',
    label: 'Choose your unfavourite dish',
    type: {
      control: 'radio',
    },
    options: [
      {
        value: 'meat',
        label: {
          text: 'Some text about meat',
          image,
        },
      },
      {
        value: 'bread',
        label: {
          text: 'Some text about bread',
          image,
        },
      },
    ],
    selectedOptions: ['bread'],
  },
];
const preferencesIntroDefault = {
  heading: 'My personalisation preferences',
  content: `Your answers to surveys and Meal Planner are used to personalise your experience with eat.com and help you find the most relevant recipes. 
    Below are the answers you provided to us previously. Feel free to edit your answers and keep your personalised experience at eat.com up to date.`,
};
const preferencesIntro = {
  heading: 'Please pass quiz to setup your preferences',
  content: "You haven't provided any of your meal preferences yet.",
  availableQuizLinks: [],
};
const preferencesIntroWithLinks = {
  heading: 'Please pass quiz to setup your preferences',
  content: "You haven't provided any of your meal preferences yet.",
  availableQuizLinks: [
    { label: 'Pass quiz', path: 'path/to/quiz' },
    { label: 'Fill meal planner', path: 'path/to/meal/planner' },
  ],
};
const noResultProps = {
  heading: 'Personalise your experience!',
  message: `Try our diagnostic tools and 
    take our surveys to get more relevant  content, discounts and promotions...`,
};
const buttonsContent = {
  editButton: { label: 'Edit' },
  deleteButton: { label: 'Delete' },
  cancelButton: { label: 'Cancel' },
  saveButton: { label: 'Save' },
};

const resultLabelProps = {
  showResultLabel: 'Show answers count',
  savedResultsTemplateSingle: '{quantity} answer found',
  savedResultsTemplatePlural: '{quantity} answers found',
};

const entryUpdateProps = {
  deleteProps: {
    success: '1 answer deleted.',
    error:
      "We're sorry, we couldn't delete this answer. Please try again later.",
  },
  saveProps: {
    success: 'New answer saved.',
    error: "We're sorry, we couldn't save this answer. Please try again later.",
  },
};
export {
  questions1,
  questions2,
  preferencesIntroDefault,
  preferencesIntro,
  preferencesIntroWithLinks,
  noResultProps,
  buttonsContent,
  resultLabelProps,
  entryUpdateProps,
};
