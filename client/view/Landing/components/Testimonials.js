import React from 'react';
import face1 from '../../../images/face1.jpg';
import face2 from '../../../images/face2.png';
import face3 from '../../../images/face3.png';

const Testimonials = () => (
  <section className="testimonials_container">
    <div className="section-testimonials">
      <h2 className="demo_hero">Testimonials</h2>
      <p className="lead under-heading">
        Read what others have to say about SF Rent Index
      </p>

      <div className="row">
        <div className="col s12 l4">
          <div className="row testimonial">
            <div className="col s4 m4 l4">
              <img src={face1} className="mario-image" />
            </div>
            <div className="col s8 m8 l8 quote-col">
              <blockquote>
                <i className="fa fa-quote-left" />Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </blockquote>
              <hr className="testimonials-hr" />
              <cite>&#8212; Mario, successful tree planter</cite>
            </div>
          </div>
        </div>

        <div className="col s12 l4">
          <div className="row testimonial">
            <div className="col s4 m4 l4">
              <img src={face2} className="monice-image" />
            </div>
            <div className="col s8 m8 l8 quote-col">
              <blockquote>
                <i className="fa fa-quote-left" />Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </blockquote>
              <hr className="testimonials-hr" />
              <cite>&#8212; Ashley, successful tree planter</cite>
            </div>
          </div>
        </div>

        <div className="col s12 l4">
          <div className="row testimonial">
            <div className="col s4 m4 l4">
              <img src={face3} className="monka-image" />
            </div>
            <div className="col s8 m8 l8 quote-col">
              <blockquote>
                <i className="fa fa-quote-left" />Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </blockquote>
              <hr className="testimonials-hr" />
              <cite>&#8212; Rebecca, successful tree planter</cite>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Testimonials;
