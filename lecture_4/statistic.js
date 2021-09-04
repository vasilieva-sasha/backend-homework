import fs from 'fs'

const fileName = process.argv[2]

const endings = (number) => {
  const yi = [2, 3, 4]
  if (number > 4 && number < 21) {
    return ''
  } else if (number === 1 || number % 10 === 1) {
    return 'а'
  } else if (yi.includes(number) || yi.includes(number % 10)) {
    return 'ы'
  } else {
    return ''
  }
}

const showResults = (data) => {
  const dataArr = data
    .split('\n')
    .slice(0, -1)
    .map((item) => JSON.parse(item))

  const positiveGames = dataArr.filter(
    (game) => Object.values(game)[0] === true
  )
  const negativeGames = dataArr.filter(
    (game) => Object.values(game)[0] === false
  )

  const percents = Math.round((positiveGames.length / dataArr.length) * 100)

  const allGamesMessage = `Всего было сыграно: ${dataArr.length} игр${endings(
    dataArr.length
  )}.`

  const positiveMessage = `${positiveGames.length} игр${endings(
    positiveGames.length
  )} с успешным результатом`

  const negativeMessage = `${negativeGames.length} игр${endings(
    negativeGames.length
  )} неудачных.`

  const percentsMessage = `${percents}% выигранных партий,`

  const lastSentence =
    percents > 50 ? 'что довольно неплохо' : 'что довольно печально'
  console.log(
    allGamesMessage,
    'Из них:',
    positiveMessage,
    'и',
    negativeMessage,
    '\n',
    percentsMessage,
    lastSentence
  )
}

const readerStream = fs.createReadStream(fileName)
readerStream.setEncoding('UTF8')
let data = ''
readerStream.on('data', (chunk) => {
  data += chunk
})
readerStream.on('end', () => {
  showResults(data)
})
