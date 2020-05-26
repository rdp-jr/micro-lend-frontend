import Layout from '../../components/Layout'
// import fetch from 'isomorphic-unfetch'
import { useRouter } from 'next/router'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import { useState } from 'react'
import Router from "next/router";
import moment from 'moment'
import numeral from 'numeral'

const Transaction = (props) => {
  const { amount_borrowed, interest_rate, schedules, release_date, borrower, id } = props
  const [transaction, setTransaction] = useState(props)
  const totalPaymentPerQuarter = (parseInt(amount_borrowed) + (parseInt(amount_borrowed)*(parseInt(interest_rate)/100))) /4
  const totalPrincipalPerQuarter = parseInt(amount_borrowed)/4
  const totalInterestPerQuarter = (parseInt(amount_borrowed) * parseInt(interest_rate)/100)/4

  const getStatus = () => {
 
    const values = Object.values(schedules)
    const test = x => x === true

    if (values.every(test)) {
      
      return true
    } else {
     
      return false
    }
    
  }

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
  // let status = true
  
  return (
    <Layout>
    <div className="container">

    <dl className="row">
      <dt className="col-sm-3"><h6>Transaction ID</h6></dt>
      <dd className="col-sm-9"><h6>{id}</h6></dd>

      <dt className="col-sm-3"><h3>Principal</h3></dt>
      <dd className="col-sm-9"><h3>{numeral(amount_borrowed).format('0,0')}</h3></dd>

      <dt className="col-sm-3"><h3>Interest Rate</h3></dt>
      <dd className="col-sm-9"><h3>{interest_rate}%</h3></dd>

      <dt className="col-sm-3"><h3>Release Date</h3></dt>
      <dd className="col-sm-9"><h3>{moment(release_date).format('LL')}</h3></dd>

      <dt className="col-sm-3"><h3>Payment Per Quarter</h3></dt>
  <dd className="col-sm-9">
    <dl className="row">
      <dd className="col-sm-3"><h3>{numeral(totalPaymentPerQuarter).format('0,0')}</h3></dd>
      <dd className="col-sm-3"><h3>{numeral(totalPrincipalPerQuarter).format('0,0')} <small className="text-muted">(Principal)</small></h3></dd>
      <dd className="col-sm-3"><h3>{numeral(totalInterestPerQuarter).format('0,0')} <small className="text-muted">(Interest)</small></h3></dd>
    </dl>
  </dd>

      <dt className="col-sm-3"><h3>Borrower</h3></dt>
      <dd className="col-sm-9"><h3><Link href="/borrower/[id]" as={`/borrower/${borrower.id}`}><a>{borrower.name}</a></Link></h3></dd>

      <dt className="col-sm-3"><h3>Status</h3></dt>
      <dd className="col-sm-9"><h3> <span className={getStatus() ? "badge badge-success" : "badge badge-primary"}>{getStatus() ? "Matured" : "Open"}</span></h3></dd>


    </dl>

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
