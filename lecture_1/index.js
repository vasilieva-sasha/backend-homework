#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const today = new Date()

const formatYear = (date) => date.getFullYear()

const formatMonth = (date) => date.getMonth() + 1

const formatDay = (date) => date.getDate()

const argv = yargs(hideBin(process.argv))
  .alias('y', 'year')
  .alias('m', 'month')
  .alias('d', 'day')
  .command({
    command: 'add',
    describe: 'increase the date',
    handler(arguments) {
      const {day, year, month} = arguments;
      if(day) {
        today.setDate((today.getDate() + day))
        console.log(
          today.toISOString()
        )
      }
      if(month) {
        today.setMonth((today.getMonth() + month))
        console.log(
          today.toISOString()
        )
      }
      if(year) {
        today.setYear((today.getFullYear() + year))
        console.log(
          today.toISOString()
        )
      }
    },
  })
  .command({
    command: 'sub',
    describe: 'decrease the date',
    handler(arguments) {
      const {day, year, month} = arguments;
      if(day) {
        today.setDate((today.getDate() - day))
        console.log(
          today.toISOString()
        )
      }
      if(month) {
        today.setMonth((today.getMonth() - month))
        console.log(
          today.toISOString()
        )
      }
      if(year) {
        today.setYear((today.getFullYear() - year))
        console.log(
          today.toISOString()
        )
      }
    },
  }).argv


if (!argv._.length) {
  if (argv.year) console.log(formatYear(today))
  if (argv.month) console.log(formatMonth(today))
  if (argv.day) console.log(formatDay(today))
}


