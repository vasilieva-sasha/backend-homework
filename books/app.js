import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import methodOverride from 'method-override'
import router from './controller.js'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(methodOverride('_method'))

app.use(express.static('public'))

app.use('/api', router)

app.listen(3000)
