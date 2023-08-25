import React from "react";
import { Form, Link, NavLink, useLoaderData } from "react-router-dom";

export async function navbarLoader() {
  try {
    const res = await fetch("http://localhost:4000/profile", {
      credentials: "include",
    });
    const userInfo = await res.json();
    return userInfo;
  } catch (err) {
    throw new Error("Server error , Try again later!")
  }
}

const Navbar = () => {
  const userInfo = useLoaderData();
  console.log(userInfo);

  return (
    <header>
      <Link to="/" className="logo">
        {" "}
        My Blog
      </Link>
      <nav>
        {userInfo?.username ? (
          <>
            <NavLink to="/create">Create new post</NavLink>
            <Form method="post" action="/logout">
            <button type="submit">Logout ({userInfo.username})</button>
            </Form>
          </>
        ):
        <>
          <NavLink to="login">Login</NavLink>
          <NavLink to="register">Register</NavLink>
        </>
         } 
      </nav>
    </header>
  );
};

export default Navbar;
