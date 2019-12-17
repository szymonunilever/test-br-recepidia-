/* eslint-disable */
import questionsMock from './wizardQuizQuestions';
import { Question } from '../components/Wizard/partials/Quiz/models';

const clone = (obj: Question) => {
  if (null == obj || 'object' != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) {
      // @ts-ignore
      copy[attr] = obj[attr];
    }
  }
  return copy;
};
const mocks: Question[] = [];
questionsMock.forEach(question => mocks.push(clone(question)));
mocks.forEach((q, index) => (q.key = q.key + index));

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
const signUpContent: AppContent.GeneratedForm.Content = {
  view: 'NewsletterSubscriptions',
  submitButton: {
    label: 'Update my preferences',
  },
  title: 'Newsletter subscriptions',
  fields: [
    {
      name: 'Subscribe to newsletter',
      type: 'checkbox',
      label: 'Subscribe to newsletter',
      value: 'Subscribe to newsletter',
    },
    {
      name: 'Subscribe to whitelabel newsletter',
      type: 'checkbox',
      label: 'Subscribe to whitelabel newsletter',
      value: 'Subscribe to whitelabel newsletter',
    },
  ],
};

enum QuestionFilterPropNameKeys {
  tags = 'tags',
  empty = '',
}

const answers1 = {
  question1: { value: '1', filterPropName: QuestionFilterPropNameKeys.tags },
  question2: {
    value: ['1', '3', '5'],
    filterPropName: QuestionFilterPropNameKeys.tags,
  },
  question3: { value: '2', filterPropName: QuestionFilterPropNameKeys.tags },
  question4: { value: '1457', filterPropName: QuestionFilterPropNameKeys.tags },
};
let answers2 = {};
// @ts-ignore
mocks.forEach(question => {
  // @ts-ignore
  answers2[question.key] =
    question.type.control === 'radio'
      ? question.options[0].value
      : [question.options[1].value];
});
enum ProfileKey {
  initialQuiz = 'initialQuiz',
  favorites = 'favorites',
  mealPlannerAnswers = 'mealPlannerAnswers',
  mealPlannerResults = 'mealPlannerResults',
  user = 'user',
}
export {
  mocks as questionsMock,
  preferencesIntroDefault,
  preferencesIntro,
  preferencesIntroWithLinks,
  noResultProps,
  buttonsContent,
  resultLabelProps,
  entryUpdateProps,
  signUpContent,
  answers1,
  answers2,
  ProfileKey,
};
