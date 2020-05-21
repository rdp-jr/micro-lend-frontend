import {
  useTable,
  useGroupBy,
  useFilters,
  useSortBy,
  useExpanded,
  usePagination
} from 'react-table'

import Layout from '../components/Layout'
import fetch from 'isomorphic-unfetch'

const Transactions = ({transactions}) => {
  // transactions.map(transaction => {
  //   Object.entries(transaction.schedules).forEach(([key, value]) => console.log(`${key}: ${value}`))
  // })
  
  return (
    <Layout>
      <button className="btn btn-primary">Hello</button>
      {transactions.map(transaction => (
        <div>
          {/* {transaction.borrower.name ? transactions.borrower.name : 'No Borrower'} */}
          <p>{transaction.borrower.name}</p>
          <p>{transaction.amount_borrowed}</p>
          <p>{transaction.interest_rate}</p>
          {/* {Object.entries(transaction.schedules)} */}
          {/* { Object.entries(transaction.schedules).forEach(([key, value]) => (`${key}: ${value}`))} */}
          <p>{Object.keys(transaction.schedules).map(key => (`${key}: ${transaction.schedules[key]}`) )}</p>
        </div>
      ))}
    </Layout>
  )
}


export async function getServerSideProps() {
  
  // const { API_URL } = process.env.API_URL
  const API_URL = 'http://localhost:1337'
  const res = await fetch(`${API_URL}/transactions`)
  const data = await res.json()

  return {
    props: {
      transactions: data
    }
  }
}



export default Transactions
