const ERROR_MESSAGE = {
  404: '404 | not found',
}

function errorHandler(res, code) {
  res.status(code)
  const content = ERROR_MESSAGE[code]
  res.send(content)
}

export default errorHandler
