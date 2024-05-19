import data from '../../data.js';

export default async function getAll(req, res) {
  const users = await data.getAll();

  if (users === null) {
    res.statusCode = 400;
    res.end();
    return;
  }

  res.setHeader('Content-type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify(users));
}
