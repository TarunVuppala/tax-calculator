export function generateTaxSuggestions(grossIncome, deductionsClaimed = 0, age) {
    const suggestions = [];
  
    if (deductionsClaimed < 150000) {
      suggestions.push(
        'Maximize Section 80C deductions (up to ₹1.5 lakh) via PPF, ELSS, etc.'
      );
    }
  
    if (grossIncome > 800000) {
      suggestions.push(
        'Use NPS under Section 80CCD(1B) for an additional ₹50k deduction.'
      );
    }
  
    if (age >= 60) {
      suggestions.push(
        'Being a senior citizen, consider higher Section 80D benefits for health insurance.'
      );
      
      if (age > 70) {
        suggestions.push(
          'Check reverse mortgage or senior citizen savings schemes for better returns.'
        );
      }
    } else {
      suggestions.push(
        'Take/renew health insurance to claim Section 80D (up to ₹25k).'
      );
    }
  
    if (grossIncome > 1000000) {
      suggestions.push(
        'Explore Section 80G (charitable donations) to reduce taxable income.'
      );
      suggestions.push(
        'Consider home loan interest deduction under Section 24(b) if applicable.'
      );
    }
  
    if (deductionsClaimed < 50000) {
      suggestions.push(
        'Review Standard Deduction (₹50k) and other allowances (HRA, LTA).'
      );
    }
  
    if (grossIncome > 0 && age < 35) {
      suggestions.push(
        'If you have an education loan, use Section 80E for interest deduction.'
      );
    }
  
    if (grossIncome < 500000) {
      suggestions.push(
        'If your net taxable income is below ₹5L, you may qualify for the Section 87A rebate.'
      );
    }
  
    return suggestions;
  }
  