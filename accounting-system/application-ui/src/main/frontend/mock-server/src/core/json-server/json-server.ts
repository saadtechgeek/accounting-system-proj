import {injectable} from 'inversify';
import {Router} from 'express';
import * as fs from 'fs';
import {getFilePath} from '../utils';
import {JsonData} from './json-data';

const JSON_CONFIG = '/app/json-data/json-data-config.json';

export interface IJsonDataConfig {
    root?: string;
    dictionaries?: {name: string; values: string[]}[];
    resources: {
        path: string;
        jsonDataFile: string;
        delay?: number;
        overrideController?: boolean;
    }[];
}

@injectable()
export class JsonServer {

    start(router: Router) {
        const config = this.readJsonDataConfig();
        config.resources.forEach((rsc) => {
            if (rsc.overrideController) {
                this.removeRoute(rsc.path, router.stack);
            }
            router.get(rsc.path, (req, res) => {
                setTimeout(() => {
                    const jsonData = new JsonData(config, rsc.jsonDataFile, req.params);
                    res.send(jsonData.getData());
                }, rsc.delay || 0);
            });
        });
        console.log('Routes:', router.stack.map((r) => r.route.path));
    }

    private readJsonDataConfig(): IJsonDataConfig {
        const configJson = fs.readFileSync(getFilePath(JSON_CONFIG), 'utf8');
        const config: IJsonDataConfig = <IJsonDataConfig>JSON.parse(configJson);
        return config;
    }

    private findRoute(path: string, routerStack: any[]) {
        let routes: any[] = [];
        routerStack.forEach((layer) => {
            if (!layer) {
                return;
            }
            if (layer && !layer.match(path)) {
                return;
            }
            if (['query', 'expressInit'].indexOf(layer.name) !== -1) {
                return;
            }
            if (layer.name === 'router') {
                routes = routes.concat(this.findRoute(path.substr(layer.path), layer.handle.stack));
            } else {
                if (layer.name && layer.name.indexOf('bound') !== -1) {
                    routes.push({route: layer || null, stack: routerStack});
                }
            }
        });
        return routes;
    }

    private removeRoute(path: string, routerStack: any[]) {
        const layers = this.findRoute(path, routerStack);
        layers.forEach((layer) => {
            const route = layer.route;
            const stack = layer.stack;
            if (JSON.stringify(route.route.methods).toUpperCase().indexOf('GET') !== -1) {
                console.log(`Controller Route ${layer.route.path} has been overridden`);
                stack.splice(stack.indexOf(route), 1);
            }
        });
    }
}

