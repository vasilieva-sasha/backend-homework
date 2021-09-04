#!/usr/bin/env node
import readline from 'readline'
import fs from 'fs'

const ANSWERS = ['орел', 'орёл', 'решка']

const welcomeQuestion = `Давай сыграем в "Орел или решка" \n\n(набери exit/выход, чтобы покинуть игру)\n\nЗагадал? Набери набери 'орел' или 'решка', чтобы бросить монетку\n\n`

const dropTheCoin = () => Math.round(Math.random())

const fileName = process.argv[2]

const writerStream = fs.createWriteStream(fileName)

writerStream.on('finish', () => {
  console.log(`Лог игры добавлен в ${fileName}`)
})

const writeResults = (result) => {
  if (fileName) {
    let data = `{"${new Date().toISOString()}": ${result}}\n`
    writerStream.write(data, 'UTF8')
  }
}

const checkTheResult = (answer, result) => {
  let guessedSide = null
  answer.toLowerCase() === 'решка' ? (guessedSide = 1) : (guessedSide = 0)

  const resultSide = result === 1 ? 'решка' : 'орел'

  const win =
    guessedSide === result ? 'Поздравляю!' : 'Может повезет в другой раз'

  console.log(`Выпал${result === 1 ? 'а' : ''} ${resultSide}! ${win}`)

  writeResults(guessedSide === result)
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.log(welcomeQuestion)

rl.on('close', () => {
  writerStream.end()
})

rl.on('line', (answer) => {
  if (answer.toLowerCase() === 'exit' || answer.toLowerCase() === 'выход') {
    console.log('Возвращайся еще!')
    rl.close()
  }
  if (ANSWERS.includes(answer)) {
    console.log('Бросаю...')
    const result = dropTheCoin()
    setTimeout(() => checkTheResult(answer, result), 600)
  } else {
    rl.close()
  }
})
