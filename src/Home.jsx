import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import axios from 'axios'
import './App.css';

export default function SubHome() {
  const [loading, setLoading] = useState(true);
  const [subs, setSubs] = useState([]);
  const [writer, setWriter] = useState({});
  const [token, setToken] = useState(null)

  async function verify() {
    let magic = new Magic("pk_live_6BA4B60F2C6A364C");

    const isLoggedIn = await magic.user.isLoggedIn();
    if (!isLoggedIn) {
      setLoading(false)
      return
    }
    const token = await magic.user.getIdToken({ lifespan: 90000 })
    setToken(token)
    console.log("is logged in", isLoggedIn)

    try {
      let subs = await axios.get('https://recompiled-production.up.railway.app/get-user?id=' + token)
      console.log(subs)
      setSubs(subs.data)
    } catch (e) {
      console.log(e)
    }

    try {
      let writer = await axios.get('https://recompiled-production.up.railway.app/get-writer?id=' + token)
      console.log(writer)
      setWriter(writer.data)
    } catch (e) {
      // setWriter({ done: true })
      console.log(e)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (subs.length == 0 && loading)
      verify()
  }, [subs])

  console.log(writer, loading, subs)
  if (token)
    return (
      <>
        <main>
          <h1>Welcome home!</h1>
          <div>
            <h2>Your subscriptions</h2>
            {subs.length > 0 &&
              subs.map((w, i) => {

                return (
                  <form id="cancelsub" key={i} action={'https://recompiled-production.up.railway.app/cancel-sub'} method="GET" style={{ marginTop: "15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "900px", maxHeight: "40px", border: "1px solid grey", padding: "5px", alignItems: "center" }}>
                      <p style={{ marginLeft: "4px" }}>Email: {w.email}</p>
                      <p style={{ marginLeft: "4px" }}>Desc: "{w.description}"</p>
                      <input type="text" readOnly name="id" value={token} hidden />
                      <input type="text" readOnly name="writer" value={w.email} hidden />
                      <button form="cancelsub">Cancel this Subscription!</button>
                    </div>
                  </form>
                )

              })
            }
            {subs.length == 0 && !loading &&
              <p>No subscriptions...</p>
            }
          </div>
          <div>
            <h2>Your newsletters</h2>
            <p>You can access your Stripe merchant account here: <a href="https://connect.stripe.com/express_login">Login to Stripe</a></p>
            {writer ?.email &&
              <form action="https://recompiled-production.up.railway.app/cancel-writer" method="GET" style={{ marginTop: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", width: "900px", maxHeight: "40px", border: "1px solid grey", padding: "5px", alignItems: "center" }}>
                  <input type="text" readOnly name="writer_email" value={writer.email} hidden />
                  <input type="text" readOnly name="secret_code" value={writer.secret_code} hidden />
                  <p style={{ marginLeft: "4px" }}>Email: {writer.email}</p>
                  <p style={{ marginLeft: "4px" }}>Desc: "{writer.description}"</p>
                  <p style={{ marginLeft: "4px" }}>Subs: {writer.subscribers.length}</p>
                  <input type="text" readOnly name="requestBool" value={"false"} hidden />
                  <button>Cancel this Newsletter!! DANGEROUS</button>
                </div>
              </form>
          }
            {!writer ?.email && !loading && <p>No newsletters...</p>}
          </div>

        </main>
      </>
    )
  else if (!loading)
    return (
      <>
        <main>
          <h2>Something is wrong...</h2>
          <p>Your token seems to be wrong.</p>
          <p>Please log in again</p>
          <a href="/login"><p>Login again</p></a>
        </main>
      </>
    )
  else
    return (
      <>
        <main>
          <h2>Loading...</h2>
        </main>
      </>
    )
}