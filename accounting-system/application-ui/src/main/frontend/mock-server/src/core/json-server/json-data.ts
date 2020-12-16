import * as fs from 'fs';
import * as _ from 'lodash';
import {getFilePath, iterateMutable} from '../utils';
import {IJsonDataConfig} from './json-server';

type Macro = 'index' | 'level' | 'id' | 'counter' | 'currency' | 'date' | 'now' | 'int' | 'pct';

export class JsonData {
    private data: any;

    constructor(readonly config: IJsonDataConfig, readonly jsonDataFile: string, readonly reqParams: { [param: string]: string }) {
    }

    private readJsonFile() {
        const json = fs.readFileSync(getFilePath((this.config.root || '') + this.jsonDataFile), 'utf8');
        this.data = JSON.parse(json);
        this.processJsonData();
    }

    private processJsonData() {
        const parents: any[] = [];
        let currentIndex = 0;
        let counter = 0;
        let currentLevel = 1;
        const macro: { [key in Macro]: { value: () => any; isNum?: boolean } } = {
            index: {
                value: () => currentIndex,
                isNum: true
            },
            level: {
                value: () => currentLevel,
                isNum: true
            },
            counter: {
                value: () => counter,
                isNum: true
            },
            id: {
                value: () => Math.random().toString(36).slice(2)
            },
            currency: {
                value: () => Math.round(_.random(10000, 100000, true) * 100) / 100,
                isNum: true
            },
            date: {
                value: () => (new Date(Math.round(
                    Math.random() + 1) + 2014,
                    Math.max(Math.round(Math.random() * 12), 1),
                    Math.max(Math.round(Math.random() * 28), 1)))
                    .toISOString()
            },
            now: {
                value: () => (new Date()).toISOString()
            },
            int: {
                value: () => _.random(1000, 3000),
                isNum: true
            },
            pct: {
                value: () => Math.round(_.random(0, 1, true) * 100) / 100,
                isNum: true
            }

        };

        const traverse = (obj: any) => {
            parents.push(obj);
            for (const kv of iterateMutable(obj)) {
                let val = kv.value;
                const key = kv.key;
                const pLen = parents.length;
                if (_.isObject(val)) {
                    if (_.isArray(obj)) {
                        counter ++;
                        currentIndex = +key + 1;
                    } else {
                        currentLevel ++;
                    }
                    traverse(val);
                    if (!_.isArray(obj)) {
                        currentLevel--;
                    }
                } else {
                    const parentArray = pLen > 1 && _.isArray(parents[pLen - 2]) ? parents[pLen - 2] : null;
                    if (parentArray && key.toString() === '$repeat') {
                        delete obj[key];
                        if (+val < 1) {
                            val = 1;
                        }
                        for (let i = 1; i < val; i++) {
                            const clone = _.cloneDeep(obj);
                            // parentArray.push(clone);
                            parentArray.splice(currentIndex, 0, clone);
                        }
                    }
                    if (_.isString(val)) {
                        let mayBeNum = false;
                        _.keys(macro).forEach((m) => {
                            val = _.replace(val, '${' + m + '}', macro[<Macro>m].value());
                            if (!mayBeNum && macro[<Macro>m].isNum) {
                                mayBeNum = true;
                            }
                        });
                        _.keys(this.reqParams).forEach((p) => {
                            mayBeNum = true;
                            val = _.replace(val, '@{' + p + '}', this.reqParams[p]);
                        });

                        (this.config.dictionaries || []).forEach((d) => {
                            val = _.replace(val, '${' + d.name + '}', _.sample(d.values) || '');
                        });

                        if (mayBeNum) {
                            const v = Number(val);
                            if (!isNaN(v)) {
                                val = v;
                            }
                        }
                        obj[key] = val;
                    }
                }
            }
            parents.splice(-1, 1);
        };
        traverse(this.data);
    }

    getData(): any {
        if (!this.data) {
            this.readJsonFile();
        }
        return this.data;
    }
}

