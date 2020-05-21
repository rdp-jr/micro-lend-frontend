import Layout from '../components/Layout'
import fetch from 'isomorphic-unfetch'

const Borrowers = ({borrowers}) => {
  console.log(borrowers)
  return (
    <Layout>
    <h1>Borrowers</h1>
      <button className="btn btn-primary">Hello</button>
      {borrowers.map(borrower => (
        <div>
          <p>{borrower.name}</p>
          <p>{borrower.contact_number}</p>
        </div>
      ))}
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
