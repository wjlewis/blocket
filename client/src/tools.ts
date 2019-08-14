/*
 * This function constructs an Array of the numbers [0..n-1].
 */
export const iota = (n: number) => {
  const res = [];
  for (let i = 0; i < n; i++) res.push(i);
  return res;
};
