'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import useAppStore from '@/lib/store/useAppStore'
import { Button } from '@/components/ui/button'

export default function RecordDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params

  const { taxRecord, fetchTaxRecordById, loading, error } = useAppStore()

  useEffect(() => {
    if (id) {
      fetchTaxRecordById(id)
    }
  }, [id, fetchTaxRecordById])

  if (!id) {
    return <p className="text-center text-gray-600">No record selected.</p>
  }
  if (loading) {
    return <p className="text-center text-gray-500">Loading record...</p>
  }
  if (error) {
    return <p className="text-center text-red-600">{error}</p>
  }
  if (!taxRecord) {
    return <p className="text-center text-gray-600">Record not found.</p>
  }

  const renderDeductions = (ded) => {
    if (!ded || typeof ded !== 'object') return <p className="text-gray-500">No Deductions</p>
    const entries = Object.entries(ded)
    if (entries.length === 0) return <p className="text-gray-500">No Deductions</p>
    return (
      <ul className="list-disc list-inside ml-4">
        {entries.map(([k, v]) => (
          <li key={k}>
            {k}: {v}
          </li>
        ))}
      </ul>
    )
  }

  const renderSuggestions = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) {
      return <p className="text-gray-500">No Suggestions</p>
    }
    return (
      <ul className="list-disc list-inside ml-4">
        {arr.map((sug, idx) => (
          <li key={idx}>{sug}</li>
        ))}
      </ul>
    )
  }

  return (
    <section className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-purple-700">Tax Record Details</h2>
      <div className="space-y-3 text-base leading-relaxed">
        <p>
          <span className="font-semibold">Age:</span> {taxRecord.age}
        </p>
        <p>
          <span className="font-semibold">Gross Income:</span> {taxRecord.grossIncome}
        </p>
        <div>
          <p className="font-semibold">Deductions Claimed:</p>
          {renderDeductions(taxRecord.deductionsClaimed)}
        </div>
        <p>
          <span className="font-semibold">Taxable Income:</span> {taxRecord.taxableIncome}
        </p>
        <p>
          <span className="font-semibold">Final Tax:</span> {taxRecord.finalTax}
        </p>
        <p>
          <span className="font-semibold">CESS:</span> {taxRecord.cess}
        </p>
        <div>
          <p className="font-semibold">Auto-Generated Suggestions:</p>
          {renderSuggestions(taxRecord.taxSuggestions)}
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <Link href={`/records/${id}/edit`}>
          <Button variant="default">Edit</Button>
        </Link>
        <Button variant="secondary" onClick={() => router.push('/records')}>
          Back to List
        </Button>
      </div>
    </section>
  )
}
