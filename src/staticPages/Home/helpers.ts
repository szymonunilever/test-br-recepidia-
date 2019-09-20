import { getUserProfileByKey } from '../../utils/browserStorage';
import { ProfileKey } from '../../utils/browserStorage/models';
import generateQuery from '../../utils/queryGenerator';
import { RecipePersonalizationFormula } from '../../constants';
import getPersonalizationSearchData, {
  FROM,
  RESULT_SIZE,
} from '../../utils/getPersonalizationSearchData';

export function isQuizesStored() {
  return (
    !!Object.keys(getUserProfileByKey(ProfileKey.initialQuiz)).length ||
    !!Object.keys(getUserProfileByKey(ProfileKey.mealPlannerAnswers)).length
  );
}

export async function searchTopRecipes(
  i = 0,
  resultNumber = RESULT_SIZE,
  defaults: Internal.Recipe[]
): Promise<Internal.Recipe[]> {
  let j = i;
  const maxTry = RecipePersonalizationFormula.template.length;
  const introQuizAnswers = getUserProfileByKey(ProfileKey.initialQuiz);
  const mealPlanerAnswers = getUserProfileByKey(ProfileKey.mealPlannerAnswers);
  let queryString = generateQuery(
    introQuizAnswers,
    mealPlanerAnswers,
    RecipePersonalizationFormula,
    i
  );

  const { hits } = await getPersonalizationSearchData(queryString, {
    from: FROM,
    size: RESULT_SIZE,
    sort: [
      { averageRating: { order: 'desc' } },
      { creationTime: { order: 'desc' } },
    ],
  });

  if (hits.total < resultNumber && i < maxTry - 1) {
    j = i + 1;
    return searchTopRecipes(j, resultNumber, defaults);
  } else if (hits.total < resultNumber && i >= maxTry - 1) {
    return defaults;
  } else {
    return hits.hits.map(hit => hit._source);
  }
}

export async function getTopRecipes(defaults: Internal.Recipe[]) {
  return isQuizesStored()
    ? await searchTopRecipes(0, RESULT_SIZE, defaults)
    : defaults;
}

export async function searchLatestAndGratest(
  i = 0,
  resultNumber = RESULT_SIZE,
  defaults: Internal.Recipe[]
): Promise<Internal.Recipe[]> {
  let j = i;
  const maxTry = RecipePersonalizationFormula.template.length;
  const introQuizAnswers = getUserProfileByKey(ProfileKey.initialQuiz);
  const mealPlanerAnswers = getUserProfileByKey(ProfileKey.mealPlannerAnswers);
  let queryString = generateQuery(
    introQuizAnswers,
    mealPlanerAnswers,
    RecipePersonalizationFormula,
    i
  );

  const { hits } = await getPersonalizationSearchData(queryString, {
    from: FROM,
    size: RESULT_SIZE,
    sort: [
      { averageRating: { order: 'desc' } },
      { creationTime: { order: 'desc' } },
    ],
  });
  if (hits.total < resultNumber && i < maxTry - 1) {
    j = i + 1;
    return searchTopRecipes(j, resultNumber, defaults);
  } else if (hits.total < resultNumber && i >= maxTry - 1) {
    return defaults;
  } else {
    return hits.hits.map(hit => hit._source);
  }
}

export async function getLatestAndGratest(defaults: Internal.Recipe[]) {
  return isQuizesStored()
    ? await searchLatestAndGratest(0, RESULT_SIZE, defaults)
    : defaults;
}
