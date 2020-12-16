import {injectable} from 'inversify';

@injectable()
export class GlobalMockService {
    private async delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
    public async create(request:any ): Promise<any> {
        return this.delay(10000);
    }
    public async saveScenarioRun(request:any ): Promise<any> {
        return this.delay(10000);
    }

    public async executeScenarioRun(request:any ): Promise<any> {
        
    }
}
