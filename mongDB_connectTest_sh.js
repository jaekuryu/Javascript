const { spawn } = require('child_process');

//const uri = "mongodb+srv://cluster0.r1yhop4.mongodb.net/myFirstDatabase";
const uri = "mongodb+srv://cluster0.r1yhop4.mongodb.net";
const username = "jaeku";
const password = "wjdgus2302";

const mongo = spawn('C:\\mongosh\\bin\\mongosh', [
  uri,
  '--username', username,
  '--password', password,
  '--authenticationDatabase', 'admin',
  '--eval', 'show dbs'
]);

mongo.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

mongo.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

mongo.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});


