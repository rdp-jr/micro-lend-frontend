import Layout from '../../components/Layout'
// import fetch from 'isomorphic-unfetch'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Borrower = (props) => {
  const { name, contact_number, address, transactions } = props
  return (
    <Layout>
    <div className="container">
    <h1>{name}</h1>
    <h2>{contact_number}</h2>
    <h2>{address}</h2>
    <h3>{transactions && transactions.map(transaction => (<>
    {transaction.amount_borrowed}
    <Link href="/transaction/[id]" as={`/transaction/${transaction.id}`}><a>View</a></Link>
    </>))}</h3>
    </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query
  console.log(id)

  const API_URL = 'http://localhost:1337'
  
  const res = await fetch(`${API_URL}/borrowers/${id}`)
  const data = await res.json()

  const res2 = await fetch(`${API_URL}/transactions?borrower.id=${id}`)
  const data2 = await res2.json()
  // console.log(data)
  data['transactions'] = data2

  console.log(data)
  return {
    props: data
  }
}

// export async function getServerSideProps({query}) {
  
//   // const { API_URL } = process.env
  
//   const API_URL = 'http://localhost:1337'
  
//   const res = await fetch(`${API_URL}/transactions`)
//   const data = await res.json()

//   return {
//     props: {
//       transactions: data
//     }
//   }
// }



export default Borrower
