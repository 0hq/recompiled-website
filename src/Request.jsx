import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Flex from "./Flex"
import axios from 'axios'
import './App.css';

export default function Request() {
  const [searchParams, setSearchParams] = useSearchParams();
  const writer_email = searchParams.get("writer_email")
  const secret_code = searchParams.get("secret_code")

  return (
    <>
      <main>
        <h2>Have someone in mind?</h2>
        <p>Have someone you want monthly updates from?</p>
        <p>Invite them via their email + a description of what you’re looking for + pre-subscribe to this newsletter to encourage them to join!</p>
        <p>Here are the ground rules:<br />
          1. They send an update every month, shared with you and anyone else who subscribes.<br />
          2. You pay them 5$ at the end of each month.<br />
          3. If they miss one month, you’ll get notified with the chance to unsubscribe.<br />
          4. If they miss two consecutively, the subscription ends immediately.<br /></p>
        <form action="https://recompiled-production.up.railway.app/create-checkout-session" method="POST" >
          <div style={{ marginTop: "10px" }}>Email of receiver</div>
          <input type="text" id="writerForm" name="writerEmail" placeholder="Example: will@depue.net" size="40" />
          <div style={{ marginTop: "10px" }}>Description of content you're requesting:</div>
          <textarea type="text" id="descForm" name="descText" placeholder="Example: Send me your reading list every month!" rows="3" cols="40"></textarea>
          <input type="text" name="requestBool" readOnly value={"true"} hidden />
          <div style={{ marginTop: "10px" }}>The cost is a flat-rate $5/month per subscriber.</div>
          <button style={{ marginTop: "10px" }} id="basic-plan-btn">Let's do this!</button>
        </form>
      </main>
    </>
  )
}