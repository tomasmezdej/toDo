const middleware = {}

middleware['customMiddleware'] = require('..\\middleware\\customMiddleware.js')
middleware['customMiddleware'] = middleware['customMiddleware'].default || middleware['customMiddleware']

export default middleware
