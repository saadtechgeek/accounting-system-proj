/*
     This program determines specifically:
     whether a *single instance* of program that runs in a Windows cmd prompt is already running,
     and if not, launches that program.

     One parameter is accepted, which identifies the program being searched for.
     Here is an example of attempt to determine if Selenium webdriver was already started, 
     and if not, start it:
          startCmd "webdriver-manager start"

     note:  a windows executable that can run in TeamCity was created with "pkg" npm:
     startCmd.win.exe.  To update the executable:

     <cd to this directory>
     npm install -g pkg
     pkg startCmd.js
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
          // the WMIC command itself is counted as one, 
          // so we expect a value of 2 if there is a single instance of the program running
          switch (Number(stdout)) {
               case 1:   // only the WMIC command instance itself was found, so start program
                    console.log('program is not running, starting new instance');
                    switch (runParam) {
                         case 'webdriver-manager start':
                              exec('start cmd /k "npm run webdriver-start"', (err, stdout, stderr) => {
                                   if (err || stderr) {
                                        console.log('run error: unable to start new program', 
                                             err, stderr);
                                        return 1;
                                   }
                              });
                              break;
                         default:
                              break;
                         }
                    return 0;
               case 2:   // good result, no action taken
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
