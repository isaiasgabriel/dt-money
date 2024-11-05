import { styled } from 'styled-components'

export const TransactionsContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0; // 4 up, auto horizontal, 0 down
  padding: 0 1.5rem;
`

export const TransactionTable = styled.table`
  width: 100%;
  border-collapse: separate; // this options enables you to put a gap between each row
  border-spacing: 0 0.5rem; // we define this gap through this option, 0 on the sides, 0.5rem up and down
  /* margin-top: 1.5rem; */

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`

interface PriceHighlightProps {
  variant: 'income' | 'outcome'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};
`
