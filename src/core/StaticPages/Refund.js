import React from 'react'
import cover from '../../Assests/cover-2.png'
import './StaticPage.css'

function Refund() {
  return (
    <div className='static-page'>
      <h1>Refund & Delivery Policy</h1>
      <img src={cover} />
      <p>
      <br /> •	You have to be physically present in the delivery address to collect the items.
      <br /> •	In case, if you come across any unexpected last-minute emergency kindly inform us to whom and where we can deliver the products.
      <br /> •	You have to inform 7 hours before delivery about the change in address.
      <br /> •	We won’t guarantee delivery for any last-minute changes.
      <br /> •	If its a workplace, where there is a chance for the denial of entry, kindly give acknowledgement to us for delivering the items to the security.
      <br /> •	We don’t practice any returns or refunds.
      <br /> •	We are providing free delivery to Sharjah and Ajman for a minimum order of 50 AED.
      <br /> •	We charge a delivery fee of 15 AED for a minimum order of 100 Dirhams from Dubai and 10 AED for a minimum order of 75 Dirhams from Umm Al Quwain.
      <br /> •	We provide safe delivery of the products without any damages. However, if any damage occurs from our side for the package, we will bear the compensation. We are not accountable for the damage caused by the customer.
      <br /> •	If there happens delay because of unforeseen circumstances, we don’t provide any compensation or refund.

      </p>
    </div>
  );
}

export default Refund;