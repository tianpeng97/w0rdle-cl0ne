import wordBank from '../wordle-bank.txt';

export const generateWord = async () => {
  let wordsSet;
  let randomWord;

  await fetch(wordBank)
    .then((res) => res.text())
    .then((res) => {
      const wordsArray = res.split('\n');
      randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
      wordsSet = new Set(wordsArray);
    });

  return { wordsSet, randomWord };
};
