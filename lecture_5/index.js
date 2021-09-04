import dotenv from 'dotenv'
import http from 'http'
import readline from 'readline'

dotenv.config()

const access = process.env.ACCESS_KEY

let DEAFAULT = 'Moscow'
let data = ''

const url = `http://api.weatherstack.com/current?access_key=${access}`

const getData = (city) => {
  http.get(url + `&query=${city}`, (res) => {
    res.on('data', (chunk) => (data += chunk))
    res.on('end', () => {
      const apiResponse = JSON.parse(data)
      console.log(
        `Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`
      )
    })
  })
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.log(
  `Good day. Please enter the city name and I will show you the weather. \nYou can press 'enter' to continue with ${DEAFAULT} \n`
)

const ucFirst = (str) => {
  if (!str) return str
  return str[0].toUpperCase() + str.slice(1)
}

rl.on('line', (answer) => {
  answer ? getData(ucFirst(answer)) : getData(DEAFAULT)
  rl.close()
})
