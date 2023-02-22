import "./LandingBody.css";


const Body = () => {
    return ( 
        <div className="body">
            <body className="body-slide">
                <div className="slide-intro">
                    <h2 className="slide-title">
                        Hire the best freelancers for any job, online.
                    </h2>
                    <div className="slide-content">
                        <li>World's largest freelance marketplace</li>
                        <li>Any job you can possibly think of</li>
                        <li>Save up to 90% & get quotes for free</li>
                        <li>Pay only when you're 100% happy</li>
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
                                <img src="#" alt="#" />
                                <h5 >Post a job</h5>
                            </div>
                            <p>It’s free and easy to post a job. Simply fill in a title, description and budget and competitive bids come within minutes.</p>
                        </div>
                        <div className="tag">
                            <div className="tag-title">
                                <img src="#" alt="#" />
                                <h5 >Choose personnels</h5>
                            </div>
                            <p>No job is too big or too small. We've got freelancers for jobs of any size or budget, across 1800+ skills. No job is too complex. We can get it done!</p>
                        </div>
                        <div className="tag">
                            <div className="tag-title">
                                <img src="#" alt="#" />
                                <h5 >Pay Safelu</h5>
                            </div>
                            <p>Only pay for work when it has been completed and you're 100% satisfied with the quality using our milestone payment system.</p>
                        </div>
                        <div className="tag">
                            <div className="tag-title">
                                <img src="#" alt="#" />
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
                                <img src="#" alt="#" />
                                <h5 >Post a job</h5>
                            </div>
                            <p>It’s free and easy to post a job. Simply fill in a title, description and budget and competitive bids come within minutes.</p>
                        </div>
                        <div className="tag">
                            <div className="tag-title">
                                <img src="#" alt="#" />
                                <h5 >Choose personnels</h5>
                            </div>
                            <p>No job is too big or too small. We've got freelancers for jobs of any size or budget, across 1800+ skills. No job is too complex. We can get it done!</p>
                        </div>
                        <div className="tag">
                            <div className="tag-title">
                                <img src="#" alt="#" />
                                <h5 >Pay Safelu</h5>
                            </div>
                            <p>Only pay for work when it has been completed and you're 100% satisfied with the quality using our milestone payment system.</p>
                        </div>
                        <div className="tag">
                            <div className="tag-title">
                                <img src="#" alt="#" />
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