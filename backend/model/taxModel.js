import mongoose from 'mongoose';

const TaxSchema = new mongoose.Schema({
    age: {
        type: Number,
        required: true
    },
    grossIncome: {
        type: Number,
        required: true
    },
    deductionsClaimed: {
        type: Map,
        of: Number,
        default: {}
    },
    taxableIncome: {
        type: Number,
        required: true
    },
    finalTax: {
        type: Number,
        required: true
    },
    cess: {
        type: Number,
        required: true
    },
    taxSuggestions: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const TaxModel = mongoose.model('Tax', TaxSchema);
export default TaxModel;
