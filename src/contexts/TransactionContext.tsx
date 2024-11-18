import { useCallback, ReactNode, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

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
// Instead of using the createContext from react we'll use from the use-context-selector
export const TransactionsContext = createContext({} as TransactionsContextType)

// 2. Create the provider (the element that'll wrap the components that you want to access the context):
export function TransactionsProvider({ children }: TransactionsProviderProps) {
  // 3. Create the states that you want in your context:
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        q: query,
        _sort: 'createdAt',
        _order: 'desc',
      },
    })

    setTransactions(response.data)
  }, [])

  // useCallback memoizes the callback function to prevent it from being recreated
  // unless its dependencies (in the dependency array) change, improving performance.
  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, category, price, type } = data

      const response = await api.post('/transactions', {
        description,
        category,
        price,
        type,
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state]) // it'll add as the first of the transactions table
    },
    [],
    // This is the dependency array; it specifies the values that the function depends on.
    // If any of these values change, the function will be recreated
  )
  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])
  return (
    // 4. "export" them through the TransactionsContext.Provider with the values that you want in your context:
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
