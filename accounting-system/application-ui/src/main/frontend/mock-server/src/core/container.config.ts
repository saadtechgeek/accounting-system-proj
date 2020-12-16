import {ContainerModule, interfaces} from 'inversify';
import {JsonServer} from './json-server/json-server';

const coreContainerModule = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<JsonServer>(JsonServer).toSelf().inSingletonScope();
});

export default coreContainerModule;
