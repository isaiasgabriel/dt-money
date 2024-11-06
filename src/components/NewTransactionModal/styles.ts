import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog' // Docs: https://www.radix-ui.com/primitives/docs/components/dialog
import * as RadioGroup from '@radix-ui/react-radio-group' // Docs: https://www.radix-ui.com/primitives/docs/components/radio-group

// Radio Group - a set of checkable buttons, a.k.a. radio buttons,
// where no more than one of the buttons can be checked at a time.

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw; // These 2 options
  height: 100vh; // will make the modal occupy the whole screen
  inset: 0; // the same as top:0; bottom:0; right:0; left: 0
  background: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${(props) => props.theme['gray-800']};

  // "hack" to centralize the content:
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      border-radius: 6px;
      border: 0;
      background: ${(props) => props.theme['gray-900']};
      color: ${(props) => props.theme['gray-300']};
      padding: 1rem;

      &::placeholder {
        color: ${(props) => props.theme['gray-500']};
      }
    }
  }

  button[type='submit'] {
    height: 58px;
    border: 0;
    border-radius: 6px;
    background: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme.white};
    font-weight: bold;
    padding: 0 1.25rem;
    margin-top: 1.5rem;
    cursor: pointer;

    &:hover {
      background: ${(props) => props.theme['green-700']};
      transition: background-color 0.2s;
    }
  }
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0; // This option will make the focus the same size as the icon
  cursor: pointer;
  color: ${(props) => props.theme['gray-500']};
`

export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`

interface TransactionTypeButtonProps {
  variant?: 'income' | 'outcome'
}

export const TransactionTypeButton = styled(
  RadioGroup.Item,
)<TransactionTypeButtonProps>`
  background: ${(props) => props.theme['gray-700']};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 6px;
  color: ${(props) => props.theme['gray-300']};
  border: 0;
  cursor: pointer;

  svg {
    color: ${(props) =>
      props.variant === 'income'
        ? props.theme['green-300']
        : props.theme['red-300']};
  }

  // This data-state property is created by the radix when you click on the button
  &[data-state='checked'] {
    color: ${(props) => props.theme.white};
    background: ${(props) =>
      props.variant === 'income'
        ? props.theme['green-500']
        : props.theme['red-500']};

    svg {
      color: ${(props) => props.theme.white};
    }
  }

  &[data-state='unchecked']:hover {
    transition: background-color 0.2s;
    background: ${(props) => props.theme['gray-600']};
  }
`
