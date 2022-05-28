import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

export default function Home() {
  const [writers, setWriters] = useState(null);

  useEffect(() => {
    async function getWriters() {
      if (writers) {
        return
      }
      console.log("getWriters");
      return await axios.get('https://recompiled-production.up.railway.app/get-writers')
        .then(function (response) {
          // handle success
          console.log(response);
          console.log(response.data.sort(function(a, b){return b.subscribers - a.subscribers}))
          setWriters(response.data.sort(function(a, b){return b.subscribers - a.subscribers}))
        })
    }
    getWriters()
  }, [writers])



  async function subscribe(email, desc) {
    console.log(email, desc)
    var bodyFormData = new FormData();
    bodyFormData.append("writerEmail", email);
    bodyFormData.append("descText", desc);
    let done = await axios.post('https://recompiled-production.up.railway.app/create-checkout-session', bodyFormData)
    console.log(done)
  }
  
  return (
    <>
      <main>
        <h1>An incentive platform for builders too busy to write.</h1>
        <p><b>For creators:</b></p>
        <p>Get compensated for sharing monthly updates about what you’re already doing, funded by your peers.<br/> To create an account, someone must request you first. <u>Send them this link.</u><br/> </p>
        <p>Have an account? <a href="/login">Login here.</a></p>
        <p><b>For subscribers:</b></p>
        <p>Pay $5 monthly to someone incredible.  <br/>
Get updates. Ask questions. Access opportunity.   <br/><br/>

Have someone in mind?  <a href="/request">Invite them to share.</a></p>
          <h2 style={{marginTop: "30px"}}>Check out some of our writers:</h2>
        {Boolean(writers?.length) &&
          writers.map((w, i) => {
            return (
              <form key={i} action="https://recompiled-production.up.railway.app/create-checkout-session" method="POST" style={{marginTop: "15px", overflow: "auto", display: "flex", justifyContent: "space-between", width: "800px", maxHeight: "300px", border: "1px solid grey", padding: "15px", flexDirection: "column"}}>
                  <input type="text" readOnly name="writerEmail" value={w.email} hidden/>
                  <input type="text" readOnly name="descText" value={w.description} hidden/>
                  <input type="text" readOnly name="requestBool" value={"false"} hidden />
                  <p style={{marginTop:"0px"}}>Email: {w.email}</p>
                  <p >Subs: {w.subscribers}</p>
                  <div style={{overflow: "auto"}}><p>Desc: "{w.description}"</p>
                    </div>
      
                  <button style={{width: "200px", marginTop: "5px", fontFamily: "monospace"}}>Subscribe</button>
              </form>
            )
          })
        }
        {!Boolean(writers?.length) && <p>No available writers...</p>}
        
      </main>
    </>
  )
}