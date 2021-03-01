import React from 'react'
import cover from '../../Assests/cover-1.jpg'
import './StaticPage.css'

function AboutUs() {
  return (
    <div className='static-page'>
      <h1>About Us</h1>
      <img src={cover} />
      <p>
      Once upon the floors of Mister Idli, the CEO decided to take a filter coffee break with some Podi Idli. What he came up along with the aroma of filter coffee was the idea of Angadi.
      <br /> After a lot of discussion and conversations, Angadi was all set to rock among the South Indian food lovers of UAE. Today, we are the best e-commerce website in UAE that serves authentic Nanjil Nadu cuisines piping hot at your doorstep. Right from the DIY menu to the nostalgic items, breakfast, dinner, snacks and side dish, we have grown to serve all type of delicious South Indian foods.
      </p>
      <h3>From The House Of Mister Idli</h3>
      <p>
      Angadi from the house of Mister Idli is a celebration of South Indian culinary delights. Mister Idli has long established as the best south Indian restaurant in UAE that serves famed grandma recipes. Our patrons wanted us to extend our services to all over UAE, and hence we gave birth to Angadi.
      </p>
      <h3>A Journey Through The NanjilNadu Cuisines</h3>
      <p>
      Mostly seen in Nagercoil till the Kanyakumari belt, the NanjilNaadu cuisine is heavily influenced by Kerala cuisine, in terms of taste as well as preparation. Angadispecialises in delivering the delicious NanjilNaadu cuisines with a distinctive flavour. Besides, cuisines served from us are processed without preservatives and taste enhancers
      <br /> Angadi is the celebration of South Indian cuisines. Come and take part in this celebration by enjoying the goodness of homely South Indian Cuisines from Angadi.
      </p>
    </div>
  );
}

export default AboutUs;