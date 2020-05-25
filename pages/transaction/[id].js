import Layout from '../../components/Layout'
// import fetch from 'isomorphic-unfetch'
import { useRouter } from 'next/router'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import { useState } from 'react'
import Router from "next/router";

const Transaction = (props) => {
  const { amount_borrowed, interest_rate, schedules, release_date, borrower, id } = props
  const [transaction, setTransaction] = useState(props)


  const handlePayClick = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    // console.log(transaction.schedules[e.target.value])
    schedules[e.target.value] = true
    // console.log(schedules)

    const API_URL = "http://localhost:1337";
    let data = props
    data['schedules'][e.target.value] = true
    console.log(data)

    fetch(`${API_URL}/transactions/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
      console.log(response)
      if (response.status === 500) {
        console.log('fail!')
        // setError('Error. Contact Number already exists in the database.')
      } else if (response.status === 200) {
        console.log('success!')
        Router.push(`/transaction/${id}`);
      }
    });
  }
  return (
    <Layout>
    <div className="container">
    <h1>Amount Borrowed: {amount_borrowed}</h1>
    <h2>Interest Rate: {interest_rate}</h2>
    <h2>Release Date: {release_date}</h2>
    <h3>Borrower: <Link href="/borrower/[id]" as={`/borrower/${borrower.id}`}><a>{borrower.name}</a></Link></h3>
    <h4>Schedules</h4>
    {/* <p>{Object.keys(transaction.schedules).map(key => (`${key}: ${transaction.schedules[key]}`) )}</p> */}
    {Object.keys(schedules).map(key => (<><p>{`${key}: ${schedules[key]}`}</p> <button onClick={handlePayClick} value={key}>Pay</button></>) )}
    </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query
  console.log(id)

  const API_URL = 'http://localhost:1337'
  
  const res = await fetch(`${API_URL}/transactions/${id}`)
  const data = await res.json()

  // const res2 = await fetch(`${API_URL}/transactions?borrower.id=${id}`)
  // const data2 = await res2.json()
  // // console.log(data)
  // data['transactions'] = data2

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



export default Transaction
