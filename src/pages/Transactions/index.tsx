import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './SearchForm'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionTable,
} from './styles'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  createdAt: string
}

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function loadTransactions() {
    // 1. API call
    const response = await fetch('http://localhost:3333/transactions')
    // 2. Convert the data into JSON
    const data = await response.json()

    // 3. set the transactions state with the data collected
    setTransactions(data)
  }

  // We separated the useEffect and the loadTransactions functions
  // because you can't transform the useEffect into an async function directly.
  // Example: useEffect(async()=>{},[])
  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.price}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.type}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              )
            })}
          </tbody>
        </TransactionTable>
      </TransactionsContainer>
    </div>
  )
}
