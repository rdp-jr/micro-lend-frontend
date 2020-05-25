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
  const [month, setMonth] = useState(moment().format('MM'))
  // const [schedules, setSchedules] = useState()
  // console.log(moment().format('MM'))
  const getReleaseDate = () => {
    // let month = '12'
    // let day = '15'
    let addMonth = moment.duration(1, 'm')
    // let releaseDate = `${moment().format('YYYY')}-${month}-${day}`
    // console.log(moment(releaseDate, "YYYY-MM-DD").add(1, 'months').format('LL'))
    // moment(getReleaseDate(), "YYYY-MM-DD").format('LL')

    return `${moment().format('YYYY')}-${month}-${day}`
  }

  const getDay = (num) => {

  }

  const getSchedules = () => {
    // const releaseDate = 

    const releaseDate = moment(`${moment().format('YYYY')}-${month}-${day}`, "YYYY-MM-DD")
    // console.log(releaseDate)
    let schedules = []
    console.log(day)
    if (day === '01') {
      console.log('ASDASD')
      let first = moment(releaseDate).date(15)
      let second = moment(releaseDate).add(1, 'months')
      let third = moment(second).date(15)
      let fourth = moment(second).add(1, 'months')
      // first.date(5)
      // console.log(first)
      schedules = [first, second, third, fourth]
    } else {
      // let first = moment(releaseDate).date(15)
      let first = moment(releaseDate).add(1, 'months').date(1)
      let second = moment(first).date(15)
      let third = moment(first).add(1, 'months')
      let fourth = moment(third).date(15)

      schedules = [first, second, third, fourth]
      // schedules = [releaseDate.add(1, 'months').day(1), releaseDate.add(1, 'months'), releaseDate.add(2, 'months'), releaseDate.add(2, 'months').day(15)]
    }

    // console.log(schedules)
    return schedules
    
  }

  const handleDayClick = (parameter) => (event) => {
    event.preventDefault()
    setDay(parameter)
    // getSchedules()

  }

  const handleMonthClick = (parameter) => (event) => {
    event.preventDefault()
    setMonth(parameter)
    // getSchedules()
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

    <ol>
      {getSchedules().map(schedule => (<li key={Math.random()}>{moment(schedule, "YYYY-MM-DD").format('LL')}</li>))}
    </ol>

      <div className="btn-group mr-2" role="group">
        <button onClick={handleMonthClick('01')} className={month === "01" ? "btn btn-primary active" : "btn btn-primary"}>Jan</button>
        <button onClick={handleMonthClick('02')} className={month === "02" ? "btn btn-primary active" : "btn btn-primary"}>Feb</button>
        <button onClick={handleMonthClick('03')} className={month === "03" ? "btn btn-primary active" : "btn btn-primary"}>Mar</button>
        <button onClick={handleMonthClick('04')} className={month === "04" ? "btn btn-primary active" : "btn btn-primary"}>Apr</button>
      </div>

      <div className="btn-group mr-2" role="group">
        <button onClick={handleMonthClick('05')} className={month === "05" ? "btn btn-primary active" : "btn btn-primary"}>May</button>
        <button onClick={handleMonthClick('06')} className={month === "06" ? "btn btn-primary active" : "btn btn-primary"}>Jun</button>
        <button onClick={handleMonthClick('07')} className={month === "07" ? "btn btn-primary active" : "btn btn-primary"}>Jul</button>
        <button onClick={handleMonthClick('08')} className={month === "08" ? "btn btn-primary active" : "btn btn-primary"}>Aug</button>
      </div>

      <div className="btn-group mr-2" role="group">
        <button onClick={handleMonthClick('09')} className={month === "09" ? "btn btn-primary active" : "btn btn-primary"}>Sep</button>
        <button onClick={handleMonthClick('10')} className={month === "10" ? "btn btn-primary active" : "btn btn-primary"}>Oct</button>
        <button onClick={handleMonthClick('11')} className={month === "11" ? "btn btn-primary active" : "btn btn-primary"}>Nov</button>
        <button onClick={handleMonthClick('12')} className={month === "12" ? "btn btn-primary active" : "btn btn-primary"}>Dec</button>
      </div>

    

    <div className="btn-group" role="group">
      <button onClick={handleDayClick('01')} className={day === "01" ? "btn btn-primary active" : "btn btn-primary"}>1</button>
      <button onClick={handleDayClick('15')} className={day === "15" ? "btn btn-primary active" : "btn btn-primary"}>15</button>
      </div>
      <input name="release_date" hidden defaultValue={getReleaseDate()} ref={register({ required: true })}/>
      
      {errors.release_date && <span>This field is required</span>}
      {/* <button onClick={handleConfirm}>Confirm</button> */}
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