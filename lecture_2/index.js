#!/usr/bin/env node
import readline from 'readline'
import {
  welcomeQuestion,
  levels,
  guessFigure,
  giveAClue,
} from './utils/index.js'

const levelsAmount = Object.keys(levels).length

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
  if (answer.toLowerCase() === 'exit') {
    console.log('Возвращайся еще!')
    rl.close()
    process.exit(0)
  }
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
