import url from 'url';
import get from './get.js';
import getAll from './getAll.js';
import create from './create.js';
import remove from './remove.js';
import update from './update.js';

export default function userRouter(req, res) {
  const path = url.parse(req.url, true).pathname;
  const method = req.method;

  if (!path.endsWith('users/') && !path.endsWith('users') && method === 'GET') {
    get(req, res);
  } else if (method === 'GET') {
    getAll(req, res);
  } else if (method === 'POST') {
    create(req, res);
  } else if (method === 'DELETE') {
    remove(req, res);
  } else if (method === 'PUT') {
    update(req, res);
  }
}
