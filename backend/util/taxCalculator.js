import { taxSlabs, taxDeductions } from '../constants/taxConstants.js';

export function calculateTax(grossIncome, deductionsClaimed) {
  
  const userDeductions = deductionsClaimed
    ? Object.entries(deductionsClaimed).reduce((sum, [key, val]) => {
        const inputVal = Number(val) || 0;
        const deductionConst = taxDeductions.find(d => d.name === key);
        if (deductionConst && deductionConst.amount != null) {
          return sum + Math.min(inputVal, Number(deductionConst.amount));
        }
        return sum + inputVal;
      }, 0)
    : 0;

  const stdDeductionObj = taxDeductions.find(d => d.name === 'Standard Deduction');
  const standardDeduction = stdDeductionObj ? Number(stdDeductionObj.amount) : 0;

  const totalDeductions = userDeductions + standardDeduction;

  const taxableIncome = Math.max(0, grossIncome - totalDeductions);

  let tax = 0;
  if (taxableIncome <= 250000) {
    tax = 0;
  } else if (taxableIncome <= 500000) {
    tax = (taxableIncome - 250000) * 0.05;
  } else if (taxableIncome <= 1000000) {
    tax = (250000 * 0.05) + ((taxableIncome - 500000) * 0.20);
  } else {
    tax = (250000 * 0.05) + (500000 * 0.20) + ((taxableIncome - 1000000) * 0.30);
  }

  if (taxableIncome <= taxSlabs.rebateLimit) {
    tax = Math.max(0, tax - taxSlabs.rebateAmount);
  }

  const cess = tax * taxSlabs.cessRate;
  const finalTax = tax + cess;

  return { taxableIncome, tax, cess, finalTax };
}
