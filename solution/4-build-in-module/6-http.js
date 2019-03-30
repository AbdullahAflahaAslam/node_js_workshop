// TODO: import http module from node
const HTTP = require('http')
const PORT = 8000

const server = HTTP.createServer((request, response) => {
  switch (request.url) {
    // TODO: handle request if client hit '/' route
    case '/':
        response.write('Hello World')
        response.end()
      break
    // TODO: handle request if client hit '/api' route (return a json)
    case '/api/hello':
      response.write(
        JSON.stringify({data: 'Hello World'})
      )
      response.end()
      break
    default:
        response.write('Page Not Found')
        response.end()
      break
  }
})

// TODO: handle if someone hit the end poin with event
server.on('connection',(socket) => {
  console.log('New connection')
})


// TODO: server listen on port 8000
server.listen(PORT)
console.log(`Listening on port ${PORT}`)