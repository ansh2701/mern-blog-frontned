import React from 'react'
import { Form, redirect, useFetcher } from 'react-router-dom'


export async function registerAction({request}) {
    const data = await request.formData()
    const values = Object.fromEntries(data)
    try{
    await fetch('http://localhost:4000/register' , {
      method : "POST",
      body : JSON.stringify(values),
      headers : {'Content-Type' : 'application/json'}
    })}catch(err){
      console.log(err)
    }
    return redirect("/login")
}

const Register = () => {
  const fetcher = useFetcher()
  const submitting = fetcher.state === "submitting"
  return (
    <fetcher.Form method='post' className='register'>
        <h1>Register</h1>
        <input type='text' name='username' placeholder='username'/>
        <input type="password" name='password' placeholder='password' />
        <button type='submit' disabled={submitting}>{submitting ? "Submitting...":"Register" }</button>
    </fetcher.Form>
  )
}

export default Register