import url from 'url';
import data from '../../data.js';

export default async function remove(req, res) {
  const path = url.parse(req.url, true).pathname;
  const id = +path.split('/')[2];

  const isRemoved = await data.remove(id);

  if (isRemoved === null) {
    res.statusCode = 400;
    res.end();
    return;
  }

  res.setHeader('Content-type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify(isRemoved));
}
