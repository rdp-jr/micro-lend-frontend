import { useForm } from 'react-hook-form'
import Layout from "../components/Layout";
import Head from 'next/head'
import { useState } from 'react'
import Router from "next/router";
import Select from 'react-select'
import moment from 'moment'


const NewTransaction = ({borrowers}) => {

  // console.log(borrowers)


  const { register, handleSubmit, watch, errors } = useForm();
  const [error, setError] = useState()
  const [day, setDay] = useState('01')
  const getReleaseDate = () => {
    let month = '12'
    // let day = '15'
    return `${moment().format('YYYY')}-${month}-${day}`
  }

  const handleDayClick = (parameter) => (event) => {
    event.preventDefault()
    setDay(parameter)

  }
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

  const borrowerOptions = borrowers.map(borrower => (
    {value: { ...borrower }, label: borrower.name }
  ))
  // console.log(borrowerOptions)
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
    

    <div className="form-group">
    <label htmlFor="interest_rate">Interest Rate</label>
    <input className="form-control" name="interest_rate" placeholder="Interest Rate" ref={register({ required: true })} />
    {errors.interest_rate && <span>This field is required</span>}
    </div>

    <div className="form-group">
    <label htmlFor="borrower">Borrower</label>
    <Select options={borrowerOptions} name="borrower"/>
    
    {errors.borrower && <span>This field is required</span>}
    </div>

    <div className="form-group">
    <label htmlFor="release_date">Release Date</label>

   
    <p>{moment(getReleaseDate(), "YYYY-MM-DD").format('LL')}</p>

    <div className="btn-group" role="group">
      <button className="btn btn-primary">Jan</button>
      <button className="btn btn-primary">Feb</button>
      <button className="btn btn-primary">Mar</button>
      <button className="btn btn-primary">Apr</button>


      <div className="btn-group" role="group">
      <button className="btn btn-primary">Jan</button>
      <button className="btn btn-primary">Feb</button>
      <button className="btn btn-primary">Mar</button>
      <button className="btn btn-primary">Apr</button>

      <div className="dropdown-menu">
      <button className="btn btn-primary">Jan</button>
      <button className="btn btn-primary">Feb</button>
      <button className="btn btn-primary">Mar</button>
      <button className="btn btn-primary">Apr</button>
    </div>

    </div>


    

    </div>

    
    <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
  <button type="button" class="btn btn-secondary">1</button>
  <button type="button" class="btn btn-secondary">2</button>

  <div className="btn-group" role="group">
    <button id="btnGroupDrop1" type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Dropdown
    </button>

    <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
      {/* <a className="dropdown-item" href="#">Dropdown link</a>
      <a className="dropdown-item" href="#">Dropdown link</a> */}
      <button className="dropdown-item  btn-primary">Jan</button>
      <button className="dropdown-item btn btn-primary">Feb</button>
      <button className="dropdown-item btn btn-primary">Mar</button>
      <button className="dropdown-item btn btn-primary">Apr</button>

      {/* <button className="btn btn-primary">Jan</button>
      <button className="btn btn-primary">Feb</button>
      <button className="btn btn-primary">Mar</button>
      <button className="btn btn-primary">Apr</button>

      <button className="btn btn-primary">Jan</button>
      <button className="btn btn-primary">Feb</button>
      <button className="btn btn-primary">Mar</button>
      <button className="btn btn-primary">Apr</button> */}
    </div>
    
  </div>

  

</div>

  


    <button onClick={handleDayClick('01')} className={day === "01" ? "btn btn-primary active" : "btn btn-primary"}>1</button>
    <button onClick={handleDayClick('15')} className={day === "15" ? "btn btn-primary active" : "btn btn-primary"}>15</button>

    <input name="release_date" hidden defaultValue={getReleaseDate()} ref={register({ required: true })}/>
    
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