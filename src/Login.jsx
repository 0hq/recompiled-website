import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
// import { magic } from './Magic';
// import EmailForm from './email-form';
// import SocialLogins from './social-logins';

const Login = () => {
  let magic = new Magic("pk_live_6BA4B60F2C6A364C");
  
  async function go(e) {
      e.preventDefault();
      // const isLoggedIn = await magic.user.isLoggedIn();
      // if (isLoggedIn) {
      //   window.location.href = "/sub-home" 
      // } else
      console.log(e)
      const email = new FormData(e.target).get("email");
      console.log(email)
      if (email) {
        /* One-liner login 🤯 */
        console.log("magic")
        await magic.auth.loginWithMagicLink({ email });
        window.location.href = "/home"
      }
    }

  

  return (
      <main>
        <div id="app"></div>
        <form onSubmit={go}>
          <p>Type your email in for passwordless login:</p>
          <input type="email" name="email" required="required"></input>
          <button type="submit">Log In, with Email</button>
        </form>
      </main>
  );
};

export default Login;