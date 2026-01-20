const fs = require('fs');

const lines = fs.readFileSync('wordDB.db', 'utf-8').split('\n').filter(Boolean);
const docs = lines.map(line => JSON.parse(line));

fs.writeFileSync('wordDB.json', JSON.stringify(docs, null, 2));
console.log('Exported wordDB.json!');