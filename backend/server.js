const { app } = require('./app');

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log('');
    console.log('  ✅  MOTO COOPERATION server running');
    console.log(`  🌐  Site  →  http://localhost:${PORT}`);
    console.log(`  🔧  Admin →  http://localhost:${PORT}/admin`);
    console.log('');
  });
}
