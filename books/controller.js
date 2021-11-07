import express from 'express'
import mocks from './mock.js'
import errorHandler from './errorHandler.js'
import { generateNewId, changeBookById, findBookById } from './utils.js'
import uploadFiles from './multer.js'

const router = express.Router()

router.use(express.urlencoded({ extended: true }))
router.use(express.json())

const getBooks = (req, res) => {
  res.render('books/index', {
    title: 'Все книги',
    books: mocks,
  })
}

const postBooks = (req, res) => {
  const newBook = req.body
  const fileData = req.file
  newBook.authors = req.body.authors.split(',')
  const newId = generateNewId(mocks)
  newBook.id = newId
  newBook.cover = '/uploads/' + fileData?.filename
  mocks.push(newBook)

  return res.render('view/index', {
    book: newBook,
  })
}

const getBookById = (req, res) => {
  const { id } = req.params
  const bookById = findBookById(mocks, id)
  if (!bookById) {
    errorHandler(res, '404')
  }

  return res.render('view/index', {
    book: bookById,
  })
}

const putBookById = (req, res) => {
  const { id } = req.params
  const newBookData = req.body
  const fileData = req.file
  changeBookById(mocks, newBookData, id)
  const bookById = findBookById(mocks, id)
  if (!bookById) {
    return errorHandler(res, '404')
  }

  bookById.cover = '/uploads/' + fileData?.filename

  return res.render('view/index', {
    book: bookById,
  })
}

const deleteBookById = (req, res) => {
  const { id } = req.params
  const bookById = findBookById(mocks, id)
  if (!bookById) {
    return errorHandler(res, '404')
  }
  const bookIndex = mocks.findIndex((book) => book.id == Number(id))
  mocks.splice(bookIndex, 1)

  return res.send('ok')
}

router.get('/', (req, res) => {
  res.render('main/index', {
    title: 'Главная',
  })
})

router.get('/create', (req, res) => {
  res.render('create/index', {
    title: 'Создать книгу',
  })
})

router.get('/update/:id', (req, res) => {
  const { id } = req.params
  const bookById = findBookById(mocks, id)
  if (!bookById) {
    errorHandler(res, '404')
  }
  res.render('update/index', {
    title: 'Редактировать книгу',
    book: bookById,
  })
})

router
  .route('/books')
  .get(getBooks)
  .post(uploadFiles.single('cover'), postBooks)

router
  .route('/books/:id')
  .get(getBookById)
  .put(uploadFiles.single('cover'), putBookById)
  .delete(deleteBookById)

router.post('/user/login', (req, res) => {
  return res.status(201).json('{ id: 1, mail: test@mail.ru }')
})

export default router
