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
    <div>
      {JSON.stringify(res)}
    </div>
  )
}

export default Notification;