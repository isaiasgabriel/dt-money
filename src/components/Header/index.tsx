import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import logoImg from '../../assets/logo.svg'
import * as Dialog from '@radix-ui/react-dialog' // Docs: https://www.radix-ui.com/primitives/docs/components/dialog

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            {/* 
                The asChild option will reuse the button inside as the trigger instead of creating a new button.
                If you don't put the 'asChild' option you'll have 2 buttons: Datalog.Trigger and NewTransactionButton.
            */}
            <NewTransactionButton>New Transaction</NewTransactionButton>
          </Dialog.Trigger>

          {/* Dialog.Portal will create the component outside the root */}
          <Dialog.Portal>
            <Dialog.Overlay />
            {/* Dialog.Overlay it's basically the background with less opacity */}
            <Dialog.Content>
              <Dialog.Title>New Transaction</Dialog.Title>

              <Dialog.Close />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
