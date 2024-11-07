import { createContext, ReactNode, useEffect, useState } from 'react'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  createdAt: string
}

interface TransactionsContextType {
  transactions: Transaction[]
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

  async function loadTransactions() {
    const response = await fetch('http://localhost:3333/transactions')
    const data = await response.json()

    setTransactions(data)
  }

  useEffect(() => {
    loadTransactions()
  }, [])
  return (
    // 4. "export" them through the TransactionsContext.Provider with the values that you want in your context:
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}
