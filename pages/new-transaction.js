import { useForm } from 'react-hook-form'
import Layout from "../components/Layout";
import Head from 'next/head'
import { useState } from 'react'
import Router from "next/router";
import Select from 'react-select'


const NewTransaction = ({borrowers}) => {

  // console.log(borrowers)


  const { register, handleSubmit, watch, errors } = useForm();
  const [error, setError] = useState()
  const onSubmit = data => {
    console.log(data)
    // const API_URL = "http://localhost:1337";

    // fetch(`${API_URL}/transactions`, {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }).then(response => {
    //   console.log(response)
    //   if (response.status === 500) {
    //     console.log('fail!')
    //     // setError('Error. Contact Number already exists in the database.')
    //   } else if (response.status === 200) {
    //     console.log('success!')
    //     // Router.push("/borrowers");
    //   }
    // });

  };
  // console.log(watch("example"));
  const borrowerOptions = borrowers.map(borrower => (
    {value: { id:borrower.id, name:borrower.name, address:borrower.address, contact_number:borrower.contact_number }, label: borrower.name }
  ))
  console.log(borrowerOptions)
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  return (
    <Layout>
    <div className="container">
    <h1>New Transaction</h1>
    <form onSubmit={handleSubmit(onSubmit)}>

    <div className="form-group">
    <label htmlFor="amount_borrowed">Amount to Borrow</label>
    <input type="number" className="form-control" name="amount_borrowed" placeholder="Amount" ref={register({ required: true })} />
    {errors.amount_borrowed && <span>This field is required</span>}
    </div>
    <Select options={options} />
    <div className="form-group">
    <label htmlFor="interest_rate">Interest Rate</label>
    <input type="number" className="form-control" name="interest_rate" placeholder="Interest Rate" ref={register({ required: true })} />
    {errors.interest_rate && <span>This field is required</span>}
    </div>

    <div className="form-group">
    <label htmlFor="borrower">Borrower</label>
    <input className="form-control" name="borrower" placeholder="Borrower" ref={register({ required: true })} />
    {errors.borrower && <span>This field is required</span>}
    </div>

    <div className="form-group">
    <label htmlFor="release_date">Release Date</label>
    <input className="form-control" name="release_date" placeholder="Release Date" ref={register({ required: true })} />
    {errors.release_date && <span>This field is required</span>}
    </div>

    <div className="form-group">
    <label htmlFor="schedules">Schedules</label>
    {/* <input className="form-control" name="schedules" placeholder="Sc" ref={register({ required: true })} /> */}
    {/* {errors.schedules && <span>This field is required</span>} */}
    </div>

    <p>{ error ? error : ''}</p>
    <input type="submit" className="btn btn-primary"/>
    </form>
    </div>

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


export default NewTransaction