'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import useAppStore from '@/lib/store/useAppStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function RecordsPage() {
    const { taxRecords, fetchAllTaxRecords, deleteTaxRecord, loading, error } = useAppStore()

    useEffect(() => {
        fetchAllTaxRecords()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {
        return <p className="text-center text-gray-500">Loading tax records...</p>
    }
    if (error) {
        return <p className="text-center text-red-600">{error}</p>
    }
    if (taxRecords.length === 0) {
        return <p className="text-gray-600">No records found.</p>
    }

    return (
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {taxRecords.map((record) => (
                <Card key={record._id}>
                    <CardHeader>
                        <CardTitle className="text-base font-semibold text-purple-700">
                            Tax Record
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p>
                            <span className="font-medium">Age:</span> {record.age}
                        </p>
                        <p>
                            <span className="font-medium">Gross Income:</span> {record.grossIncome}
                        </p>

                        <div>
                            <p className="font-medium">Deductions:</p>
                            {record.deductionsClaimed && typeof record.deductionsClaimed === 'object' ? (
                                <ul className="list-disc list-inside ml-4">
                                    {Object.entries(record.deductionsClaimed).map(([k, v]) => (
                                        <li key={k}>
                                            {k}: {v}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No deductions</p>
                            )}
                        </div>

                        <p>
                            <span className="font-medium">Taxable:</span> {record.taxableIncome}
                        </p>
                        <p>
                            <span className="font-medium">Final Tax:</span> {record.finalTax}
                        </p>
                        <p>
                            <span className="font-medium">CESS:</span> {record.cess}
                        </p>

                        <div className="flex justify-between items-center mt-4">
                            <Link
                                href={`/records/${record._id}`}
                                className="text-purple-600 hover:underline"
                            >
                                View
                            </Link>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                    deleteTaxRecord(record._id)
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </section>
    )
}
