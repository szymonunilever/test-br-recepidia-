export const sortByOrderIndex = (
  a: { orderIndex: number },
  b: { orderIndex: number }
) => {
  if (a.orderIndex > b.orderIndex) {
    return 1;
  }
  if (a.orderIndex < b.orderIndex) {
    return -1;
  }
  return 0;
};
export default sortByOrderIndex;
