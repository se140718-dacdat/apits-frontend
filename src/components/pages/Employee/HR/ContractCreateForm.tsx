import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ContractCreateForm.css"
import { useState } from "react";

const ContractCreateForm = () => {
    const [contractType, setContractType] = useState('');
    const [partyB, setPartyB] = useState('');
    const [addressB, setAddressB] = useState('');
    const [phoneB, setPhoneB] = useState('');
    const [taxB, setTaxB] = useState('');
    const [representativeB, setRepresentativeB] = useState('');
    const [positionB, setPositionB] = useState('');
    const [accNumB, setAccNumB] = useState('');
    const [accBankB, setAccBankB] = useState('');
    const [accNameB, setAccNameB] = useState('');
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [amount, setAmount] = useState('');
    const [signature, setSignature] = useState('');
    const [dateSign, setDateSig] = useState('');
    const [isPreview, setIsPreview] = useState(false);
    const [salary, setSalary] = useState('');



    return (
        <div id="ContractCreateForm">
            <div className="contract__type">
                <label className="">Contract type:</label>
                <select onChange={(e) => setContractType(e.target.value)}>
                    <option >Select type of Contract</option>
                    <option >CONTRACT OF LABOR SUPPLY</option>
                    <option >EMPLOYMENT CONTRACT AGREEMENT</option>
                </select>
                <button className="btn-preview" onClick={() => setIsPreview(!isPreview)}>{isPreview ? 'Edit' : 'Review'}</button>
            </div>
            {
                contractType === 'CONTRACT OF LABOR SUPPLY'
                    ? (
                        <div className="pages">
                            <div className="page-size page__1">
                                <div className="national-crest">
                                    <span>SOCIALIST REPUBLIC OF VIETNAM</span>
                                    <span>Independence – Freedom – Happiness</span>
                                    <div></div>
                                </div>
                                <div className="centered">
                                    <h3>CONTRACT OF LABOR SUPPLY</h3>
                                </div>
                                <h5>PARTY A: APITS</h5>
                                <span>Address: HCM</span><br />
                                <span>Phone: +84 948.678.678</span><br />
                                <span>Tax Code: 0502249266</span><br />
                                <span>Representative: Mr. A </span> <span>Position: DIRECTOR</span><br />
                                <span>Account No.: 0222 686 686</span><br />
                                <span>At the bank: TP Bank </span><br />
                                <span>Account name: APITS</span><br />

                                <h5>PARTY B:{isPreview ? partyB : <input type='text' className='input-w200 input-text' value={partyB} onChange={(e) => setPartyB(e.target.value)} />}</h5>
                                <span>Address: {isPreview ? addressB : <input type='text' className='input-w200 input-text' value={addressB} onChange={e => setAddressB(e.target.value)} />}</span><br />
                                <span>Phone: {isPreview ? phoneB : <input type='text' className='input-w200 input-text' value={phoneB} onChange={e => setPhoneB(e.target.value)} />}</span><br />
                                <span>Tax Code: {isPreview ? taxB : <input type='text' className='input-w200 input-text' value={taxB} onChange={e => setTaxB(e.target.value)} />}</span><br />
                                <span>Representative: {isPreview ? representativeB : <input type='text' className='input-w200 input-text' value={representativeB} onChange={e => setRepresentativeB(e.target.value)} />}</span><div className="space"></div> <span>Position: {isPreview ? positionB : <input type='text' className='input-w200 input-text' value={positionB} onChange={e => setPositionB(e.target.value)} />} </span><br />
                                <span>Account No.: {isPreview ? accNumB : <input type='text' className='input-w200 input-text' value={accNumB} onChange={e => setAccNumB(e.target.value)} />}</span><br />
                                <span>At the bank: {isPreview ? accBankB : <input type='text' className='input-w200 input-text' value={accBankB} onChange={e => setAccBankB(e.target.value)} />} </span><br />
                                <span>Account name: {isPreview ? accNameB : <input type='text' className='input-w200 input-text' value={accNameB} onChange={e => setAccNameB(e.target.value)} />} </span><br />
                                <p>After discussion, the two parties herbey agreed on the content of the contract with the following terms</p>

                                <h5>ACTICLE 1: CONTENT OF CONTRACT</h5>
                                <p>1.1 Party A is responsible for providing labor supply services at the request of Party B in terms of quantity, type, norms, …</p>
                                <p>1.2 Party A provides the number of Employees by increase or decrease at the request of Party B. Party B must notify Party A at least 07 working days in advance (For unexpected cases, the notice time is at least 03 days)</p>
                                <p>1.3 Working place: at HBC VIETNAM Company</p>

                                <h5>ARTICLE 2: CONTRACT TERM</h5>
                                <p>2.1 Term of validity of the Contract: from {isPreview ? dateStart : <input type='text' className='input-w130 input-text' value={dateStart} onChange={e => setDateStart(e.target.value)} />}. until the end of the day {isPreview ? dateEnd : <input type='text' className='input-w130 input-text' value={dateEnd} onChange={e => setDateEnd(e.target.value)} />}</p>
                                <p>2.2 The number of Employees supplied by Party A for Party B is expected to be {isPreview ? amount : <input type='text' className='input-w30 input-text' value={amount} onChange={e => setAmount(e.target.value)} />} people.</p>
                                <p>2.3 Working time at Party B:</p>
                                <p>- Standard time: 08 hours / person / day; 6 days / week.</p>
                                <p>- Outside the standard time, it is possible to overtime according to the business needs of Party B.</p>

                                <h5>ARTICLE 3: RESPONSIBILITIES OF THE TWO PARTIES</h5>
                                <h6>3.1 Responsibilities of Party A:</h6>
                                <p>3.1.1 Party A ensures sufficient quantity and quality of employees in the course of implementing the purchase order according to Party B’s demand.</p>
                                <p>3.1.2 Party A will arrange its candidates to work at Party B's company to ensure the following conditions: healthy enough to work, clear background, good moral character, honesty, good work ethic professional, have a sense of responsibility in the assigned work.</p>
                                <p>3.1.3 Party A ensures to provide Party B with the right workforce to perform the work in accordance with the process and product quality required by Party B.</p>
                                <p>3.1.4 Party A ensures all employees of Party A during the working at Party B’s company, always abide by the internal rules, labor discipline, principles of occupational safety and hygiene prescribed and prior noticed by Party B to Party A’s employees.</p>
                                <p>3.1.5 Party A is responsible for the employee’s salary. Party A directly signs labor contracts for each employee working at Party B.</p>
                                <p>3.1.6 Party A fully guarantees all other benefits for Party A's candidates who are working at Party B's workshop according to the level agreed with Party B.</p>
                                <p>3.1.7 Party A ensures to provide an adequate number of employees to meet the business plan deadlines as required by Party B.</p>
                                <p>3.1.8 If the employee of Party A wants to take leave, he / she must make an application one day in advance and must be approved by Party B’s manager to sign the application. Without the Manager’s consent, the employee is not allowed to take leave. (Except for force majeure cases such as illness, sickness, etc.)</p>
                                <h6>Responsibilities of Party B:</h6>
                                <p>3.2.1 Party B trains Party A's employees on Company Rules, Regulations on Occupational Safety and Health.</p>
                                <p>3.2.2 Party B provides the facilities and tools for manufacturing and processing for Party A’s employees during the working process at Party B’s factory</p>
                                <p>3.2.3 Party A’s employees are allowed to use the canteen and toilets and park their vehicles at the company’s parking lots.</p>
                                <p>3.2.4 Party B provides initial health care services to Party A’s employees, in case of an accident in Party B’s factory areas, it must promptly notify Party A to handle together.</p>
                                <p>3.2.5 Party B provides mid-shift meals to the employees of Party A who are working at the factory of Party B. If overtime for 03 hours or more, a further meal is added. </p>

                                <h5>ARTICLE 4: PRICE AND METHOD OF PAYMENT</h5>
                                <p>4.1 Unit price. Based on attached price quotation (not included VAT)</p>
                                <p>- Wage of weekday overtime is charged at 150% (according to the current labor code)</p>
                                <p>- Wage of Sunday overtime is charged at 200% (according to the current Labor Code).</p>
                                <p>- Wage of overtime on holidays and Tet holidays is charged at 300% (according to the current labor law).</p>
                                <p>- Wage of Night Overtime is added 30% (according to the current labor law).</p>
                                <p>4.2 Payment method: Bank transfer</p>

                                <h5>ARTICLE 5: EXTENSION OR TERMINATION OF THE CONTRACT</h5>
                                <p>5.1 This contract may be extended upon agreement of the two parties depending on the processing orders of each batch.</p>
                                <p>5.2 If either party fails to agree to extend the contract after the expiration as stipulated in Article 2 of this contract, this contract will be automatically terminated and liquidated in the spirit of discussion between the two parties.</p>
                                <p>5.3 Where either party requests to terminate the contract ahead of time as mentioned in Article 2, the two parties will discuss together to reach a mutual agreement and notify the other party in writing.</p>

                                <h5>ARTICLE 6: GENERAL PROVISIONS</h5>
                                <p>The two parties commit to properly and fully comply with the terms stated in the contract, the violating party will be responsible as prescribed by law. In the course of contract performance, if there are any obstacles or difficulties, the two partieswill meet to discuss and resolve.</p>
                                <p>All changes must be discussed in a spirit of cooperation in order to well perform the signed terms and clarify in writing the changes and supplements (if any).</p>
                                <p>The two parties must regularly inform each other of the contract performance progress to promptly solve arising problems.</p>
                                <p>Each party undertakes to keep the information provided by the other party confidential, or is allowed to access it during the course of work performance and must not disclose the information to any third party without the written consent of the other party.</p>
                                <p>Any disputes during implementation will be settled on the basis of discussion and in the spirit of mutual understanding as well as for the benefit of the two parties. In case of failure of negotiation and settlement, all disputes will be resolved at the Dong Nai Provincial People’s Court. All costs and fees for settlement are borne by the violating party at the Court’s discretion.</p>

                                <div className="signature">
                                    <div className="signature-left">
                                        <h6>REPRESENTATIVE OF PARTY A</h6>
                                        <p><label className="label-signature-name">Name:</label>{isPreview ? '' : <input type='text' className='input-w200 input-text' />}<br />
                                            <label className="label-signature-name">Signature:</label>{isPreview ? '' : <input type='text' className='input-w200 input-text' />}<br />
                                            <label className="label-signature-name">Date:</label>{isPreview ? '' : <input type='text' className='input-w200 input-text' />}
                                        </p>
                                    </div>
                                    <div className="signature-right">
                                        <h6>REPRESENTATIVE OF PARTY B</h6>
                                        <p><label className="label-signature-name">Name:</label>{isPreview ? representativeB : <input type='text' className='input-w200 input-text' value={representativeB} />}<br />
                                            <label className="label-signature-name">Signature:</label>{isPreview ? signature : <input type='text' className='input-w200 input-text' value={signature} onChange={e => setSignature(e.target.value)} />}<br />
                                            <label className="label-signature-name">Date:</label>{isPreview ? dateSign : <input type='text' className='input-w200 input-text' value={dateSign} onChange={e => setDateSig(e.target.value)} />}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-create">
                                <button className=" btn">Create</button>
                            </div>
                        </div>

                    )
                    : contractType === 'EMPLOYMENT CONTRACT AGREEMENT'
                        ? (
                            <div className="pages">
                                <div className="page-size">
                                    <div className="national-crest">
                                        <span>SOCIALIST REPUBLIC OF VIETNAM</span>
                                        <span>Independence – Freedom – Happiness</span>
                                        <div></div>
                                    </div>
                                    <div className="centered">
                                        <h3>EMPLOYMENT CONTRACT AGREEMENT</h3>
                                    </div>
                                    <h5>PARTIES</h5>
                                    <p>-	This Employment Contract Agreement (hereinafter referred to as the “Agreement”) is entered into on {isPreview ? dateSign : <input type='text' className='input-w200 input-text' value={dateSign} onChange={e => setDateSig(e.target.value)} />} (the “Effective Date”), by and between Apits, with an address of {isPreview ? 'District 9 Ho Chi Minh city' : <input type='text' value={'District 9 Ho Chi Minh city'} className='input-w200 input-text' />} (hereinafter referred to as the “Employer”), and {isPreview ? partyB : <input type='text' className='input-w200 input-text' value={partyB} onChange={(e) => setPartyB(e.target.value)} />}, with an address of {isPreview ? addressB : <input type='text' className='input-w200 input-text' value={addressB} onChange={e => setAddressB(e.target.value)} />} (hereinafter referred to as the “Employee”) (collectively referred to as the “Parties”).</p>
                                    <h5>DUTIES AND RESPONSIBILITIES</h5>
                                    <p>-	During the employment period, the Employee shall have the responsibility to perform the following duties:<br />
                                        <label className="lb-space">1.</label> 	{isPreview ? '' : <input type='text' className='input-w400 input-text' />}  <br />
                                        <label className="lb-space">2.</label>	{isPreview ? '' : <input type='text' className='input-w400 input-text' />}<br />
                                        <label className="lb-space">3.</label>	{isPreview ? '' : <input type='text' className='input-w400 input-text' />}<br />
                                        <label className="lb-space">4.</label>	{isPreview ? '' : <input type='text' className='input-w400 input-text' />}<br />
                                        <label className="lb-space">5.</label>	{isPreview ? '' : <input type='text' className='input-w400 input-text' />}<br />
                                        <label className="lb-space">6.</label>	{isPreview ? '' : <input type='text' className='input-w400 input-text' />}<br />
                                        <label className="lb-space">7.</label>	{isPreview ? '' : <input type='text' className='input-w400 input-text' />}<br />
                                        <label className="lb-space">8.</label>	{isPreview ? '' : <input type='text' className='input-w400 input-text' />}<br />
                                        <label className="lb-space">9.</label>	{isPreview ? '' : <input type='text' className='input-w400 input-text' />}<br />
                                        <label className="lb-space">10.</label>	{isPreview ? '' : <input type='text' className='input-w400 input-text' />}<br />
                                        <br />
                                        -	The Parties agree that any responsibilities provided in this Agreement may not be assigned to any other party unless both parties agree to the assignment in writing
                                    </p>
                                    <h5>PAY AND COMPENSATION</h5>
                                    <p>-	The Parties hereby agree that the Employer will pay the Employee an annual salary of {isPreview ? salary : <input type='text' className='input-w130 input-text' value={salary} onChange={e => setSalary(e.target.value)} />} payable semi-monthly and subject to regular deductions and withholdings as required by law.</p>
                                    <p>-	Whereas the Parties also agree that annual salary may be increased annually by an amount as may be approved by the Employer and, upon such increase, the increased amount shall thereafter be deemed to be the annual salary for purposes of this Agreement.</p>
                                    <h5>BENEFITS</h5>
                                    <p>-	The Parties hereby agree that the Employee shall receive the benefits (Insurance, Holiday and Vacation) provided by the Employer as indicated below.<br />
                                        1.	{isPreview ? '' : <input type='text' className='input-w400 input-text' />}<br />
                                        2.	{isPreview ? '' : <input type='text' className='input-w400 input-text' />}<br />
                                        3.	{isPreview ? '' : <input type='text' className='input-w400 input-text' />}<br />
                                    </p>
                                    <h5>WORKING HOURS AND LOCATION</h5>
                                    <p>-	The Employee agrees that he/she will be working from Monday to Friday, with a 5 lunch break.<br />
                                        -	In particular, the Employee agrees that he/she will work on average 40 hours per week.<br />
                                        -	The Employee’s place of work shall be located in {addressB} or such other location as the Parties may agree upon from time to time.<br />
                                    </p>
                                    <h5>TERMs OF AGREEMENT</h5>
                                    <p>-	This Agreement shall be effective on the date of signing this Agreement.<br />
                                        -	Upon the end of the term of the Agreement, this Agreement will not be automatically renewed for a new term.<br />
                                    </p>

                                    <h5>TERMINATION</h5>
                                    <p>-	This Agreement may be terminated in case the following occurs:<br />
                                        1.	Immediately in case one of the Parties breaches this Agreement.<br />
                                        2.	At any given time by providing a written notice to the other party 7 days prior to terminating the Agreement.<br />
                                        -	Upon terminating this Agreement, the Employee will be required to return all Employer’s materials, products or any other content at his/her earliest convenience, but not beyond 7 days.</p>
                                    <h5>CONFIDENTIALITY </h5>
                                    <p>-	All terms and conditions of this Agreement and any materials provided during the term of the Agreement must be kept confidential by the Employee, unless the disclosure is required pursuant to process of law. <br />
                                        -	Disclosing or using this information for any purpose beyond the scope of this Agreement, or beyond the exceptions set forth above, is expressly forbidden without the prior consent of the Employer.
                                    </p>
                                    <h5>INTELLECTUAL PROPERTY</h5>
                                    <p>-	Hereby, the Employee agrees that any intellectual property provided to him/her by the Employer will remain the sole property of the Employer including, but not limited to, copyrights, patents, trade secret rights, and other intellectual property rights associated with any ideas, concepts, techniques, inventions, processes, works of authorship, Confidential Information or trade secrets. </p>
                                    <h5>EXCLUSIVITY</h5>
                                    <p>-	The Parties agree that this Agreement is not an exclusive arrangement and that the Employer is entitled to enter into other similar agreements with other employees.<br />
                                    </p>

                                    <p>-	However, the Employee is not entitled to enter into a similar agreement as long as he/she remains a party to this Agreement.</p>
                                    <h5>LIMITATION OF LIABILITY</h5>
                                    <p>-	In no event shall the Employer nor the Employee be individually liable for any damages for breach of duty by third parties, unless the Employer’s or Employee’s act or failure to act involves intentional misconduct, fraud, or a knowing violation of the law.</p>
                                    <h5>SEVERABILITY</h5>
                                    <p>-	In an event where any provision of this Agreement is found to be void and unenforceable by a court of competent jurisdiction, then the remaining provisions will remain to be enforced in accordance with the Parties’ intention.</p>
                                    <h5>GOVERNING LAW</h5>
                                    <p>-	This Agreement shall be governed by and construed in accordance with the laws of Viet Nam.</p>
                                    <h5>ALTERNATIVE DISPUTE RESOLUTION</h5>
                                    <p>-	Any dispute or difference whatsoever arising out of or in connection with this Agreement shall be submitted to Arbitration in accordance with, and subject to the laws of Viet Name.</p>
                                    <h5>ATTORNEY FEES	</h5>
                                    <p>-	In the event of any dispute between the parties concerning the terms and provisions of this Agreement, the party prevailing in such dispute shall be entitled to collect from the other party all costs incurred in such dispute, including reasonable attorneys’ fees.</p>
                                    <h5>ENTIRE AGREEMENT</h5>

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
                                            <h6>REPRESENTATIVE OF PARTY A</h6>
                                            <p><label className="label-signature-name">Name:</label>{isPreview ? '' : <input type='text' className='input-w200 input-text' />}<br />
                                                <label className="label-signature-name">Signature:</label>{isPreview ? '' : <input type='text' className='input-w200 input-text' />}<br />
                                                <label className="label-signature-name">Date:</label>{isPreview ? '' : <input type='text' className='input-w200 input-text' />}
                                            </p>
                                        </div>
                                        <div className="signature-right">
                                            <h6>REPRESENTATIVE OF PARTY B</h6>
                                            <p><label className="label-signature-name">Name:</label>{isPreview ? representativeB : <input type='text' className='input-w200 input-text' value={representativeB} />}<br />
                                                <label className="label-signature-name">Signature:</label>{isPreview ? signature : <input type='text' className='input-w200 input-text' value={signature} onChange={e => setSignature(e.target.value)} />}<br />
                                                <label className="label-signature-name">Date:</label>{isPreview ? dateSign : <input type='text' className='input-w200 input-text' value={dateSign} onChange={e => setDateSig(e.target.value)} />}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="btn-create">
                                    <button className=" btn">Create</button>
                                </div>
                            </div>
                        )
                        : <div className="container"></div>
            }
        </div >
    );
}

export default ContractCreateForm;