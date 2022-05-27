import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import axios from 'axios'
import './App.css';

export default function Success() {
  const [searchParams, setSearchParams] = useSearchParams();
  const writer_email = searchParams.get("writer_email")
  const secret_code = searchParams.get("secret_code")
  
  return (
    <>
      <main>
        <h2>Success, you've registered as a writer!</h2>
        <p>Next steps: <br/><br/>
         We just sent a <b>confirmation email with more info</b>! Check how long until the next writing period ends (it's in the email), <b>you'll have to send an update before then.</b> The writing period ends around the end of each month.<br/><br/>
          You'll get paid at the end of each month if you sent an update. Be careful, if you miss one update, you won't get paid and everyone will get an alert, giving them the option to unsubscribe. <br></br><br/>
          If you miss two consecutively, this subscription is <b>automatically permanently terminated</b>.<br/><br/>
          To send an email out, just send your content to dispatch@recompiled.fyi and it'll be forwarded to all your subscribers.<br/><br/>
          Payment is sent to your Stripe account, which you can access via <a href="/login">recompiled.fyi/login</a>. To see more of your account details, go there now :)
          
        </p>
        <a href="/"><p>Check out other writers!</p></a>
      </main>
    </>
  )
}