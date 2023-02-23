import "./LandingBody.css";

const Body = () => {
    return ( 
        <div className="body">
            <body className="body-slide">
                <div className="slide-img"></div>
                <div className="slide-intro">
                    <h2 className="slide-title">
                        Hire the best candidate for any job, online.
                    </h2>
                    <div className="slide-content">
                        <li>Any IT position you can possibly think of</li>
                        <li>Professional, quality candidates</li>
                        <li>Pay only when you're 100% happy</li>
                        <li>Save up to 90% & get quotes for free</li>
                    </div>
                    <div className="slide-button">
                        <button className="btn btn-hire">Hire a Candidate</button>
                        <button className="btn btn-become">Become a Candidate</button>
                    </div>
                </div>
            </body>
            <div className="body-contents">
                <section className="body-content">
                    <h2 className="title">
                        For Enterprice
                    </h2>
                    <div className="tags">
                        <div className="tag">
                            <div className="tag-title">
                                <img src="/images/job.png" alt="" />
                                <h5 >Post a job</h5>
                            </div>
                            <p>It’s free and easy to post a job. Simply fill in a title, description and budget and competitive bids come within minutes.</p>
                        </div>
                        <div className="tag">
                            <div className="tag-title">
                                <img src="/images/choose-person.png" alt="" />
                                <h5 >Choose personnels</h5>
                            </div>
                            <p>No job is too big or too small. We have a team of highly qualified, thoroughly tested IT staff. No job is too complicated. We can get it done!</p>
                        </div>
                        <div className="tag">
                            <div className="tag-title">
                                <img src="/images/pay.png" alt="" />
                                <h5 >Pay Safely</h5>
                            </div>
                            <p>Only pay for work when it has been completed and you're 100% satisfied with the quality using our milestone payment system.</p>
                        </div>
                        <div className="tag">
                            <div className="tag-title">
                                <img src="/images/we-here.png" alt="" />
                                <h5 >We’re here to help</h5>
                            </div>
                            <p>Our talented team of recruiters can help you find the best IT personnel for the job and our technical co-pilots can even manage the project for you.</p>
                        </div>
                    </div>
                </section>

                <section className="body-content">
                    <h2 className="title">
                        For Candidate
                    </h2>
                    <div className="tags">
                        <div className="tag">
                            <div className="tag-title">
                                <img src="/images/job.png" alt="" />
                                <h5 >Discussion</h5>
                            </div>
                            <p>Have face-to-face meetings with experts to exchange assessments of your capacity and qualifications.</p>
                        </div>
                        <div className="tag">
                            <div className="tag-title">
                                <img src="/images/choose-person.png" alt="" />
                                <h5 >Course</h5>
                            </div>
                            <p>We have a self-study route, the knowledge required through each level. you can easily focus on studying and get to the level you want.</p>
                        </div>
                        <div className="tag">
                            <div className="tag-title">
                                <img src="/images/pay.png" alt="" />
                                <h5 >Pay Safely</h5>
                            </div>
                            <p>Only pay for work when it has been completed and you're 100% satisfied with the quality using our milestone payment system.</p>
                        </div>
                        <div className="tag">
                            <div className="tag-title">
                                <img src="/images/we-here.png" alt="" />
                                <h5 >We’re here to help</h5>
                            </div>
                            <p>Our talented team of recruiters can help you find the best IT personnel for the job and our technical co-pilots can even manage the project for you.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
     );
}
 
export default Body;