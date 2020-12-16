/*
     * This is a version of startCmd.js modified to run via "npm run".
     * It is intended to be run in a teamcity build step
     * 
     * It will give INCORRECT results if run from the command line
     * and must be run as an entry in package.json

     This program determines specifically:
     whether a *single instance* of program that runs in a Windows cmd prompt is already running,
     and if not, launches that program.

     * package.json will have an entry such as:
     * "webdriver-start-teamcity": "node ./e2e/config/helpers/startCmd/startCmd-teamcity.js 
     *    \"webdriver-manager start\"",
     
     Why this version exists:  the number of running processes returned by WMIC is increased by one
     when the program is run from "npm run"
*/
const {exec} = require('child_process');

// input validation: require and accept one parameter only
if (process.argv.length > 3 || process.argv.length < 3) {
     console.log('input error:  please input the program to search as a single quoted parameter');
     return 1;
}

const runParam = process.argv[2];       
const runCmd = 
     'WMIC path win32_process where "caption=\'cmd.exe\'" get Commandline |find /I /N /C "'
     + runParam + '"';

// check for a running instance
exec(runCmd, (err, stdout, stderr) => {
     if (err || stderr) {
          console.log('run error: node was unable to run the command: ', err, stderr)
          return 0;
     }
     if (stdout) {
          // npm run will count as one,
          // the WMIC command itself is counted as one, 
          // so we expect a value of 3 if there is a single instance of the program running
          switch (Number(stdout)) {
               case 2:   // only the npm and WMIC command instances were found, so start program
                    console.log('program is not running, starting new instance');
                    switch (runParam) {
                         case 'webdriver-manager start':
                              // TODO: 
                              // a) remove debug wrapper for spawn
                              // b) determine why ctrl-c is ignored in spawned command prompt
                              var childProcess = require("child_process");
                              var oldSpawn = childProcess.spawn;
                              function mySpawn() {
                                   console.log('spawn called');
                                   console.log(arguments);
                                   var result = oldSpawn.apply(this, arguments);
                                   return result;
                              }
                              childProcess.spawn = mySpawn;
                              const myProcess = mySpawn('start cmd /k "npm run webdriver-start"', ['/k'], {
                                   shell: true,
                                   detached: true,
                                   stdio: 'ignore'});
                              myProcess.unref();
                         default:
                              break;
                         }
                    return 0;
               case 3:   // good result, no action taken
                    console.log('program appears to already be running');
                    return 0;
               default:
                    console.log('error: unexpected number of processes return by WMIC: ', stdout);
                    return 1;
          }
     } else if (!stdout) {
          console.log('run error: no stdout from WMIC');
          return 1;
     }
});
