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
        <h2>Success, you've subscribed to a new newsletter!</h2>
        <p>You'll be receiving the next monthly letter to your inbox soon! We just sent a confirmation email - check that!</p>
        <p>You can check out your subscriptions at <a href="/login">recompiled.fyi/login</a>.</p>
        <a href="/"><p>Check out other writers!</p></a>
        <i><p>We're still working on a feature that lets you see old posts, that'll be out soon (maybe). If you want to help out on this project and build these features, feel free to reachout to will@depue.net.</p></i>
      </main>
    </>
  )
}