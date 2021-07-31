#!/usr/bin/env node
const readline = require('readline')
const welcomeQuestion = `Давай сыграем в "Угадай число" \n\nВыбери уровень: \n`
const levels = {
  1: {
    name: 'Easy',
    max: 10,
  },
  2: {
    name: 'Normal',
    max: 100,
  },
  3: {
    name: 'Hard',
    max: 1000,
  },
}

const levelsAmount = Object.keys(levels).length

const guessFigure = async (max) => await Math.floor(Math.random() * max)

const giveAClue = (inputFigure, guessedFigure) =>
  inputFigure < guessedFigure
    ? 'Нет, загаданное больше'
    : 'Нет, загаданное меньше'

const variants = []
for (let variant in levels) {
  variants.push(levels[variant].name)
}
const formatedVariants = variants
  .map((variant, index) => `${index + 1} ${variant}`)
  .join('\n')

const wholeMessage = welcomeQuestion + '\n' + formatedVariants + '\n\n'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question(wholeMessage, async (answer) => {
  if (Number(answer) > levelsAmount) {
    rl.close()
    process.exit(0)
  } else {
    const guessedFigure = await guessFigure(levels[answer].max)
    console.log(`Хорошо. Я загадал число от 0 до ${levels[answer].max}`)
    rl.on('line', (input) => {
      const inputNumber = Number(input)
      if (input.toLowerCase() === 'exit') {
        console.log('Ты сдался!')
        rl.close()
      } else if (inputNumber != guessedFigure) {
        console.log(giveAClue(inputNumber, guessedFigure))
      } else {
        console.log('Ты угадал!')
        rl.close()
      }
    })
  }
})
