import React, { useState, useEffect } from 'react'
import '../Styles/notif.css'
import firebase from 'firebase'
import { isAuth } from '../helpers/auth'

const Notification = () => {
  const [res, setres] = useState([])
  const db = firebase.firestore()

  useEffect(() => {
    db.collection('Notifications').where('UserID', '==', `${isAuth().id}`).get()
      .then((res) => {
        res.forEach((doc) => {
          setres(a => [...a, { data: doc.data(), _id: doc.id }])
          console.log(doc.data())
        })
      })
  }, [])

  return (
    <div className='notif-div'>
      <h3>Notifications</h3>
      {
        res && res.map((notif, index) => {
          return (
            <div className='notif-card'>
              <h6><b>#{index+1} {notif.data.OrderID}</b></h6>
              <p> {notif.data.Notification} <br />
              Delivery Time is {notif.data.DeliveryTime} and total is {notif.data.GrandTotal} </p>
            </div>
          )
        })
      }
    </div>
  )
}

export default Notification;