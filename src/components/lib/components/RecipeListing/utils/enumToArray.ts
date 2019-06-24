// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StringIsNumber = (value: any) => !isNaN(Number(value));

// Turn enum into array
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ToArray(enumme: any) {
  return Object.keys(enumme)
    .filter(StringIsNumber)
    .map(key => enumme[key]);
}

export default ToArray;
