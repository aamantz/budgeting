import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

export default mongoose.model("Budget", BudgetSchema);