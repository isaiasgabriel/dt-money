import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './SearchForm'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionTable,
} from './styles'

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionTable>
          <tbody>
            <tr>
              <td width="50%">Site development</td>
              <td>
                <PriceHighlight variant="income">+ R$ 12.000,00</PriceHighlight>
              </td>
              <td>Sell</td>
              <td>05/11/2024</td>
            </tr>
            <tr>
              <td width="50%">Hamburguer</td>
              <td>
                <PriceHighlight variant="outcome">- R$ 50,00</PriceHighlight>
              </td>
              <td>Food</td>
              <td>11/11/2024</td>
            </tr>
          </tbody>
        </TransactionTable>
      </TransactionsContainer>
    </div>
  )
}
