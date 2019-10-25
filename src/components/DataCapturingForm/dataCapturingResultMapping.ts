import map from 'lodash/map';
import get from 'lodash/get';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
export function dataCapturingResultMapping(values: any): any {
  return [
    {
      questionAnswersList: map(values, val => {
        const { question, id, value, answer } = val;
        return {
          answers: Array.isArray(value)
            ? value.map((val: string, index: number) => ({
                id: get(answer[index], 'id'),
                answer: true,
              }))
            : [
                {
                  id: get(answer, 'id'),
                  answer: true,
                },
              ],
          question,
          id,
        };
      }),
      surveyId: '1',
    },
  ];
}
