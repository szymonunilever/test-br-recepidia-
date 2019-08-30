import { getUserProfileByKey } from '../../utils/browserStorage';
import { ProfileKey } from '../../utils/browserStorage/models';
import generateQuery from '../../utils/queryGenerator';
import { RecipePersonalizationFormula } from '../../constants';
import getPersonalizationSearchData, {
  FROM,
  RESULT_SIZE,
} from '../../utils/getPersonalizationSearchData';
export function getPersonalizedRecipes(i = 0): Promise<any>[] {
  const introQuizAnswers = getUserProfileByKey(ProfileKey.initialQuiz);
  const mealPlanerAnswers = getUserProfileByKey(ProfileKey.mealPlannerAnswers);
  let queryString = generateQuery(
    introQuizAnswers,
    mealPlanerAnswers,
    RecipePersonalizationFormula,
    i
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const promises: Promise<any>[] = [];
  if (queryString) {
    //TODO: When we will have rating we need to change query sorting params.
    promises.push(
      getPersonalizationSearchData(queryString, {
        from: FROM,
        size: RESULT_SIZE,
        sort: [{ creationTime: { order: 'desc' } }],
      })
    );

    //TODO: When we will have rating we need to change query sorting params.
    promises.push(
      getPersonalizationSearchData(queryString, {
        from: FROM,
        size: RESULT_SIZE,
        sort: [],
      })
    );
    return promises;
  }
  return [new Promise<any>((resolve, reject) => reject(''))];
}

export function isQuizesStored() {
  return (
    !!Object.keys(getUserProfileByKey(ProfileKey.initialQuiz)).length ||
    !!Object.keys(getUserProfileByKey(ProfileKey.mealPlannerAnswers)).length
  );
}

export async function searchTopRecipes(
  i = 0,
  resultNumber = RESULT_SIZE
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
    sort: [],
  });

  if (hits.total < resultNumber && j < maxTry) {
    j = i + 1;
    return searchTopRecipes(j, resultNumber);
  } else {
    return hits.hits.map(hit => hit._source);
  }
}

export async function getTopRecipes(defaults: Internal.Recipe[]) {
  return isQuizesStored() ? await searchTopRecipes(0) : defaults;
}

export async function searchLatestAndGratest(
  i = 0,
  resultNumber = RESULT_SIZE
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
    sort: [{ creationTime: { order: 'desc' } }],
  });

  if (hits.total < resultNumber && j < maxTry) {
    j = i + 1;
    return searchTopRecipes(j, resultNumber);
  } else {
    return hits.hits.map(hit => hit._source);
  }
}

export async function getLatestAndGratest(defaults: Internal.Recipe[]) {
  return isQuizesStored() ? await searchLatestAndGratest(0) : defaults;
}
