import express from 'express'
import mocks from './mock.js'
import errorHandler from './errorHandler.js'
import router from './router.js'

const app = express()

// const getBookById = (books, id) => books.find((book) => book.id == Number(id))

// const changeBookById = (books, data, id) => {
//   books.forEach((book, index) => {
//     if (book.id == Number(id)) {
//       const changedBook = { ...book, ...data }
//       books[index] = changedBook
//     }
//   })
// }

// const generateNewId = (data) => {
//   let lastId = data[data.length - 1].id
//   lastId++
//   return lastId
// }

// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())

// app.post('/api/user/login', (req, res) => {
//   return res.status(201).json('{ id: 1, mail: test@mail.ru }')
// })

// app.get('/api/books', (req, res) => {
//   return res.json(mocks)
// })

// app.get('/api/books/:id', (req, res) => {
//   const { id } = req.params
//   const bookById = getBookById(mocks, id)
//   if (!bookById) {
//     errorHandler(res, '404')
//   }

//   return res.json(bookById)
// })

// app.post('/api/books/', (req, res) => {
//   console.log(req.body)
//   const newBook = req.body
//   const newId = generateNewId(mocks)
//   newBook.id = newId
//   mocks.push(newBook)

//   return res.json(newBook)
// })

// app.put('/api/books/:id', (req, res) => {
//   const { id } = req.params
//   const newBookData = req.body
//   changeBookById(mocks, newBookData, id)
//   const bookById = getBookById(mocks, id)
//   if (!bookById) {
//     return errorHandler(res, '404')
//   }

//   return res.json(bookById)
// })

// app.delete('/api/books/:id', (req, res) => {
//   const { id } = req.params
//   const bookById = getBookById(mocks, id)
//   if (!bookById) {
//     return errorHandler(res, '404')
//   }
//   const bookIndex = mocks.findIndex((book) => book.id == Number(id))
//   mocks.splice(bookIndex, 1)

//   return res.send('ok')
// })

app.use('/api', router)

app.listen(3000)
