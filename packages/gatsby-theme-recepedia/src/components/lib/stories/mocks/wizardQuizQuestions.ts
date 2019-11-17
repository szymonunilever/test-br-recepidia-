import localImage from '../assets/localImage';
import { QuestionFilterPropNameKeys } from '../../components/Wizard/partials/Quiz/models';

const image = {
  localImage,
  alt: '',
};
const questionsMock = [
  {
    orderIndex: 1,
    id: 1,
    key: 'mealPlannerQuestion1',
    label: 'Favorite cuisines',
    type: {
      control: 'checkbox',
      labelPosition: 'bottom',
    },
    filterPropName: QuestionFilterPropNameKeys.tags,
    options: [
      {
        value: '1503;1484',
        label: {
          text: 'Chicken',
          image,
        },
      },
      {
        value: '1397;1467;1315;1466;1469;1481;693;1319;1317;1478',
        label: {
          text: 'Desserts',
          image,
        },
      },
      {
        value: '1464;1313;1314',
        label: {
          text: 'Pizza',
          image,
        },
      },
      {
        value: '1475;1490;1321',
        label: {
          text: 'Fish',
          image,
        },
      },
      {
        value: '1477;1488;1465;1497',
        label: {
          text: 'Hamburguer & Sandwiches',
          image,
        },
      },
      {
        value: '1479;1492;1499',
        label: {
          text: 'Meat',
          image,
        },
      },
      {
        value: '664;1480;699',
        label: {
          text: 'Pasta',
          image,
        },
      },
      {
        value: '1483;665;1485',
        label: {
          text: 'Pies',
          image,
        },
      },
      {
        value: '1487;1108;1476;1495;1473;organic;healthy',
        label: {
          text: 'Healthy',
          image,
        },
      },
      {
        value: '1491',
        label: {
          text: 'Soups',
          image,
        },
      },
    ],
  },
  {
    orderIndex: 2,
    id: 2,
    key: 'mealPlannerQuestion2',
    label: 'Time',
    type: {
      control: 'radio',
      labelPosition: 'bottom',
    },
    filterPropName: QuestionFilterPropNameKeys.empty,
    options: [
      {
        value: '20',
        label: {
          text: 'Quick recipe (Total time < 20 min)',
          image,
        },
      },
      {
        value: '999',
        label: {
          text: 'I have a lot of time',
          image,
        },
      },
    ],
  },
  {
    orderIndex: 3,
    id: 3,
    key: 'mealPlannerQuestion3',
    label: 'Budget',
    type: {
      control: 'radio',
      labelPosition: 'bottom',
    },
    filterPropName: QuestionFilterPropNameKeys.tags,
    options: [
      {
        value: '1371',
        label: {
          text: 'High',
          image,
        },
      },
      {
        value: '1369',
        label: {
          text: 'Medium',
          image,
        },
      },
    ],
  },
  {
    orderIndex: 4,
    id: 4,
    key: 'mealPlannerQuestion4',
    label: 'Number of serving',
    type: {
      control: 'radio',
      labelPosition: 'bottom',
    },
    filterPropName: QuestionFilterPropNameKeys.empty,
    options: [
      {
        value: '2',
        label: {
          text: '1-2 people',
          image,
        },
      },
      {
        value: '5',
        label: {
          text: '3-5 people',
          image,
        },
      },
      {
        value: '999',
        label: {
          text: '5+ people',
          image,
        },
      },
    ],
  },
];

export default questionsMock;
