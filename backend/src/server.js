const app = require('./app');
const { port } = require('./config/env');

function startServer() {
  app.listen(port, () => {
    console.log('');
    console.log('  MOTO COOPERATION server running');
    console.log(`  Site  ->  http://localhost:${port}`);
    console.log(`  Admin ->  http://localhost:${port}/admin`);
    console.log('');
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { startServer };
