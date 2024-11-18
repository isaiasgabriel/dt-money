import { MagnifyingGlass } from 'phosphor-react'
import { SearchFormContainer } from './styles'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../../contexts/TransactionContext'
import { useContextSelector } from 'use-context-selector'
import { memo } from 'react'

// 1. Define a zod schema to validate the form data
const searchFormSchema = z.object({
  query: z.string(),
})

// 2. Define a TypeScript type based on the Zod schema.
type SearchFormInputs = z.infer<typeof searchFormSchema>

function SearchFormComponent() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )
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

export const SearchForm = memo(SearchFormComponent)

// Why react renders a component? Triggers!
// - Hooks
// - Props
// - Parent rendered

// What's the react render flow?
// 1. React recreate the HTML of the interface
// 2. It compares with the current HTML version displayed
// 3. IF something changed, it rewrites the HTML on the screen

// Memo: it adds another step into this equation.
// 0. Hooks, props changed (deep comparison)
// 0.1. Compare with the previous hook and props values
// 0.2. IF something changed, it'll allow a new render

// In pages where you don't have a lot of HTML it looks overengineering but
// as the project grows and it has more and more components, it can be useful to use memo.
