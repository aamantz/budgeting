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

	public async saveBudget( req: Request, res: Response, _next: NextFunction ) {
		try {
			const budget = req.body.budget;
			const budgetId = budget._id;

			delete budget._id;

			//const update = await Budget.updateOne( { _id: budgetId }, budget ).exec();
			const update = await Budget.findOneAndUpdate( { _id: budgetId }, { $set: budget }, { new: true } ).exec()

			res.status(200).send({
				success: true,
				budget: update
			});
		} catch ( e ) {
			console.log( e );
			return res.status(401).send({
				success: false,
				msg: "Error updating budget"
			});
		}
	}
}

export default new Budgets();