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
    },
    items: {
        type: Object,
        required: false
    },
    weeks: {
        type: Object,
        required: false
    }
});

export default mongoose.model("Budget", BudgetSchema);