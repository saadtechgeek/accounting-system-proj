import * as path from 'path';
import * as fs from 'fs';

const mkdirp = require('mkdirp');

export class ConfigUtils {
    static createDir(dir: any) {
        mkdirp.sync(dir, (err: any) => {
            if (err) {
                console.error(`Cannot create directory ${dir}:`, err);
            }
        });
    }

    static removeDir(dir: string) {
        if (fs.existsSync(dir)) {
            fs.readdirSync(dir).forEach((entry: string) => {
                const entryPath = path.join(dir, entry);
                if (fs.lstatSync(entryPath).isDirectory()) {
                    ConfigUtils.removeDir(entryPath);
                } else {
                    fs.unlinkSync(entryPath);
                }
            });
            fs.rmdirSync(dir);
        }
    }

    static createHtmlReport(options: any) {
        const report = require('cucumber-html-report');
        return report.create(options)
            .then((log: any) => {
                console.warn(log);
            })
            .catch((error: any) => {
                console.warn(error);
            });
    }

    static getSpecArray(defaultListFile: string, addPrefix: string) {
        const listFile = process.env.features_list ? (__dirname + process.env.features_list) : defaultListFile;
        return ConfigUtils.readProps(listFile, addPrefix);
    }

    private static readProps(file: any, addPrefix: string) {
        let array = fs.readFileSync(file).toString().split('\n');
        array = array.filter((v, i) => {
            v = v.trim();
            if (!v.length || v.startsWith('#')) {
                return false;
            }
            return true;
        }).map((v) => {
            v = v.trim();
            if (addPrefix) {
                v = path.join(addPrefix, v);
            }
            return v;
        });
        return array;
    }

    static htmlReport(sourceJson: string, outputDir: string, title: string, openReport: boolean) {
        return ConfigUtils.createHtmlReport({
            source: sourceJson,
            dest: `${outputDir}/report`,
            title
        }).then(() => {
            if (openReport) {
                return require('opn')(`${outputDir}/report/index.html`);
            }
        });
    }

    static saveCoverage(outputDir: string, execScriptFn: (script: string) => any) {
        console.warn('Retrieving coverage from browser');
        return execScriptFn('return JSON.stringify(window.__coverage__);')
            .then((coverage: string) => {
                if (coverage == null) {
                    return Promise.reject('It looks like the sources were not instrumented');
                }
                console.warn(`Script executed - coverage info length is ${coverage.length}`);
                require('fs').writeFile(`${outputDir}/e2e-coverage.json`, coverage, (err: any) => {
                    if (err) {
                        return console.warn(err);
                    }
                    console.warn(`Coverage file extracted from server and saved to ${outputDir}/e2e-coverage.json`);
                });
                return true;
            });
    }

    static coverageReport(outputDir: string, sourceMapping: { [key: string]: string } = {}, openReport = false) {
        const coverageJson = `${outputDir}/e2e-coverage.json`;
        if (!fs.existsSync(coverageJson)) {
            return Promise.reject(`${outputDir}/e2e-coverage.json not found`);
        }
        const loadCoverage = require('remap-istanbul/lib/loadCoverage');
        const remap = require('remap-istanbul/lib/remap');
        const writeReport = require('remap-istanbul/lib/writeReport');
        const coverage = loadCoverage(`${outputDir}/e2e-coverage.json`);
        const collector = remap(coverage, {
            exclude: 'node_modules',
            mapFileName: (f: string) => {
                for (const key in sourceMapping) {
                    if (sourceMapping.hasOwnProperty(key)) {
                        if (f.startsWith(key)) {
                            return f.replace(key, sourceMapping[key]);
                        }
                    }
                }
                return f;
            }
        });
        const summaryFile = `${outputDir}/e2e-coverage-summary`;
        writeReport(collector, 'text', {}, summaryFile).then(() => {
            console.warn(fs.readFileSync(summaryFile).toString());
        });
        const reportDir = 'coverage-report';
        return writeReport(collector, 'html', {}, `${outputDir}/${reportDir}`)
            .then(() => {
                console.warn(`Coverage Report created in ${outputDir}/${reportDir}`);
                if (openReport) {
                    return require('opn')(`${outputDir}/${reportDir}/index.html`);
                }
            }).catch((error: any) => {
                console.warn(error);
            });
    }
}
