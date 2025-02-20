'use client'

import { create } from 'zustand'

let router
export const setRouter = (r) => { router = r }

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const useAppStore = create((set, get) => ({
    age: '',
    grossIncome: '',

    deductionsClaimed: {},

    taxRecord: null,
    taxRecords: [],
    taxableIncome: null,
    finalTax: null,
    cess: null,

    loading: false,
    error: null,

    setAge: (val) => set({ age: val }),
    setGrossIncome: (val) => set({ grossIncome: val }),
    setDeductionsClaimed: (obj) => set({ deductionsClaimed: obj }),

    createTaxRecord: async () => {
        try {
            set({ loading: true, error: null })
            const { age, grossIncome, deductionsClaimed } = get()

            const numericAge = parseFloat(age) || 0
            const numericGross = parseFloat(grossIncome) || 0
            const finalDeductions = {}
            for (const [k, v] of Object.entries(deductionsClaimed)) {
                finalDeductions[k] = parseFloat(v) || 0
            }

            const body = {
                age: numericAge,
                grossIncome: numericGross,
                deductionsClaimed: finalDeductions
            }

            const res = await fetch(`${API_BASE_URL}/tax`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            if (!res.ok) {
                const errData = await res.json()
                throw new Error(errData.message || 'Failed to create tax record.')
            }
            const data = await res.json()

            const newId = data?.taxRecord?._id

            set({
                age: '',
                grossIncome: '',
                deductionsClaimed: {},
                taxRecord: data.taxRecord || null,
                taxableIncome: data.taxRecord?.taxableIncome ?? null,
                finalTax: data.taxRecord?.finalTax ?? null,
                cess: data.taxRecord?.cess ?? null
            })
            if (newId && router) {
                router.push(`/records/${newId}`)
            }
        } catch (err) {
            set({ error: err.message })
        } finally {
            set({ loading: false })
        }
    },

    fetchAllTaxRecords: async () => {
        try {
            set({ loading: true, error: null })
            const res = await fetch(`${API_BASE_URL}/tax`)
            if (!res.ok) {
                const errData = await res.json()
                throw new Error(errData.message || 'Failed to fetch records.')
            }
            const data = await res.json()
            set({ taxRecords: data.taxRecords || [] })
        } catch (err) {
            set({ error: err.message })
        } finally {
            set({ loading: false })
        }
    },

    fetchTaxRecordById: async (id) => {
        try {
            set({ loading: true, error: null, taxRecord: null })
            const res = await fetch(`${API_BASE_URL}/tax/${id}`)
            if (!res.ok) {
                const errData = await res.json()
                throw new Error(errData.message || 'Failed to fetch record.')
            }
            const data = await res.json()
            set({ taxRecord: data.taxRecord || null })
        } catch (err) {
            set({ error: err.message })
        } finally {
            set({ loading: false })
        }
    },

    updateTaxRecord: async (id, updatedFields) => {
        try {
            set({ loading: true, error: null })

            const numericAge = parseFloat(updatedFields.age) || 0
            const numericGross = parseFloat(updatedFields.grossIncome) || 0
            const finalDeductions = {}
            for (const [k, v] of Object.entries(updatedFields.deductionsClaimed || {})) {
                finalDeductions[k] = parseFloat(v) || 0
            }

            const body = {
                age: numericAge,
                grossIncome: numericGross,
                deductionsClaimed: finalDeductions
            }

            const res = await fetch(`${API_BASE_URL}/tax/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            if (!res.ok) {
                const errData = await res.json()
                throw new Error(errData.message || 'Failed to update record.')
            }
            const data = await res.json()

            const updatedId = data?.taxRecord?._id

            set({
                taxRecord: data.taxRecord || null,
                taxableIncome: data.taxRecord?.taxableIncome ?? null,
                finalTax: data.taxRecord?.finalTax ?? null,
                cess: data.taxRecord?.cess ?? null
            })

            if (updatedId && router) {
                router.push(`/records/${updatedId}`)
            }
        } catch (err) {
            set({ error: err.message })
        } finally {
            set({ loading: false })
        }
    },

    deleteTaxRecord: async (id) => {
        try {
            set({ loading: true, error: null })
            await fetch(`${API_BASE_URL}/tax/${id}`, { method: 'DELETE' })

            const { taxRecords } = get()
            const updated = taxRecords.filter((r) => r._id !== id)
            set({ taxRecords: updated, taxRecord: null })
        } catch (err) {
            set({ error: err.message })
        } finally {
            set({ loading: false })
        }
    }
}))

export default useAppStore
