import Budget from '../Models/Budget';
import { Response, NextFunction, Request } from 'express';

class Budgets {
	
	public async getBudgets( req: Request, res: Response, _next: NextFunction ) {
		const findBudgets = await Budget.find( {
			user_id: req.User._id
		} ).exec();

		res.json( findBudgets );
	}

	public async addBudget( req: Request, res: Response, _next: NextFunction ) {
		if( !req.body.name ) {
			res.status(401).send({
				success: false,
				msg: "Budget name was left blank."
			});
		}

		const addBudget = new Budget( {
			user_id: req.User._id,
			name: req.body.name
		} );

		try {
			await addBudget.save();

			const findBudgets = await Budget.find( {
				user_id: req.User._id
			} ).exec();

			res.status(200).send({
				success: true,
				budgets: findBudgets
			});
		} catch( e ) {
			if (e) {
				return res.status(401).send({
					success: false,
					msg: "Error adding budget"
				});
			}
		}
	}
}

export default new Budgets();