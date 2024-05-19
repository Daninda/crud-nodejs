import url from 'url';
import userRouter from './userRouter/index.js';

export default function router(req, res) {
  const path = url.parse(req.url, true).pathname;

  if (path.startsWith('/users')) {
    userRouter(req, res);
  } else {
    res.statusCode = 400;
    res.end();
  }
}
