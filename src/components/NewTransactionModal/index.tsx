import * as Dialog from '@radix-ui/react-dialog' // Docs: https://www.radix-ui.com/primitives/docs/components/dialog
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'

export function NewTransactionModal() {
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>New Transaction</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form action="">
          <input type="text" placeholder="Description" required />
          <input type="text" placeholder="Price" required />
          <input type="text" placeholder="Category" required />

          {/* TransactionType = RadioGroup.Root */}
          <TransactionType>
            {/* TransactionTypeButton = RadioGroup.Item */}
            <TransactionTypeButton variant="income" value="income">
              {/* 'value' is obligatory for the radio group */}
              <ArrowCircleUp size={24} />
              Income
            </TransactionTypeButton>
            <TransactionTypeButton variant="outcome" value="outcome">
              <ArrowCircleDown size={24} />
              Outcome
            </TransactionTypeButton>
          </TransactionType>

          <button type="submit">Add</button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
