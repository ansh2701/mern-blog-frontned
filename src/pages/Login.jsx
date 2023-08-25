import React from 'react'
import { Form, redirect, useFetcher } from 'react-router-dom'


export async function loginAction({request}) {
  const data = await request.formData()
  const values = Object.fromEntries(data)
  const response = await fetch('http://localhost:4000/login' , {
    method : "POST",
    body : JSON.stringify(values),
    headers : {'Content-Type' : 'application/json'},
    credentials : 'include',
  })

  if (response.ok){
    return redirect("/")
  }

  alert("Wrong Credentials!")
  return  null
  
}

const Login = () => {
  const fetcher = useFetcher()
  const submitting = fetcher.state === "submitting"
  return (
    <fetcher.Form method='post' className='login'>
        <h1>Login</h1>
        <input type='text' name='username' placeholder='username'/>
        <input type="password" name='password' placeholder='password' />
        <button type='submit'disabled={submitting}>{submitting ? "Submitting...":"Login" }</button>
    </fetcher.Form>
  )
}

export default Login