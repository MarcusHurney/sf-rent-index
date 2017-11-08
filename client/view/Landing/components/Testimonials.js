import React from 'react';
import face1 from '../../../images/face1.png';
import face2 from '../../../images/face2.png';
import face3 from '../../../images/face3.jpg';

// const Testimonials = () => (
//   <section className="testimonials_container">
//     <div className="section-testimonials">
//       <div className="testimonials_header">
//         <h2>Testimonials</h2>
//         <p>Read what our beta testers have to say about SF Rent Index</p>
//       </div>
//
//       <div className="row">
//         <div className="col s12 l4">
//           <div className="row testimonial">
//             <div className="col s4 m4 l4">
//               <img src={face1} className="mario-image" />
//             </div>
//             <div className="col s8 m8 l8 quote-col">
//               <blockquote>
//                 <i className="small material-icons">format_quote</i>
//                 SFRentIndex is like Glassdoor for rental info. I feel so blind
//                 looking at rental prices accross the city without it. How do I
//                 know if the listings I see are higher or lower than what people
//                 are already paying?
//               </blockquote>
//               <hr className="testimonials-hr" />
//               <cite>&#8212; Oliver Townsend</cite>
//             </div>
//           </div>
//         </div>
//
//         <div className="col s12 l4">
//           <div className="row testimonial">
//             <div className="col s4 m4 l4">
//               <img src={face2} className="monice-image" />
//             </div>
//             <div className="col s8 m8 l8 quote-col">
//               <blockquote>
//                 <i className="small material-icons">format_quote</i>
// I used SFRentIndex to lock up my neighbor's rent in the inner
// sunsent. I quickly realized my neighbors were paying $400 per
// month less than me. I quickly brought this to my landlord's
// attention and reduced my rent.
//               </blockquote>
//               <hr className="testimonials-hr" />
//               <cite>&#8212; Csilla Nemeth</cite>
//             </div>
//           </div>
//         </div>
//
//         <div className="col s12 l4">
//           <div className="row testimonial">
//             <div className="col s4 m4 l4">
//               <img src={face3} className="monka-image" />
//             </div>
//             <div className="col s8 m8 l8 quote-col">
//               <blockquote>
//                 <i className="small material-icons">format_quote</i>
// My landlord raised my rent and justified it as a general market
// increase. He insisted that my neighbor's rent was also going up,
// so I asked them what they were paying. It turns out their rent
// was <span style={{ fontStyle: 'italic' }}>decreasing</span>.
// That was the inspiration behind SFRentIndex - to empower renters
// and landlords with accurate rent information.
//               </blockquote>
//               <hr className="testimonials-hr" />
//               <cite>&#8212; Varun Barhtia</cite>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </section>
// );

const Testimonials = () => (
  <div className="testimonials_container">
    <div className="content_gutter">
      <div className="testimonials_header">
        <h2>Testimonials</h2>
        <p>Read what our beta testers have to say about SF Rent Index</p>
      </div>

      <div className="testimonials_body columns">
        <div className="column">
          <div className="img_container">
            <img src={face1} />
          </div>

          <div className="quote_body">
            <blockquote>
              <i className="small material-icons">format_quote</i>
              SF Rent Index is like Glassdoor for rental info. I feel so blind
              looking at rental prices accross the city without it. How do I
              know if the listings I see are higher or lower than what people
              are already paying?
            </blockquote>

            <hr className="testimonials-hr" />
            <p>&#8212; Oliver Townsend</p>
          </div>
        </div>

        <div className="column">
          <div className="img_container">
            <img src={face2} />
          </div>

          <div className="quote_body">
            <blockquote>
              <i className="small material-icons">format_quote</i>
              I used SF Rent Index to lock up my neighbor's rent in the inner
              sunsent. I quickly realized my neighbors were paying $400 per
              month less than me. I quickly brought this to my landlord's
              attention and reduced my rent.
            </blockquote>

            <hr className="testimonials-hr" />
            <p>
              <span>&#8212;</span> Csilla Nemeth
            </p>
          </div>
        </div>

        <div className="column is-5">
          <div className="img_container">
            <img src={face3} />
          </div>

          <div className="quote_body">
            <blockquote>
              <i className="small material-icons">format_quote</i>
              My landlord recently justified an uptick in my monthly rent price
              as the result of a general market increase. He insured that
              neighbor's price would also rise, so I decided to check with them
              myself. It turns out their rent was{' '}
              <span style={{ fontStyle: 'italic' }}>decreasing</span>. This made
              me aware of a significant price desparity not only amongst renters
              in my neighborhood, but also within my same building!
            </blockquote>

            <hr className="testimonials-hr" />
            <p>&#8212; Varun Bhartia</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Testimonials;
