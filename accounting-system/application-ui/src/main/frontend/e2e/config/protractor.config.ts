exports.config = {
     baseUrl: 'http://localhost:9000',
     capabilities: {
          browserName: 'internet explorer',
          ignoreProtectedModeSettings: true,
          ignoreZoomSetting: true,      // make sure to reset browser zoom to 100% anyway
          platform: 'ANY',
          requireWindowFocus: false,    // needs to be false for IE11 on TeamCity
          version: '11'
     },
      directConnect: true, // for now, using selenium webdriver since we also need to support IE 11
     // seleniumAddress: 'http://localhost:4444/wd/hub',
     //seleniumAddress: 'http://192.168.121.138:4444/wd/hub',  // to run against a selenium running on remote desktop on IP-192.168.121.138
     framework: 'custom',
     frameworkPath: require.resolve('protractor-cucumber-framework'),
     onPrepare: () => {
          // TODO: determine why even with import or require statements the browser objects (below) cannot be used
          // browser.waitForAngularEnabled(false);   // workaround for primeng bug 4681, fixed in v5.2.5
          // browser.manage().window().setSize(1280, 800);     // UX team target viewport size

          require('ts-node').register({
               project: './e2e/tsconfig.e2e.json'
          });
     },
     resultJsonOutputFile: './e2e/protractor.report.json', // must be relative to where protractor is run
     params: {
          env: {
               appHost: 'http://localhost:5200/'  // will be overridden via command line
          }
     },
     suites: {
          smoke: '../features/*.feature',
          smokeFileOpen: '../features/require_windows/*.feature' // tests requiring windows OS and robotjs npm
     }
};
