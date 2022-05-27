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
        <h2>Success, your request has been sent!</h2>
        <p>They'll have 7 days to accept your request. If they don't accept, don't worry, you won't be charged anything :)</p>
        <p>You can check out your subscriptions at <a href="/login">recompiled.fyi/login</a>.</p>
        <a href="/"><p>Check out other writers!</p></a>
      </main>
    </>
  )
}