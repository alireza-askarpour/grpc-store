export const generateRandomNumber = () => {
  const minm = 100000, maxm = 999999
  return Math.floor(Math.random() * (maxm - minm + 1)) + minm
}
