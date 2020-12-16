import {Container} from 'inversify';
import {GlobalMockService} from './services/mock-global-service';
import coreContainerModule from '../core/container.config';
// controllers
import './controllers/global-controller';

const containerConfig = new Container();
containerConfig.load(coreContainerModule);
containerConfig.bind<GlobalMockService>(GlobalMockService).toSelf().inSingletonScope();

export default containerConfig;



