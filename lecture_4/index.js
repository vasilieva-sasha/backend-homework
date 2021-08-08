#!/usr/bin/env node
import readline from 'readline'
import fs from 'fs'

const ANSWERS = ['орел', 'орёл', 'решка']

const welcomeQuestion = `Давай сыграем в "Орел или решка" \n\n(набери exit, чтобы покинуть игру)\n\nЗагадал? Набери свой вариант, чтобы бросить монетку\n\n`

const dropTheCoin = () => Math.round(Math.random())

const writeResults = (result) => {
  const fileName = process.argv[2]
  if (fileName) {
    let data = `{"${new Date().toISOString()}": ${result}}\n`
    fs.appendFile(fileName, data, 'utf8', (err) => {
      if (err) throw err
      console.log(`Лог игры добавлен в ${fileName}`)
    })
  }
}

const checkTheResult = (answer, result) => {
  let guessedSide = null
  if (answer.toLowerCase() === 'решка') {
    guessedSide = 1
  } else {
    guessedSide = 0
  }

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

rl.question(welcomeQuestion, async (answer) => {
  if (answer.toLowerCase() === 'exit') {
    console.log('Возвращайся еще!')
    rl.close()
    process.exit(0)
  }
  if (ANSWERS.includes(answer)) {
    console.log('Бросаю...')
    const result = dropTheCoin()
    setTimeout(() => checkTheResult(answer, result), 600)

    rl.close()
  } else {
    rl.close()
    process.exit(0)
  }
})
