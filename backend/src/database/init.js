const { ensureSchema } = require('./schema');
const { seedAll } = require('./seed');

let initPromise;

async function initializeDatabase() {
  if (!initPromise) {
    initPromise = (async () => {
      try {
        await ensureSchema();
        await seedAll();
      } catch (error) {
        initPromise = null;
        throw error;
      }
    })();
  }
  return initPromise;
}

module.exports = {
  initializeDatabase
};
