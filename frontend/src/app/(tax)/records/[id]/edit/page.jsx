'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation' 
import useAppStore from '@/lib/store/useAppStore'
import { taxDeductions } from '@/lib/constants/taxConstants'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function EditTaxRecordPage() {
    const params = useParams()
    const { id } = params

    const {
        taxRecord,
        fetchTaxRecordById,
        updateTaxRecord,
        loading,
        error,
        taxableIncome,
        finalTax,
        cess,
    } = useAppStore()

    const [localAge, setLocalAge] = useState('')
    const [localGross, setLocalGross] = useState('')
    const [deductionsObj, setDeductionsObj] = useState({})

    useEffect(() => {
        if (id) {
            fetchTaxRecordById(id)
        }
    }, [id, fetchTaxRecordById])

    const router = useRouter()

    useEffect(() => {
        if (taxRecord) {
            setLocalAge(String(taxRecord.age || ''))
            setLocalGross(String(taxRecord.grossIncome || ''))
            if (taxRecord.deductionsClaimed && typeof taxRecord.deductionsClaimed === 'object') {
                const obj = {}
                for (const [k, v] of Object.entries(taxRecord.deductionsClaimed)) {
                    obj[k] = String(v)
                }
                setDeductionsObj(obj)
            }
        }
    }, [taxRecord])

    const handleDeductionChange = (key, value) => {
        setDeductionsObj((prev) => ({ ...prev, [key]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updatedFields = {
            age: localAge,
            grossIncome: localGross,
            deductionsClaimed: deductionsObj,
        }
        await updateTaxRecord(id, updatedFields)
        router.push(`/records/${id}`)
    }

    if (!id) return <p className="text-gray-600">No record ID provided.</p>
    if (error) return <p className="text-red-600">{error}</p>

    return (
        <section className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-purple-700">Update Tax Record</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label>Age</Label>
                        <Input
                            type="text"
                            value={localAge}
                            onChange={(e) => setLocalAge(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Gross Income</Label>
                        <Input
                            type="text"
                            value={localGross}
                            onChange={(e) => setLocalGross(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-purple-700 mb-2 text-lg">Deductions Claimed</h3>
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
                    {loading ? 'Updating...' : 'Update'}
                </Button>
            </form>

            {taxableIncome !== null && (
                <div className="bg-purple-50 p-4 rounded text-purple-700 space-y-2">
                    <h3 className="font-semibold">Updated Calculation</h3>
                    <p>Taxable Income: {taxableIncome}</p>
                    <p>Final Tax: {finalTax}</p>
                    <p>CESS: {cess}</p>
                </div>
            )}
        </section>
    )
}
