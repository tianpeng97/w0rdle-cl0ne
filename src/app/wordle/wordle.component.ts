import { LetterState } from './../letterstate';
import { Component, HostListener, OnInit } from '@angular/core';
import { Try } from '../try';
import { Letter } from '../letter';
import { WORD_BANK } from '../word-bank';

const NUMBER_OF_TRIES: number = 6;
const WORD_LENGTH: number = 5;
const LETTERS = (() => {
  const letters: { [key: string]: boolean } = {};
  for (let charCode = 97; charCode < 97 + 26; charCode++) {
    letters[String.fromCharCode(charCode)] = true;
  }
  return letters;
})();

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.scss'],
})
export class WordleComponent implements OnInit {
  // accessible in template
  readonly tries: Try[] = [];
  // enum to template
  readonly LetterState = LetterState;
  readonly keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
  ];
  readonly letterStates: { [key: string]: LetterState } = {};

  private caseIndex = 0;
  private numTries = 0;
  private targetWord?: string;
  private targetWordLetterCounts: { [letter: string]: number } = {};
  private lost = false;
  private won = false;

  constructor() {}

  ngOnInit(): void {
    for (let i = 0; i < NUMBER_OF_TRIES; i++) {
      const letters: Letter[] = [];
      for (let j = 0; j < WORD_LENGTH; j++) {
        letters.push({ text: '', state: LetterState.PENDING });
      }
      this.tries.push({ letters });
    }

    this.targetWord = WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
    console.log(this.targetWord);

    for (let letter of this.targetWord) {
      const count = this.targetWordLetterCounts[letter];
      if (!count) {
        this.targetWordLetterCounts[letter] = 0;
      }
      this.targetWordLetterCounts[letter]++;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyBoardEvent(event: KeyboardEvent) {
    this.handleClickKey(event.key);
  }

  isLetter(letter: string): boolean {
    if (LETTERS[letter.toLowerCase()]) {
      return true;
    } else {
      return false;
    }
  }

  getKeyClass(key: string): string {
    const state = this.letterStates[key.toLowerCase()];
    switch (state) {
      case LetterState.FULL_MATCH:
        return 'match key';
      case LetterState.PARTIAL_MATCH:
        return 'partial key';
      case LetterState.WRONG:
        return 'wrong key';
      default:
        return 'key';
    }
  }

  handleClickKey(letter: string) {
    if (!this.won && !this.lost) {
      if (this.isLetter(letter)) {
        this.setLetter(letter);
        this.caseIndex++;
      } else if (letter === 'Backspace') {
        this.deleteLetter();
      } else if (letter === 'Enter') {
        this.checkCurrentTry();
        console.log(this.letterStates);
      }
    }
  }

  private setLetter(letter: string) {
    // cant go past last line or current line
    if (
      (this.numTries >= NUMBER_OF_TRIES &&
        this.caseIndex === this.numTries * WORD_LENGTH) ||
      this.caseIndex === (this.numTries + 1) * WORD_LENGTH
    ) {
      this.caseIndex--;
    } else {
      const tryIndex = Math.floor(this.caseIndex / WORD_LENGTH);
      const letterIndex = this.caseIndex - tryIndex * WORD_LENGTH;
      this.tries[tryIndex].letters[letterIndex].text = letter;
    }
  }

  private deleteLetter() {
    if (this.caseIndex === 0) {
    } else {
      this.caseIndex--;
      this.setLetter('');
    }
  }

  private checkCurrentTry() {
    if (this.numTries < NUMBER_OF_TRIES) {
      const targetWordLetterCounts = { ...this.targetWordLetterCounts };
      const currentWord = this.tries[this.numTries];
      if (currentWord.letters.some((letter) => letter.text === '')) {
        console.log('not enough letters');
        return;
      }

      const word = currentWord.letters
        .map((letter) => letter.text)
        .join('')
        .toLowerCase();

      if (WORD_BANK.includes(word) && this.targetWord) {
        const states: LetterState[] = [];
        for (let i = 0; i < WORD_LENGTH; i++) {
          const expected = this.targetWord[i];
          const current = word[i];
          let state = LetterState.WRONG;

          if (expected === current && targetWordLetterCounts[current] > 0) {
            targetWordLetterCounts[current]--;
            state = LetterState.FULL_MATCH;
          } else if (
            this.targetWord.includes(current) &&
            targetWordLetterCounts[current] > 0
          ) {
            targetWordLetterCounts[current]--;
            state = LetterState.PARTIAL_MATCH;
          }

          // keyboard color
          if (
            !this.letterStates[current] ||
            state > this.letterStates[current]
          ) {
            this.letterStates[current] = state;
          }

          states.push(state);
          this.tries[this.numTries].letters[i].state = state;
        }
        this.numTries++;

        if (states.every((state) => state === LetterState.FULL_MATCH)) {
          this.won = true;
        } else if (this.numTries === NUMBER_OF_TRIES) {
          this.lost = true;
        }
      } else {
        console.log('invalid word');
      }
    }
  }
}
