// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const path = require('path');
const configUtils = require('data-analytics-ui').ConfigUtils;
const E2E_OUTPUT_DIR = 'e2e/output';
const E2E_OUTPUT_JSON = `${E2E_OUTPUT_DIR}/e2e-output.json`;

const OPEN_CUCUMBER_REPORT = process.env.npm_config_open_cucumber_report === 'true';
const OPEN_COVERAGE_REPORT = process.env.npm_config_open_coverage_report === 'true';

exports.config = {
    allScriptsTimeout: 11000,
    specs: configUtils.getSpecArray(
        path.join(__dirname + '/src/feature.list'),
        path.join(__dirname + '/src/')
    ),

    capabilities: {
        'browserName': 'chrome',
        chromeOptions: {
            args: ['--window-size=1600,768']
        }
    },
    directConnect: true,
    baseUrl: 'http://localhost:4201/',

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    cucumberOpts: {
        require: ['./src/step-definitions/**/*.steps.ts'],
        tags: '~@ignore',
        format: ['node_modules/cucumber-pretty', `node_modules/cucumber-pretty:${E2E_OUTPUT_DIR}/e2e-output.txt`, `json:${E2E_OUTPUT_JSON}`],
        profile: false,
        'no-source': true
    },
    params: {
        env: {
             appHost: 'http://localhost:5200/'  // will be overridden via command line
        }
    },
    plugins: [
        {
            package: 'protractor-console-plugin',
            failOnWarning: false,
            failOnError: false,
            logWarnings: true
        }
    ],

    onPrepare: () => {
        configUtils.removeDir(E2E_OUTPUT_DIR);
        configUtils.createDir(E2E_OUTPUT_DIR);
        require('ts-node').register({
            project: path.join(__dirname, './tsconfig.e2e.json')
        });
    },

    onComplete: () => {
        return Promise.all([
            configUtils.htmlReport(E2E_OUTPUT_JSON, E2E_OUTPUT_DIR, 'Evolv Data Analytics', OPEN_CUCUMBER_REPORT),
            configUtils.saveCoverage(E2E_OUTPUT_DIR, browser.executeScript)
        ]).catch((reason) => {
            console.log('Error:', reason);
        });
    },

    afterLaunch: (exitCode) => {
        return Promise.all([
            configUtils.coverageReport(E2E_OUTPUT_DIR, {
                'ng://data-analytics-ui': 'projects/data-analytics-ui/src'
            }, OPEN_COVERAGE_REPORT)
        ]).catch((reason) => {
            console.log('Error:', reason);
        });
    }
};

