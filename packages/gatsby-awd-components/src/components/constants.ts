export enum KeyCode {
  Enter = 13,
  Space = 32,
  Tab = 9,
  Delete = 46,
  ArrowDown = 40,
  ArrowLeft = 37,
  ArrowRight = 39,
  ArrowUp = 38,
  Escape = 27,
}

export const IMAGE_SIZES = {
  QUIZ_OPTIONS: {
    QUIZ_SMALL: '(max-width: 768px) 50vw, (max-width: 1366px) 30vw, 400px',
    QUIZ_BIG: '(max-width: 1366px) 50vw, 800px',
  },
  RECIPE_LISTINGS: {
    STANDARD: '(max-width: 768px) 50vw, (max-width: 1366px) 30vw, 400px',
    NON_STANDARD: '(max-width: 768px) 100vw, (max-width: 1366px) 50vw, 500px',
    MEAL_PLANNER: '(max-width: 768px) 50vw, (max-width: 1366px) 30vw, 400px',
  },
  PAGE_LISTINGS: {
    CAROUSEL: '(max-width: 768px) 30vw, (max-width: 1366px) 25vw, 300px',
    TILES: '(max-width: 1366px) 50vw, 350px',
  },
};

