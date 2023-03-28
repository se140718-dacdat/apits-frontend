import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Contract.css'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React, { Fragment, useState } from 'react'

const Contract = () => {
    const [isShowPopup, setIsShowPopup] = useState(true);

    const Contract = () => {
        return (
            <div id='Contract'>
                <div className="layer" onClick={() => setIsShowPopup(false)}></div>
                <div className="pages">
                    <div className="page-size page__1">
                        <div className="centered">
                            <h3>EMPLOYMENT CONTRACT AGREEMENT</h3>
                        </div>
                        <h5>PARTIES</h5>
                        <p>-	This Employment Contract Agreement (hereinafter referred to as the “Agreement”) is entered into on <input type='text' className='input-w130 input-text' /> (the “Effective Date”), by and between <input type='text' className='input-w130 input-text' />, with an address of <input type='text' className='input-w200 input-text' /> (hereinafter referred to as the “Employer”), and <input type='text' className='input-w130 input-text' />, with an address of <input type='text' className='input-w200 input-text' /> (hereinafter referred to as the “Employee”) (collectively referred to as the “Parties”).</p>
                        <h5>DUTIES AND RESPONSIBILITIES</h5>
                        <p>-	During the employment period, the Employee shall have the responsibility to perform the following duties:<br />
                            1.	<input type='text' className='input-w400 input-text' /><br />
                            2.	<input type='text' className='input-w400 input-text' /><br />
                            3.	<input type='text' className='input-w400 input-text' /><br />
                            4.	<input type='text' className='input-w400 input-text' /><br />
                            5.	<input type='text' className='input-w400 input-text' /><br />
                            6.	<input type='text' className='input-w400 input-text' /><br />
                            7.	<input type='text' className='input-w400 input-text' /><br />
                            8.	<input type='text' className='input-w400 input-text' /><br />
                            9.	<input type='text' className='input-w400 input-text' /><br />
                            10.	<input type='text' className='input-w400 input-text' /><br />
                            <br />
                            -	The Parties agree that any responsibilities provided in this Agreement may not be assigned to any other party unless both parties agree to the assignment in writing
                        </p>
                        <h5>PAY AND COMPENSATION</h5>
                    </div>

                    <div className="page-size page__2">
                        <p>-	The Parties hereby agree that the Employer will pay the Employee an annual salary of <input type='text' className='input-w130 input-text' /> payable semi-monthly and subject to regular deductions and withholdings as required by law.</p>
                        <p>-	Whereas the Parties also agree that annual salary may be increased annually by an amount as may be approved by the Employer and, upon such increase, the increased amount shall thereafter be deemed to be the annual salary for purposes of this Agreement.</p>
                        <h5>BENEFITS</h5>
                        <p>-	The Parties hereby agree that the Employee shall receive the benefits (Insurance, Holiday and Vacation) provided by the Employer as indicated below.<br />
                            1.	<input type='text' className='input-w300 input-text' /><br />
                            2.	<input type='text' className='input-w300 input-text' /><br />
                            3.	<input type='text' className='input-w300 input-text' /><br />
                        </p>
                        <h5>WORKING HOURS AND LOCATION</h5>
                        <p>-	The Employee agrees that he/she will be working from <input type='text' className='input-w130 input-text' />to <input type='text' className='input-w130 input-text' /> (Monday to Friday), with a <input type='text' className='input-w130 input-text' />lunch break.<br />
                            -	In particular, the Employee agrees that he/she will work on average <input type='text' className='input-w200 input-text' /> hours per week.<br />
                            -	The Employee’s place of work shall be located in <input type='text' className='input-w130 input-text' /> or such other location as the Parties may agree upon from time to time.<br />
                        </p>
                        <h5>TERMs OF AGREEMENT</h5>
                        <p>-	This Agreement shall be effective on the date of signing this Agreement and will end on <input type='text' className='input-w200 input-text' />.<br />
                            -	Upon the end of the term of the Agreement, this Agreement will not be automatically renewed for a new term.<br />
                        </p>


                    </div>

                    <div className="page-size page__3">
                        <h5>TERMINATION</h5>
                        <p>-	This Agreement may be terminated in case the following occurs:</p>
                        <p>1.	Immediately in case one of the Parties breaches this Agreement.<br />
                            2.	At any given time by providing a written notice to the other party <input type='text' className='input-w200 input-text' /> days prior to terminating the Agreement.<br />
                            -	Upon terminating this Agreement, the Employee will be required to return all Employer’s materials, products or any other content at his/her earliest convenience, but not beyond <input type='text' className='input-w200 input-text' /> days.</p>
                        <h5>CONFIDENTIALITY </h5>
                        <p>-	All terms and conditions of this Agreement and any materials provided during the term of the Agreement must be kept confidential by the Employee, unless the disclosure is required pursuant to process of law. <br />
                            -	Disclosing or using this information for any purpose beyond the scope of this Agreement, or beyond the exceptions set forth above, is expressly forbidden without the prior consent of the Employer.
                        </p>
                        <h5>INTELLECTUAL PROPERTY</h5>
                        <p>-	Hereby, the Employee agrees that any intellectual property provided to him/her by the Employer will remain the sole property of the Employer including, but not limited to, copyrights, patents, trade secret rights, and other intellectual property rights associated with any ideas, concepts, techniques, inventions, processes, works of authorship, Confidential Information or trade secrets. </p>
                        <h5>EXCLUSIVITY</h5>
                        <p>-	The Parties agree that this Agreement is not an exclusive arrangement and that the Employer is entitled to enter into other similar agreements with other employees.<br />
                        </p>

                    </div>

                    <div className="page-size page__4">
                        <p>-	However, the Employee is not entitled to enter into a similar agreement as long as he/she remains a party to this Agreement.</p>
                        <h5>LIMITATION OF LIABILITY</h5>
                        <p>-	In no event shall the Employer nor the Employee be individually liable for any damages for breach of duty by third parties, unless the Employer’s or Employee’s act or failure to act involves intentional misconduct, fraud, or a knowing violation of the law.</p>
                        <h5>SEVERABILITY</h5>
                        <p>-	In an event where any provision of this Agreement is found to be void and unenforceable by a court of competent jurisdiction, then the remaining provisions will remain to be enforced in accordance with the Parties’ intention.</p>
                        <h5>GOVERNING LAW</h5>
                        <p>-	This Agreement shall be governed by and construed in accordance with the laws of <input type='text' className='input-w200 input-text' />.</p>
                        <h5>ALTERNATIVE DISPUTE RESOLUTION</h5>
                        <p>-	Any dispute or difference whatsoever arising out of or in connection with this Agreement shall be submitted to <input type='text' className='input-w200 input-text' /> (Arbitration/mediation/negotiation) in accordance with, and subject to the laws of <input type='text' className='input-w200 input-text' />.</p>
                        <h5>ATTORNEY FEES	</h5>
                        <p>-	In the event of any dispute between the parties concerning the terms and provisions of this Agreement, the party prevailing in such dispute shall be entitled to collect from the other party all costs incurred in such dispute, including reasonable attorneys’ fees.</p>
                        <h5>ENTIRE AGREEMENT</h5>

                    </div>

                    <div className="page-size page__5">
                        <p>-	This Agreement contains the entire agreement and understanding among the Parties hereto with respect to the subject matter hereof, and supersedes all prior agreements, understandings, inducements and conditions, express or implied, oral or written, of any nature whatsoever</p>
                        <p>with respect to the subject matter hereof. The express terms hereof control and supersede any course of performance and/or usage of the trade inconsistent with any of the terms hereof.</p>
                        <h5>AMENDMENTS</h5>
                        <p>-	The Parties agree that any amendments made to this Agreement must be in writing where they must be signed by both Parties to this Agreement. <br />
                            -	As such, any amendments made by the Parties will be applied to this Agreement.
                        </p>
                        <h5>SIGNATURE AND DATE</h5>
                        <p>-	The Parties hereby agree to the terms and conditions set forth in this Agreement and such is demonstrated throughout by their signatures below:</p>

                        <div className="signature">
                            <div className="signature-left">
                                <h6>EMPLOYEE</h6>
                                <p>Name:<input type='text' className='input-w200 input-text' /><br />
                                    Signature:<input type='text' className='input-w200 input-text' /><br />
                                    Date:<input type='text' className='input-w200 input-text' />
                                </p>
                            </div>
                            <div className="signature-right">
                                <h6>EMPLOYER</h6>
                                <p>Name:<input type='text' className='input-w200 input-text' /><br />
                                    Signature:<input type='text' className='input-w200 input-text' /><br />
                                    Date:<input type='text' className='input-w200 input-text' />
                                </p>
                            </div>
                        </div>
                        <div className="btn-contract">
                            <button className="btn btn-contract-cancel" onClick={() => setIsShowPopup(false)}>
                                <FontAwesomeIcon icon={faArrowLeft} className='btn-cancel' />
                                <span>Cancel</span>
                            </button>
                            <button className="btn btn-contract-create">
                                <span>Create</span>
                                <FontAwesomeIcon icon={faArrowRight} className='btn-create' />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    return (
        <Fragment>
            {
                isShowPopup ? <Contract /> : <></>
            }
        </Fragment>
    );
}

export default Contract;