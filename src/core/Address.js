import React, { useEffect, useState } from 'react'
import { isAuth } from '../helpers/auth'
import firebase from 'firebase'
import { toast, ToastContainer } from 'react-toastify'
import '../Styles/Address.css'

const SavedAddress = (props) => {
  const { address, landmark, hno } = props.address;

  return (
    <div className="address-card">
      <i class="fa fa-times" style={{color: "tomato", float: "right"}} />
      { address ? <p style={{fontWeight: "bold", minWidth: "150px"}}>{address} </p> : null }
      { hno ? <p>House {hno} </p> : null }
      { landmark ? <p>Landmark {landmark} </p> : null }
    </div>
  )
}

const Address = () => {
  const [userAddress, serUserAddress] = useState([])
  const db = firebase.firestore()
  const [values, setvalues] = useState({
    address: '',
    hno: '',
    landmark: ''
  })

  const { address, hno, landmark } = values

  useEffect(() => {
    serUserAddress([])
    db.collection('Users').doc(`${isAuth().id}`).collection('Address').get()
      .then(res => {
        const values = res.docs.map((a) => {
          console.log(a.data())
          return a.data()
        });
        serUserAddress(values)
      })
  }, [])

  const getaddress = () => {
    serUserAddress([])
    db.collection('Users').doc(`${isAuth().id}`).collection('Address').get()
      .then(res => {
        const values = res.docs.map((a) => {
          console.log(a.data())
          return a.data()
        });
        serUserAddress(values)
      })
  }

  const handleChange = (name) => e => {
    setvalues({ ...values, [name]: e.target.value })
  }

  const handlesubmit = () => {
    if (address) {
      db.collection('Users').doc(`${isAuth().id}`).collection('Address')
        .add({
          address: address,
          hno: hno,
          landmark: landmark
        }).then(() => {
          toast.success('Address Added !!!')
          getaddress()
          setvalues({ ...values, landmark: '', address: '', hno: '' })
        }).catch((err) => {
          toast.error('Something went wrong !!!')
        })
    } else {
      toast.error('Please Enter Address')
    }
  }

  return (
    <div className="update-form">
      <ToastContainer />
      <div className="saved-addresses">
      {
        userAddress && userAddress.map(item => {
          return <SavedAddress address={item} />
        })
      }
      </div>
      <div className="update-form-main">
        <div className="update-form-fields">
          <form>
            <input type="text"
              className="update-form-input"
              placeholder="Enter New Address"
              onChange={handleChange('address')}
              value={address}
            />
            <input type="text"
              className="update-form-input"
              placeholder="Enter house no."
              onChange={handleChange('hno')}
              value={hno}
            />
            <input type="text"
              className="update-form-input"
              placeholder="Enter landmark"
              onChange={handleChange('landmark')}
              value={landmark}
            />
            <div>
            </div>
            <button type="submit" className="update-form-button" onClick={handlesubmit}>Add</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Address;