import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import axios from 'axios'
import './App.css';

export default function Register() {
  const [searchParams, setSearchParams] = useSearchParams();
  const writer_email = searchParams.get("writer_email")
  const secret_code = searchParams.get("secret_code")
  const [writer, setWriter] = useState({})

  useEffect(async () => {
    let writer = await axios.get('https://recompiled-production.up.railway.app/get-writer-via-secret?secret_code=' + secret_code + '&writer_email=' + writer_email)
    console.log(writer)
    setWriter(writer.data)
  }, [])

  function accept() {
    console.log("Accept")
    axios.post('https://recompiled-production.up.railway.app/onboard-user', {
      writer_email,
      secret_code
    }).then(function(response) {
      // handle success
      console.log(response);
      window.location.href = response.data.url;
    })
  }

  if (writer_email && secret_code && writer ?.description)
    return (
      <>
        <main>
          <h2>Someone wants you to write... for money!</h2>
          <p style={{ lineHeight: "28px" }}>Here's how it works:<br />
            (1) Someone likes what you do enough that they’ll pay you to talk about it.<br />
            (2) They’ve already pre-subscribed to pay you $5/month for a monthly newsletter.<br />
            (3) All you have to do is accept.</p>
          <p style={{ lineHeight: "28px", marginTop: "60px" }}>
            <b>Some details:</b><br />
            - Anytime, every month, you send an email to dispatch@recompiled.fyi<br />
            - You get paid $5 per subscriber end of each month. (minus taxes and stuff).<br />
            - You’ll need to make a Stripe account (by pressing that button below) to collect payment.<br />
            - <u>Don’t miss a month or your subscription gets canceled.</u> One miss is a warning, but two consecutively permanently ends the subscription. :(<br />
            - You can login here at recompiled.fyi/login to see more account details.<br />
          </p>
          <h3 style={{ marginTop: "60px" }}>Topic to talk about:</h3>
          <p>Description of newsletter: {writer.description}</p>

          <h3 style={{ marginTop: "60px" }}>Request info:</h3>
          <p>Requested email: {writer_email}</p>
          <p>Secret code (save this and don't share!!): {secret_code}</p>
          <p>Requested by: {writer.genesis_inviter}</p>
          <p style={{ marginTop: "40px" }}><b>Sound good to you?</b></p>
          <button onClick={accept}>Accept the offer and setup.</button>
        </main>
      </>
    )
  else
    return (
      <>
        <main>
          <h2>Something is wrong...</h2>
          <p>Your request link doesn't contain a writer email or secret code.</p>
          <p>Make sure you follow the correct link held in your email.</p>
          <a href="/"><p>Go home...</p></a>
        </main>
      </>
    )
}