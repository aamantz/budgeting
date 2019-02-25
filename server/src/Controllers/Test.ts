import { Request, Response, NextFunction } from 'express';

class TestController {

    getData( _req: Request, res: Response, _next: NextFunction ) {
        res.json( { test: 'testing' } );
    }
}

export default new TestController;