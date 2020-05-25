
import Layout from '../../components/Layout'
import fetch from 'isomorphic-unfetch'
import { useTable } from 'react-table'
import Link from 'next/link'


const Transactions = ({transactions}) => {
  // transactions.map(transaction => {
  //   Object.entries(transaction.schedules).forEach(([key, value]) => console.log(`${key}: ${value}`))
  // })

  const data = React.useMemo(
    () => transactions.map(transaction => ({colId: transaction.id, 
      colAmountBorrowed: transaction.amount_borrowed, colInterestRate: transaction.interest_rate,
    colRDate: transaction.release_date,
    colBorrowerName: transaction.borrower.name})),
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'colId', // accessor is the "key" in the data
      },
      {
        Header: 'Amount Borrowed',
        accessor: 'colAmountBorrowed',
      },
      {
        Header: 'Interest Rate',
        accessor: 'colInterestRate',
      },
      {
        Header: 'Release Date',
        accessor: 'colRDate',
      },
      {
        Header: 'Borrower',
        accessor: 'colBorrowerName',
      },
      {
        Header: '',
        accessor: 'transactionLink',
        Cell: ({row}) => {
          console.log(row.values.colId)
          return (
            <Link href="/transaction/[id]" as={`/transaction/${row.values.colId}`}>
            <a>View</a>
            </Link>
            // <h1>xd</h1>
          )
        }
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })
  
  return (
    <Layout>
      
      {/* {transactions.map(transaction => (
        <div>
          
          <p>{transaction.borrower.name}</p>
          <p>{transaction.amount_borrowed}</p>
          <p>{transaction.interest_rate}</p>
          
          <p>{Object.keys(transaction.schedules).map(key => (`${key}: ${transaction.schedules[key]}`) )}</p>
        </div>
      ))} */}

      <div className="container">
      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
      </div>
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
