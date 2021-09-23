import express from 'express'
import mocks from './mock.js'
import errorHandler from './errorHandler.js'
import { generateNewId, changeBookById, findBookById } from './utils.js'

const router = express.Router()

router.use(express.urlencoded({ extended: true }))
router.use(express.json())

const getBooks = (req, res) => res.json(mocks)

const postBooks = (req, res) => {
  console.log(req.body)
  const newBook = req.body
  const newId = generateNewId(mocks)
  newBook.id = newId
  mocks.push(newBook)

  return res.json(newBook)
}

const getBookById = (req, res) => {
  const { id } = req.params
  const bookById = findBookById(mocks, id)
  if (!bookById) {
    errorHandler(res, '404')
  }

  return res.json(bookById)
}

const putBookById = (req, res) => {
  const { id } = req.params
  const newBookData = req.body
  changeBookById(mocks, newBookData, id)
  const bookById = findBookById(mocks, id)
  if (!bookById) {
    return errorHandler(res, '404')
  }

  return res.json(bookById)
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

router.route('/books').get(getBooks).post(postBooks)
router
  .route('/books/:id')
  .get(getBookById)
  .put(putBookById)
  .delete(deleteBookById)

router.post('/user/login', (req, res) => {
  return res.status(201).json('{ id: 1, mail: test@mail.ru }')
})

export default router
