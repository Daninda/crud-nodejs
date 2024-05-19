import { parse } from 'url';
import data from '../../data.js';

export default function create(req, res) {
  let body = '';

  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async () => {
    const parsedBody = JSON.parse(body);

    const createdId = await data.create(parsedBody);

    res.setHeader('Content-type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(createdId));
  });
}
