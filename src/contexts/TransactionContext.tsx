import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../lib/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionsContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

// 1. Create the context:
export const TransactionsContext = createContext({} as TransactionsContextType)

// 2. Create the provider (the element that'll wrap the components that you want to access the context):
export function TransactionsProvider({ children }: TransactionsProviderProps) {
  // 3. Create the states that you want in your context:
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        q: query,
        _sort: 'createdAt',
        _order: 'desc',
      },
    })

    setTransactions(response.data)
  }

  async function createTransaction(data: CreateTransactionInput) {
    const { description, category, price, type } = data

    const response = await api.post('/transactions', {
      description,
      category,
      price,
      type,
      createdAt: new Date(),
    })

    setTransactions((state) => [response.data, ...state]) // it'll add as the first of the transactions table
  }

  useEffect(() => {
    fetchTransactions()
  }, [])
  return (
    // 4. "export" them through the TransactionsContext.Provider with the values that you want in your context:
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
