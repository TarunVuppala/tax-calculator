import React from 'react'

const page = () => {
  return (
    <section className="flex flex-col items-center justify-center py-10 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">
        Welcome to the Tax Calculator
      </h1>
      <p className="text-lg text-gray-700 text-center">
        Easily manage your income tax calculations,
        track deductions, and view auto-generated tax-saving suggestions.
      </p>
    </section>
  )
}

export default page