export const taxSlabs = {
  cessRate: 0.04,
  rebateLimit: 500000,
  rebateAmount: 12500,
  getSlabForIncome(income) {
    if (income <= 250000) {
      return { min: 0, max: 250000, rate: 0.0 };
    } else if (income <= 500000) {
      return { min: 250001, max: 500000, rate: 0.05 };
    } else if (income <= 1000000) {
      return { min: 500001, max: 1000000, rate: 0.20 };
    } else {
      return { min: 1000001, max: Infinity, rate: 0.30 };
    }
  }
};

export const taxDeductions = [
  { name: 'Section 80C', amount: 150000 },
  { name: 'Section 80CCD(1B)', amount: 50000 },
  { name: 'Section 80D', amount: null },
  { name: 'Section 80E', amount: null },
  { name: 'Section 24(b)', amount: 200000 },
  { name: 'Section 80G', amount: null },
  { name: 'Section 80TTA', amount: 10000 },
  { name: 'Standard Deduction', amount: 50000 }
];
