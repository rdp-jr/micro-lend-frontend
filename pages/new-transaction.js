import { useForm } from 'react-hook-form'
import Layout from "../components/Layout";
import Head from 'next/head'
import { useState } from 'react'
import Router from "next/router";
import Select from 'react-select'
import moment from 'moment'


const NewTransaction = ({borrowers}) => {

  const { register, handleSubmit, watch, errors } = useForm();
  const [error, setError] = useState()
  
  const currMoment = moment()

  let releaseDate = moment()
  if (releaseDate.date() >= 1 && releaseDate.date() < 16) {
    releaseDate.date(15)
  } else {
    releaseDate.add(1, "months").date(1)
  }

  const [rDate, setRDate] = useState(releaseDate)
  const [borrower, setBorrower] = useState(null)
  
  const getSchedules = () => {
    
    let schedules = []
    if (rDate.date() === 1) {
      let first = rDate.clone().date(15)
      let second = rDate.clone().add(1, 'months')
      let third = rDate.clone().add(1, 'months').date(15)
      let fourth = rDate.clone().add(2, 'months')
      
      schedules = [first, second, third, fourth]

    } else {
     
      let first = rDate.clone().add(1, 'months').date(1)
      let second = rDate.clone().add(1, 'months').date(15)
      let third = rDate.clone().add(2, 'months').date(1)
      let fourth = rDate.clone().add(2, 'months').date(15)

      schedules = [first, second, third, fourth]
      
    }

   
    return schedules
    
  }
  const handleSelect = selectedOption => {
    setBorrower(selectedOption)
  }

  const handleDayClick = e => {
    e.preventDefault()
    
    const value = e.target.value
   
    if (rDate.date() !== parseInt(value)) {
      setRDate(prevState => prevState.clone().date(value))
    }
  }

  const handleMonthClick = e => {
    e.preventDefault()
    const value = e.target.value
    
    if (currMoment.month() === parseInt(value)) {
      

      if (currMoment.date() > 1 && currMoment.date() < 16) {
        setRDate(prevState => prevState.clone().month(value).date(15))
      }
    }

    else if (rDate.month() !== parseInt(value)) {
      setRDate(prevState => prevState.clone().month(value))
    }
  }
  
  const onSubmit = data => {
    data['schedules'] = getSchedules().map(schedule => schedule.format('YYYY-MM-DD'))
    data['borrower'] = borrower['value']
      // getSchedules().map(schedule => (<li key={Math.random()}>{schedule.format('LL')}</li>))
    
    console.log(data)

    const API_URL = "http://localhost:1337";

    fetch(`${API_URL}/transactions`, {
      method: "POST",
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
        Router.push("/transactions");
      }
    });

  };

  

  const borrowerOptions = borrowers.map(borrower => (
    {value: { ...borrower }, label: borrower.name }
  ))

  const getButtonClassName = (num) => {
    return `btn btn-primary ${rDate.month() === num ? "active" : ""}`
  }

  const getButtonClassNameDate = (num) => {
    return `btn btn-primary ${rDate.date() === num ? "active" : ""}`
  }

  const getButtonDisableFlag = (num) => {
    if (currMoment.isSame(moment(num + 1, 'MM'), 'month')) {
      return currMoment.date() >= 16
    }
    return currMoment.isAfter(moment(num + 1, 'MM'))
  }

  const getButtonDisableFlagDate = () => {
    if (currMoment.isSame(rDate, 'month')) {
      return currMoment.date() > 1 
    }
    
    return false
  }

  return (
    <Layout>
    <div className="container">
    
    <h1>{currMoment.format('LL')}</h1>
    
    <h1>{rDate.format('LL')}</h1>
    <h1>New Transaction</h1>
    <form onSubmit={handleSubmit(onSubmit)}>

    <div className="form-group">
    <label htmlFor="amount_borrowed">Amount to Borrow</label>
    <input type="number" className="form-control" name="amount_borrowed" placeholder="Amount" step="1000" ref={register({ required: true })} />
    {errors.amount_borrowed && <span>This field is required</span>}
    </div>
    

    <div className="form-group">
    <label htmlFor="interest_rate">Interest Rate</label>
    <input type="number" className="form-control" name="interest_rate" placeholder="Interest Rate" ref={register({ required: true })} />
    {errors.interest_rate && <span>This field is required</span>}
    </div>

    <div className="form-group">
    <label htmlFor="borrower">Borrower</label>
    <Select options={borrowerOptions} name="borrower" instanceId={1} className="z-above" value={borrower} onChange={handleSelect}/>
    
    {errors.borrower && <span>This field is required</span>}
    </div>

    <div className="form-group">
    <label htmlFor="release_date">Release Date</label>

      <div className="btn-group mr-2" role="group">
        <button  onClick={handleMonthClick} value={0} className={getButtonClassName(0)} disabled={getButtonDisableFlag(0)}>Jan</button>
        <button onClick={handleMonthClick} value={1} className={getButtonClassName(1)} disabled={getButtonDisableFlag(1)}>Feb</button>
        <button onClick={handleMonthClick} value={2} className={getButtonClassName(2)} disabled={getButtonDisableFlag(2)}>Mar</button>
        <button onClick={handleMonthClick} value={3} className={getButtonClassName(3)} disabled={getButtonDisableFlag(3)}>Apr</button>
      </div>

      <div className="btn-group mr-2" role="group">
        <button onClick={handleMonthClick} value={4} className={getButtonClassName(4)} disabled={getButtonDisableFlag(4)}>May</button>
        <button onClick={handleMonthClick} value={5} className={getButtonClassName(5)} disabled={getButtonDisableFlag(5)}>Jun</button>
        <button onClick={handleMonthClick} value={6} className={getButtonClassName(6)} disabled={getButtonDisableFlag(6)}>Jul</button>
        <button onClick={handleMonthClick} value={7} className={getButtonClassName(7)} disabled={getButtonDisableFlag(7)}>Aug</button>
      </div>

      <div className="btn-group mr-2" role="group">
        <button onClick={handleMonthClick} value={8} className={getButtonClassName(8)} disabled={getButtonDisableFlag(8)}>Sep</button>
        <button onClick={handleMonthClick} value={9} className={getButtonClassName(9)} disabled={getButtonDisableFlag(9)}>Oct</button>
        <button onClick={handleMonthClick} value={10} className={getButtonClassName(10)} disabled={getButtonDisableFlag(10)}>Nov</button>
        <button onClick={handleMonthClick} value={11} className={getButtonClassName(11)} disabled={getButtonDisableFlag(11)}>Dec</button>
      </div>

    

    <div className="btn-group" role="group">
      <button onClick={handleDayClick} value={1} className={getButtonClassNameDate(1)} disabled={getButtonDisableFlagDate()}>1</button>
      <button onClick={handleDayClick} value={15} className={getButtonClassNameDate(15)}>15</button>
    </div>
      <input name="release_date" readOnly defaultValue={rDate.format('YYYY-MM-DD')} ref={register({ required: true })} hidden/>
      
      {errors.release_date && <span>This field is required</span>}
      
    </div>

    <div className="form-group">
    <label htmlFor="schedules">Schedules</label>
    <ol>
      {/* {getSchedules().map(schedule => (<li key={Math.random()}>{moment(schedule, "YYYY-MM-DD").format('LL')}</li>))} */}
      {getSchedules().map(schedule => (<li key={Math.random()}>{schedule.format('LL')}</li>))}
    </ol>
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