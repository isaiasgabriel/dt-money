import { TransactionsContext } from '../contexts/TransactionContext'
import { useContextSelector } from 'use-context-selector'
import { useMemo } from 'react'

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  // reduce is a function that iterates thorugh an array and REDUCE into a new data structure
  // this new data structure is specified as the second argument of the function ({income: 0, outcome: 0, total: 0})
  // acc (accumulator) represents this data structure and allow us to manipulate it's data
  // in the end of the function we return this acc(accumulator) which now can be used in the component as summary
  // acc === summary
  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.price
          acc.total += transaction.price
        } else {
          acc.outcome -= transaction.price
          acc.total -= transaction.price
        }

        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }, [transactions]) // dependency array
  //
  // What this code is basically doing is specifying that the summary variable will ONLY
  // be recreated when the transactions state change
  //
  // Before this, everytime that the useSummary component was rendered, it also recreated this function

  return summary
}
