
'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useAppStore, { setRouter } from '@/lib/store/useAppStore'
import { taxDeductions } from '@/lib/constants/taxConstants'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function CreateRecordPage() {
  const router = useRouter()

  useEffect(() => {
    setRouter(router)
  }, [router])

  const {
    age,
    grossIncome,
    deductionsClaimed,
    setAge,
    setGrossIncome,
    setDeductionsClaimed,
    createTaxRecord,
    loading,
    error
  } = useAppStore()

  const [localAge, setLocalAge] = useState('')
  const [localGross, setLocalGross] = useState('')
  const [deductionsObj, setDeductionsObj] = useState({})

  useEffect(() => {
    setLocalAge(age)
    setLocalGross(grossIncome)
    setDeductionsObj(deductionsClaimed)
  }, [age, grossIncome, deductionsClaimed])

  const handleDeductionChange = (key, value) => {
    setDeductionsObj((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setAge(localAge)
    setGrossIncome(localGross)
    setDeductionsClaimed(deductionsObj)
    await createTaxRecord()
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-purple-700">Create Tax Record</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && <p className="text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Age</Label>
              <Input
                type="text"
                value={localAge}
                onChange={(e) => setLocalAge(e.target.value)}
                placeholder="e.g. 30"
              />
            </div>
            <div>
              <Label>Gross Income</Label>
              <Input
                type="text"
                value={localGross}
                onChange={(e) => setLocalGross(e.target.value)}
                placeholder="e.g. 700000"
              />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-purple-700 mb-2 text-lg">
              Deductions Claimed
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {taxDeductions.map((ded) => {
                const dName = ded.name
                const currentVal = deductionsObj[dName] || ''
                return (
                  <div key={dName}>
                    <Label className="flex justify-between">
                      <span>{dName}</span>
                      {ded.amount && (
                        <span className="text-xs text-gray-500">
                          (Max {ded.amount})
                        </span>
                      )}
                    </Label>
                    <Input
                      type="text"
                      value={currentVal}
                      onChange={(e) => handleDeductionChange(dName, e.target.value)}
                      placeholder={
                        ded.amount ? `Up to ${ded.amount}` : 'Enter amount'
                      }
                    />
                  </div>
                )
              })}
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Create'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
