import Layout from '../components/Layout'
import fetch from 'isomorphic-unfetch'

const Index = ({transactions}) => {
  // console.log(transactions)
  // console.log(process.env.API_URL)
  return (
    <Layout>
      <button className="btn btn-primary">Hello</button>
      {transactions.map(transaction => (
        <div>
          {transaction.borrower.name}
        </div>
      ))}
    </Layout>
  )
}


export async function getServerSideProps() {
  
  // const { API_URL } = process.env
  
  const API_URL = 'http://localhost:1337'
  
  const res = await fetch(`${API_URL}/transactions`)
  const data = await res.json()

  return {
    props: {
      transactions: data
    }
  }
}



export default Index
