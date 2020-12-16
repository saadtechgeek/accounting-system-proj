import {Server} from '../core/server';
import containerConfig from './container.config';

(new Server(containerConfig)).start();

