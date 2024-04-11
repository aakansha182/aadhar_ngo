import React from 'react'
import   '../../../styles/contact/ContactStyle.css'

const Contact = () => {
  return (
    <section className="contact" id="contact">
      
      <form id="contactForm">
      <h2 className="contact-heading">
        Contact <span>Us</span>
        <span className="animate scroll" ></span>
      </h2>
        <div className="input-box">
          <div className="input-field">
            <input type="text" placeholder="Full Name" id="fullName" required />
            <span className="focus"></span>
          </div>
          <div className="input-field">
            <input type="text" placeholder="Email Address" id="email" required />
            <span className="focus"></span>
          </div>
        </div>

        <div className="input-box">
          <div className="input-field">
            <input type="number" placeholder="Mobile Number" id="mobileNumber" required />
            <span className="focus"></span>
          </div>
          <div className="input-field">
            <input type="text" placeholder="Email Subject" id="emailSubject" required />
            <span className="focus"></span>
          </div>
        </div>

        <div className="textarea-field">
          <textarea cols="30" rows="10" placeholder="Your Message" id="message" required></textarea>
          <span className="focus"></span>
        </div>

        <div className="btn-box btns">
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>

      <div id="confirmationMessage"></div>
    </section>
  )
}

export default Contact


{/* <div class="section-title text-center mb-75">
                    <h2>Quick Contact</h2>
                    <p class="section-2">There are many variations of azer duskam of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,</p>
                </div> */}



{/* <div class="row">
                    <div class="col-lg-12">
                        <div class="contact-title-form">
                            <div class="contact-title text-center">
                                <h3>Contact Form</h3>
                            </div>
                            <div class="leave-form">
                                <form id="contact-form" action="assets/mail.php" method="post">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <input name="name" placeholder="Name" type="text">
                                        </div>
                                        <div class="col-lg-6">
                                            <input name="email" placeholder="Email" type="email">
                                        </div>
                                        <div class="col-lg-12">
                                            <textarea name="message" placeholder="Message"></textarea>
                                        </div>
                                        <div class="col-lg-12 text-center">
                                            <button class="submit" type="submit">
                                                Send Now
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <p class="form-messege"></p>
                            </div>
                        </div>
                    </div>
                </div> */}