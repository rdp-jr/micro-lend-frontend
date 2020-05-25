import Layout from '../../components/Layout'
import fetch from 'isomorphic-unfetch'
import { useTable } from 'react-table'
import Link from 'next/link'

const Borrowers = ({borrowers}) => {

  const data = React.useMemo(
    () => borrowers.map(borrower => ({colId: borrower.id, colName: borrower.name, 
      colContact: borrower.contact_number, colAddress: borrower.address,
      
    })),
    []
  )


  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'colId', // accessor is the "key" in the data
      },
      {
        Header: 'Name',
        accessor: 'colName',
      },
      {
        Header: 'Contact Number',
        accessor: 'colContact',
      },
      {
        Header: 'Address',
        accessor: 'colAddress',
      },

      {
        Header: '',
        accessor: 'borrowerLink',
        Cell: ({row}) => {
          console.log(row.values.colId)
          return (
            <Link href="/borrower/[id]" as={`/borrower/${row.values.colId}`}>
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

//   const onRowClick = (rowInfo, column, instance) => {
//     return {
//         onClick: e => {
//             console.log('A Td Element was clicked!')
//             console.log('it produced this event:', e)
//             console.log('It was in this column:', column)
//             console.log('It was in this row:', rowInfo)
//             console.log('It was in this table instance:', instance)
//         }
//     }
// }

  // console.log(data)

  // console.log(borrowers)
  return (
    <Layout>
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

    {/* <h1>Borrowers</h1>
      <button className="btn btn-primary">Hello</button>
      {borrowers.map(borrower => (
        <div>
          <p>{borrower.name}</p>
          <p>{borrower.contact_number}</p>
          <p>{borrower.address}</p>
        </div>
      ))} */}
    </Layout>
  )
}


export async function getServerSideProps() {
  
  // const { API_URL } = process.env
  const API_URL = 'http://localhost:1337'
  const res = await fetch(`${API_URL}/borrowers`)
  const data = await res.json()

  return {
    props: {
      borrowers: data
    }
  }
}



export default Borrowers
