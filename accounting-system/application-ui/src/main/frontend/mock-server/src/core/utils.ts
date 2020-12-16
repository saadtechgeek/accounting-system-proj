import * as path from 'path';
import * as _ from 'lodash';

export const ROOT_PATH = path.resolve(__dirname + '../..');

export function getFilePath(relPath: string) {
    return path.resolve(ROOT_PATH + relPath);
}

export function* iterateMutable(obj: any) {
    if (_.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
            yield {value: obj[i], key: i};
        }
    } else if (_.isObject(obj)) {
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                yield {value: obj[prop], key: prop};
            }
        }
    } else {
        throw new Error('Wrong argument type in iterateMutable(). Should be array or object');
    }
}
