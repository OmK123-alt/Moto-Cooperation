const { ensureSchema } = require('./schema');
const { seedAll } = require('./seed');

let initPromise;

async function initializeDatabase() {
  if (!initPromise) {
    initPromise = (async () => {
      await ensureSchema();
      await seedAll();
    })();
  }
  return initPromise;
}

module.exports = {
  initializeDatabase
};
