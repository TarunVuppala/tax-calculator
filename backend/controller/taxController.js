import TaxModel from '../model/taxModel.js';

import { calculateTax } from '../util/taxCalculator.js';
import { generateTaxSuggestions } from '../util/generateTaxSuggestions.js';

export const createTaxRecord = async (req, res) => {
  try {
    const { age, grossIncome, deductionsClaimed } = req.body;
    if (age == null || grossIncome == null) {
      return res
        .status(400)
        .json({ message: 'Age and grossIncome are required', success: false });
    }

    const { taxableIncome, tax, cess, finalTax } = calculateTax(
      grossIncome,
      deductionsClaimed
    );

    const autoSuggestions = generateTaxSuggestions(grossIncome, deductionsClaimed, age);

    const newTaxRecord = await TaxModel.create({
      age,
      grossIncome,
      deductionsClaimed,
      taxableIncome,
      finalTax,
      cess,
      taxSuggestions: autoSuggestions
    });

    return res.status(201).json({
      message: 'Tax record created successfully',
      success: true,
      taxRecord: newTaxRecord
    });
  } catch (error) {
    console.error('Error creating tax record:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error', success: false });
  }
};

export const getAllTaxRecords = async (req, res) => {
  try {
    const taxRecords = await TaxModel.find()
    .select('-taxSuggestions -deductionsClaimed')
    .lean()
    .exec();
    return res.status(200).json({
      message: 'Tax records fetched successfully',
      success: true,
      taxRecords
    });
  } catch (error) {
    console.error('Error fetching tax records:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error', success: false });
  }
};

export const getTaxRecordById = async (req, res) => {
  try {
    const taxRecord = await TaxModel.findById(req.params.id).lean().exec();
    if (!taxRecord) {
      return res.status(404).json({ message: 'Tax record not found', success: false });
    }
    return res.status(200).json({
      message: 'Tax record fetched successfully',
      success: true,
      taxRecord
    });
  } catch (error) {
    console.error('Error fetching tax record:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error', success: false });
  }
};

export const updateTaxRecord = async (req, res) => {
  try {
    const taxRecord = await TaxModel.findById(req.params.id).exec();
    if (!taxRecord) {
      return res.status(404).json({ message: 'Tax record not found', success: false });
    }

    const { age, grossIncome, deductionsClaimed } = req.body;
    if (age !== undefined) taxRecord.age = age;
    if (grossIncome !== undefined) taxRecord.grossIncome = grossIncome;
    if (deductionsClaimed !== undefined) taxRecord.deductionsClaimed = deductionsClaimed;

    if (grossIncome !== undefined || deductionsClaimed !== undefined) {
      const updatedGross = taxRecord.grossIncome;
      const updatedDeductions = taxRecord.deductionsClaimed;

      const numericDeductions = updatedDeductions
        ? Object.fromEntries(
            Object.entries(updatedDeductions).map(([k, v]) => [k, Number(v)])
          )
        : {};

      const { taxableIncome, cess, finalTax } = calculateTax(
        updatedGross,
        numericDeductions
      );

      taxRecord.taxableIncome = taxableIncome;
      taxRecord.finalTax = finalTax;
      taxRecord.cess = cess;
    }

    const autoSuggestions = generateTaxSuggestions(
      taxRecord.grossIncome,
      taxRecord.deductionsClaimed,
      taxRecord.age
    );
    taxRecord.taxSuggestions = autoSuggestions;

    await taxRecord.save();

    const updatedRecord = await TaxModel.findById(req.params.id).lean().exec();
    return res.status(200).json({
      message: 'Tax record updated successfully',
      success: true,
      taxRecord: updatedRecord
    });
  } catch (error) {
    console.error('Error updating tax record:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error', success: false });
  }
};

export const deleteTaxRecord = async (req, res) => {
  try {
    const taxRecord = await TaxModel.findByIdAndDelete(req.params.id).lean().exec();
    if (!taxRecord) {
      return res.status(404).json({ message: 'Tax record not found', success: false });
    }
    return res.status(200).json({
      message: 'Tax record deleted successfully',
      success: true
    });
  } catch (error) {
    console.error('Error deleting tax record:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error', success: false });
  }
};
