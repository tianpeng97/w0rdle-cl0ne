import wordBank from '../wordle-bank.txt';

// 6x5 matrix
export const boardDefault = Array(6)
  .fill()
  .map(() => Array(5).fill(''));

export const generateWord = async () => {
  let wordsSet;
  let randomWord;

  await fetch(wordBank)
    .then((res) => res.text())
    .then((result) => {
      const wordsArray = result.split('\n');
      randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
      wordsSet = new Set(wordsArray);
    });

  return { wordsSet, randomWord };
};
