import { MagnifyingGlass } from 'phosphor-react'
import { SearchFormContainer } from './styles'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { TransactionsContext } from '../../../contexts/TransactionContext'

// 1. Define a zod schema to validate the form data
const searchFormSchema = z.object({
  query: z.string(),
})

// 2. Define a TypeScript type based on the Zod schema.
type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const { fetchTransactions } = useContext(TransactionsContext)
  // - `register` is used to connect input fields with react-hook-form.
  // - `handleSubmit` indicates which function to execute when the form is submitted - it must be added inside the form parent component.
  // - `formState` gives access to the form's current state, including `isSubmitting`.
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    // By the default the react hook form doesn't have validation functions in this case we used zod
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Search transaction"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Search
      </button>
    </SearchFormContainer>
  )
}
