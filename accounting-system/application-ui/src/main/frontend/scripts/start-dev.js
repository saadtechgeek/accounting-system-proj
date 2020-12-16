const startDev = require('concurrently');
startDev([
    {command: 'npm start', name: 'ng'},
    {command: 'npm run start-mock-server', name: 'mock'},
    {command: 'npm run compile-mock-server', name: 'tsc'},
    {command: 'npm run copy-mock-json-data', name: 'cp'}
], {killOthers: ['failure', 'success']});
