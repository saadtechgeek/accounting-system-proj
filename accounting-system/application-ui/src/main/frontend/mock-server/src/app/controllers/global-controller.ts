import * as express from "express";
import { interfaces, controller, httpGet, httpPost, httpDelete, request, queryParam, response, requestParam } from "inversify-express-utils";
import { inject } from "inversify";
import {GlobalMockService} from '../services/mock-global-service';

@controller('/global')
export class BaserateScenarioController implements interfaces.Controller {

    constructor(@inject(GlobalMockService) private globalService: GlobalMockService) {
    }

    private async delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    @httpPost("/create")
    private async create(@request() req: express.Request, @response() res: express.Response) {
        try {
            await this.globalService.create(req.body);
            res.sendStatus(201);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}
