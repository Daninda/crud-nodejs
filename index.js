import { createServer } from 'http';
import router from './router/index.js';

const HOSTNAME = 'localhost';
const PORT = 3000;

const server = createServer(router);

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server at http://${HOSTNAME}:${PORT}`);
});
