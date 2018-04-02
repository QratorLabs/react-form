const fs = require('fs');
const path = require('path');

let f = fs.readFileSync(path.join(path.dirname(__dirname), 'package.json'));
let version = JSON.parse(f).version;

process.stdout.write(version);
