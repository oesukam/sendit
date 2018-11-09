"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _helmet = _interopRequireDefault(require("helmet"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _morgan = _interopRequireDefault(require("morgan"));

var _data = _interopRequireDefault(require("./data"));

var _routes = _interopRequireDefault(require("./routes"));

var _joiErrors = _interopRequireDefault(require("./middleware/joiErrors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _data.default)(); // Initialise global data arrays

_dotenv.default.config(); // Sets environment's varibles


const urlPrefixV1 = '/api/v1'; // Url prefix to map all urls

const app = (0, _express.default)();
const {
  PORT = 3000,
  NODE_ENV
} = process.env; // Check for working environment to start logging http request

if (NODE_ENV === 'development') {
  app.use((0, _morgan.default)('tiny'));
  console.info('Morgan enabled');
}

app.use((0, _helmet.default)()); // Sets various http headers

/* Apply the body-parser middleware to grab data
  from the request body and create application/json parser
*/

app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json());
app.use(`${urlPrefixV1}/users`, _routes.default.users);
app.use(`${urlPrefixV1}/parcels`, _routes.default.parcels); // Apply Celebrate middleware to handle joi errors

app.use((0, _joiErrors.default)());
app.get('/api/v1/*', (req, res) => {
  res.send('<h1>SendIT - API</h1>');
});
app.get('/*', (req, res) => {
  res.send('<h1>SendIT - API</h1>');
}); // catch 404 and forward to error handler

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.listen(PORT, () => {
  console.info(`Server listenning on port: ${PORT}...`);
});
var _default = app;
exports.default = _default;