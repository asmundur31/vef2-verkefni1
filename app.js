import express from 'express';
import { router } from './src/lib/videos.js';
import { formatAge, formatTime } from './src/lib/help.js';

const app = express();

app.locals.formatAge = (str) => formatAge(str);
app.locals.formatTime = (str) => formatTime(str);

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use('/', router);

function notFoundHandler(req, res, next) {
  res.status(404);
  return res.render('error', {
    title: '404 - Error',
    headerTitle: '404 - Page not found',
  });
}

function errorHandler(err, req, res, next) {
  console.error(err);
  return res.status(500).send('500 villa!');
}

app.use(notFoundHandler);
app.use(errorHandler);

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
