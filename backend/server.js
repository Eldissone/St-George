const { app } = require('./src/app');
const { port } = require('./src/config/env');

app.listen(port, () => console.log(`St. George API running at http://localhost:${port}`));
