import url from 'url';
import data from '../../data.js';

export default async function get(req, res) {
  const path = url.parse(req.url, true).pathname;
  const id = +path.split('/')[2];

  const user = await data.get(id);

  if (user === null) {
    res.statusCode = 400;
    res.end();
    return;
  }

  res.setHeader('Content-type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify(user));
}
