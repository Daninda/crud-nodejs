import url from 'url';
import data from '../../data.js';

export default async function update(req, res) {
  const path = url.parse(req.url, true).pathname;
  const id = +path.split('/')[2];
  let body = '';

  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async () => {
    const parsedBody = JSON.parse(body);

    const user = await data.update({ id, ...parsedBody });

    if (user === null) {
      res.statusCode = 400;
      res.end();
      return;
    }

    res.setHeader('Content-type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(user));
  });
}
