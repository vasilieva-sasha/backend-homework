const findBookById = (books, id) => books.find((book) => book.id == Number(id))

const changeBookById = (books, data, id) => {
  books.forEach((book, index) => {
    if (book.id == Number(id)) {
      const changedBook = { ...book, ...data }
      changedBook.authors = data.authors.split(',')
      changedBook.cover = data.cover ? data.cover : book.cover
      books[index] = changedBook
    }
  })
}

const generateNewId = (data) => {
  let lastId = data[data.length - 1].id
  lastId++
  return lastId
}

export { generateNewId, findBookById, changeBookById }
