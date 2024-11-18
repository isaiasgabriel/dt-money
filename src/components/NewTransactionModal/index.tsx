import * as Dialog from '@radix-ui/react-dialog' // Docs: https://www.radix-ui.com/primitives/docs/components/dialog
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { TransactionsContext } from '../../contexts/TransactionContext'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const { createTransaction } = useContext(TransactionsContext)
  const {
    // Each time you want to add a new info into your form you'll need to use the control from the use from
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    await createTransaction(data)
    reset() // it'll reset the form input fields
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>New Transaction</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Description"
            required
            {...register('description')}
          />
          <input
            type="text"
            placeholder="Price"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Category"
            required
            {...register('category')}
          />

          {/* 
            Controller - A component from the react-hook-form library used to connect custom components 
            to the form's state and validation logic. It ensures the custom component's value is managed 
            within the form context.

            Render - A required prop for Controller. It's a function that returns the custom component 
            you want to control. React-hook-form provides various helper properties (like `field`) to 
            handle the field's value, changes, and other events.

            ({ field }) - Destructures the `field` object provided by react-hook-form. This object contains:
              - `field.value`: The current value of the form field ('income' or 'outcome' here).
              - `field.onChange`: A function to update the field value when it changes.
              - `field.onBlur`: A function called when the field loses focus.
              - `field.name`: The name of the field being controlled ('type' in this case).
        */}
          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Income
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Outcome
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Add
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
