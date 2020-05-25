import { useForm } from 'react-hook-form'
import Layout from "../../components/Layout";
import Head from 'next/head'
import { useState } from 'react'
import Router from "next/router";


const NewBorrower = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [error, setError] = useState()
  const onSubmit = data => {
    const API_URL = "http://localhost:1337";

    fetch(`${API_URL}/borrowers`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
      console.log(response)
      if (response.status === 500) {
        // console.log('fail!')
        setError('Error. Contact Number already exists in the database.')
      } else if (response.status === 200) {
        console.log('success!')
        Router.push("/borrowers");
      }
    });

  };
  // console.log(watch("example"));

  return (
    <Layout>
    <div className="container">
    <h1>Create a Borrower</h1>
    <form onSubmit={handleSubmit(onSubmit)}>

    <div className="form-group">
    <label htmlFor="name">Full Name</label>
    <input className="form-control" name="name" placeholder="Full Name" ref={register({ required: true })} />
    {errors.name && <span>This field is required</span>}
    </div>

    
    <div className="form-group">
    <label htmlFor="contact_number">Contact Number</label>
    <input className="form-control" name="contact_number" placeholder="Contact Number" ref={register({ required: true })} />
    {errors.contact_number && <span>This field is required</span>}
    </div>

    <div className="form-group">
    <label htmlFor="address">Address</label>
    <input className="form-control" name="address" placeholder="Address" ref={register({ required: true })} />
    {errors.address && <span>This field is required</span>}
    </div>
    <p>{ error ? error : ''}</p>
    <input type="submit" className="btn btn-primary"/>
    </form>
    </div>

    </Layout>
    
  )
}

export default NewBorrower