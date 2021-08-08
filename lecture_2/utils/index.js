const welcomeQuestion = `Давай сыграем в "Угадай число" \n\n(набери exit, чтобы покинуть игру)\n\nВыбери уровень: \n`

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

const guessFigure = async (max) => await Math.floor(Math.random() * max)

const giveAClue = (inputFigure, guessedFigure) =>
  inputFigure < guessedFigure
    ? 'Нет, загаданное больше'
    : 'Нет, загаданное меньше'

export { welcomeQuestion, levels, guessFigure, giveAClue }
