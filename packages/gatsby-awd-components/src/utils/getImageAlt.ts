import capitalize from 'lodash/capitalize';

const getImageAlt = (title: string, slug: string) =>
  title.split(' ').length > 1
    ? title
    : slug
        .split('/')
        .reduce((reducer: string[], fieldWord, index, array) => {
          const matchedWord = fieldWord.replace('-', ' ').match(/[A-z]+/g);
          let word = '';

          if (matchedWord !== null) {
            word = '123';
          }

          reducer.push(index === array.length - 1 ? `- ${word}` : word);

          return reducer;
        }, [])
        .join(' ')
        .trim();

export default getImageAlt;
