import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./ContractCreateForm.css";
import { CandidateEntity, ContractAgreement, ContractAgreementResponse, ContractLaborSupply, ContractLarborSupplyResponse, interviewDetailResponse } from "../../../../entity";
import moment from "moment";
import axios from "../../../../api/axios";
import { useSelector } from "react-redux";
import { formatDateMonthYear } from "../../../../convert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface Props {
    interviewDetail: interviewDetailResponse | undefined;
    contractAgreement: ContractAgreementResponse | undefined;
    contractLaborSupply: ContractLarborSupplyResponse | undefined;
    setIsCreate: Dispatch<SetStateAction<boolean>>
}

const ContractCreateForm: React.FC<Props> = ({ interviewDetail, contractAgreement, contractLaborSupply, setIsCreate }) => {
    const user = useSelector((state: any) => state.user.user.user);
    const now = new Date();

    const [contractType, setContractType] = useState('Select Contract Type');
    const [partyB, setPartyB] = useState<string>('');
    const [addressB, setAddressB] = useState<string>('');
    const [phoneB, setPhoneB] = useState<string>('');
    const [taxB, setTaxB] = useState<string>('');
    const [representativeB, setRepresentativeB] = useState<string>('');
    const [positionB, setPositionB] = useState<string>('');
    const [accNumB, setAccNumB] = useState<string>('');
    const [accBankB, setAccBankB] = useState<string>('');
    const [accNameB, setAccNameB] = useState<string>('');
    const [dateStart, setDateStart] = useState<string>('');
    const [dateEnd, setDateEnd] = useState<string>('');
    const [signature, setSignature] = useState<string>('');
    const [dateSign, setDateSig] = useState<string>(formatDateMonthYear((new Date()).toString().slice(0, 16)));
    const [isPreview, setIsPreview] = useState(false);
    const [salary, setSalary] = useState<number>(0);
    const [missionEmployee, setMissionEmployee] = useState<string>('');
    const [benefits, setBenefits] = useState<string>('');
    const [candidate, setCandidate] = useState<CandidateEntity>();


    useEffect(() => {
        handleContractType();
    }, [contractType]);

    const handleContractType = () => {
        if (interviewDetail !== undefined) {
            switch (contractType) {
                case 'CONTRACT OF LABOR SUPPLY':
                    setPartyB(interviewDetail?.interview.assign.recruitmentRequest.creator.name);
                    setPhoneB(interviewDetail?.interview.assign.recruitmentRequest.hrPhone);
                    setAddressB(interviewDetail?.interview.assign.recruitmentRequest.creator.address)
                    setCandidate(interviewDetail?.interview.assign.candidate);
                    break;
                default:
                    setPartyB(interviewDetail?.interview.assign.candidate.name);
                    setPhoneB(interviewDetail.interview.assign.candidate.phone);
                    setAddressB(interviewDetail.interview.assign.candidate.address);
                    setMissionEmployee(interviewDetail.interview.assign.recruitmentRequest.description);
                    break;
            }
        }
    }

    const handleCreateAgreement = async () => {
        const request: ContractAgreement = {
            dateSigned: dateSign,
            address: addressB,
            description: "",
            nameEmployee: partyB,
            addressEmployee: addressB,
            missionEmployee: missionEmployee,
            salary: salary,
            benefits: benefits,
            nameHiring: interviewDetail !== undefined ? interviewDetail?.interview.assign.recruitmentRequest.creator.name : "",
            signatureHiring: "Mr.A",
            signatureEmployee: "",
            dateEmployeeSigned: "",
            createId: user?.id,
            signerId: interviewDetail !== undefined ? interviewDetail.interview.assign.candidate.id : 0
        }
        console.log(request);
        await axios.post("/contract/createContractAgreement", request).then((res) => {
            console.log(res.data);
            setIsCreate(false);
        })
    }

    const handleCreateLarborSupply = async () => {
        const request: ContractLaborSupply = {
            name: partyB,
            address: addressB,
            phone: phoneB,
            taxCode: taxB,
            representative: representativeB,
            accountBankId: accNumB,
            bankName: accBankB,
            accountBankName: accNameB,
            position: positionB,
            fromTo: dateStart,
            endTo: dateEnd,
            description: "",
            numOfEmployee: 1,
            createId: user?.id,
            salary: salary,
            signerId: interviewDetail !== undefined ? interviewDetail.interview.assign.recruitmentRequest.creator.id : 0
        }
        console.log(request);
        // await axios.post("/contract/createContractLaborSupply", request).then((res) => {
        //     console.log(res.data);
        //     setContractType('EMPLOYMENT CONTRACT AGREEMENT');
        // })
    }



    return (
        <div id="ContractCreateForm">
            {
                interviewDetail !== undefined ?
                    <div className="contract__type">
                        <label className="">Contract type:</label>
                        <select onChange={(e) => setContractType(e.target.value)}>
                            <option >Select Contract Type</option>
                            <option >CONTRACT OF LABOR SUPPLY</option>
                            <option >EMPLOYMENT CONTRACT AGREEMENT</option>
                        </select>
                        <button className="btn-preview" onClick={() => setIsPreview(!isPreview)}>{isPreview ? 'Edit' : 'Review'}</button>
                    </div>
                    : null
            }

            {
                (contractLaborSupply !== undefined || contractType === 'CONTRACT OF LABOR SUPPLY')
                    ? (
                        <div className="pages">
                            <div className="page-size page__1">
                                <div className="national-crest">
                                    <span>Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam</span>
                                    <span>Độc lập – tự do – hạnh phúc</span>
                                    <div></div>
                                </div>
                                <div className="centered">
                                    <h3>HỢP ĐỒNG CUNG CẤP NHÂN SỰ</h3>
                                </div>
                                <h5>Đơn vị cung cấp dịch vụ: APITS</h5>
                                <span>Địa chỉ: 1412, Đường Cầu Vồng 3, Phường Long Thạnh Mỹ, Quận 9, Hồ Chí Minh</span><br />
                                <span>Số điện thoại: +84 948.678.678</span><br />
                                <span>Email: apits@apits.com.vn </span><br />

                                <h5>Đơn vị sử dụng dịch vụ:{isPreview ? ` ${partyB}` : <input type='text' className='input-text' value={partyB} onChange={(e) => setPartyB(e.target.value)} />}</h5>
                                <p>Địa chỉ: {addressB}</p>
                                <p>Số điện thoại: {phoneB}</p>
                                <p>Email: {interviewDetail?.interview.assign.recruitmentRequest.creator.email}</p>

                                <p>Ngày ký: {`Ngày ${now.getDate()}, tháng ${now.getMonth()}, năm ${now.getFullYear()}`}</p>

                                <p>Giữa <strong>APITS</strong>, có trụ sở tại <strong>1412, Đường Cầu Vồng 3, Phường Long Thạnh Mỹ, Quận 9, Hồ Chí Minh</strong>, (sau đây gọi là "Bên A") và <strong>{partyB}</strong>, có trụ sở tại <strong>{addressB}</strong>, (sau đây gọi là "Bên B").</p>

                                <h5>1. Nội dung của hợp đồng</h5>
                                <p>Bên A cam kết cung cấp cho Bên B dịch vụ cung cấp nhân sự với thông tin như sau:</p>
                                <ul>
                                    <li>Tên nhân viên: <strong>{candidate?.name}</strong></li>
                                    <li>Ngày sinh: <strong>{candidate?.dob.toString().slice(0, 10)}</strong></li>
                                    <li>Giới tính: <strong>{candidate?.gender === "Male" ? "Nam" : "Nữ"}</strong></li>
                                    <li>Địa Chỉ: <strong>{candidate?.address}</strong></li>
                                </ul>

                                <h5>2. Thời hạn của hợp đồng</h5>
                                <p>Hợp đồng này có hiệu lực từ ngày ký và kết thúc sau khi các bên hoàn thành các điều kiện cụ thể được ghi trong hợp đồng hoặc được chấm dứt bởi bất kỳ bên nào thông qua thông báo bằng văn bản cho bên còn lại trước ít nhất 7 ngày.</p>

                                <h5>3. Giá cả và phương thức thanh toán</h5>
                                <p>Bên B sẽ thanh toán cho Bên A số tiền cung cấp dịch vụ được thỏa thuận trong hợp đồng sau khi nhận được và chấp nhận dịch vụ. Phương thức thanh toán được thống nhất là chuyển khoản ngân hàng đến tài khoản ngân hàng của Bên A theo thông tin sau:</p>
                                <p>Bên A và B đã thống nhất về mức phí dịch vụ dựa trên kinh nghiệm của ứng viên được cung cấp. Theo đó, với ứng viên có kinh nghiệm <strong>Fresher</strong>, mức phí dịch vụ là <strong>5%</strong> của mức lương cơ bản mà doanh nghiệp đã đề ra sau khi đã phỏng vấn với ứng viên là {isPreview ? salary : <input type='text' className='input-w130 input-text' value={salary} onChange={e => setSalary(parseInt(e.target.value))} />}(VNĐ). Bên B sẽ thanh toán mức phí dịch vụ được thỏa thuận cho Bên A sau khi nhận được và chấp nhận dịch vụ.</p>

                                <h5>4. Bảo mật thông tin</h5>
                                <p>Bên A cam kết giữ bí mật thông tin</p>

                                <h5>5. Trách nhiệm và nghĩa vụ của các bên</h5>
                                <h6 className="ml-22">5.1. Trách nhiệm và nghĩa vụ của bên A:</h6>
                                <ul className="ml-22">
                                    <li>Cam kết cung cấp dịch vụ nhân sự theo yêu cầu của bên B đảm bảo tính chất chuyên nghiệp, trung thực và đáp ứng đầy đủ các tiêu chuẩn và điều kiện được ghi trong hợp đồng.</li>
                                    <li>Có trách nhiệm bồi thường cho bên B nếu dịch vụ cung cấp của bên A gây ra thiệt hại đến quyền lợi và tài sản của bên B.</li>
                                    <li>Bảo mật thông tin về bên B và nhân viên được cung cấp cho bên B.</li>
                                </ul>
                                <h6 className="ml-22">5.2. Trách nhiệm và nghĩa vụ của bên B:</h6>
                                <ul className="ml-22">
                                    <li>Thanh toán đầy đủ và đúng thời hạn số tiền được thỏa thuận trong hợp đồng.</li>
                                    <li>Đảm bảo cung cấp đầy đủ thông tin về yêu cầu về nhân sự để bên A có thể cung cấp dịch vụ đúng theo yêu cầu của bên B.</li>
                                    <li>Cam kết đảm bảo an toàn cho nhân viên được cung cấp từ bên A trong quá trình làm việc tại bên B</li>
                                </ul>

                                <h5>6. Điều khoản chấm dứt hợp đồng</h5>
                                <h6 className="ml-22">6.1. Hợp đồng có thể chấm dứt khi:</h6>
                                <ul className="ml-22">
                                    <li>Bên A không đáp ứng đầy đủ hoặc không tuân thủ các điều kiện đã ghi trong hợp đồng và không sửa chữa trong vòng [số ngày] kể từ khi bên B thông báo bằng văn bản.</li>
                                    <li>Bên A vi phạm các quy định pháp luật về cung cấp dịch vụ nhân sự.</li>
                                    <li>Bên B không thanh toán đầy đủ hoặc không đúng thời hạn các khoản phí được thỏa thuận trong hợp đồng và không sửa chữa trong vòng [số ngày] kể từ khi bên A thông báo bằng văn bản.</li>
                                </ul>

                                <h6 className="ml-22">6.2. Trong trường hợp hợp đồng bị chấm dứt do lý do không phải là do bên A vi phạm thì bên B phải thanh toán cho bên A phần chi phí đã phát sinh cho dịch vụ cung cấp nhân sự đến thời điểm chấm dứt</h6>

                                <h5>7. Điều khoản khác</h5>
                                <h6 className="ml-22">7.1. Bên A và bên B cam kết thực hiện các điều khoản và điều kiện của hợp đồng này một cách nghiêm túc và trung thực.</h6>
                                <h6 className="ml-22">7.2. Bất kỳ sự thay đổi hoặc bổ sung nào của hợp đồng này phải được thực hiện bằng văn bản và có sự đồng ý của cả hai bên.</h6>
                                <h6 className="ml-22">7.3. Hợp đồng này sẽ có hiệu lực kể từ ngày ký kết và có thời hạn đến khi đủ điều kiện chấm dứt theo quy định của hợp đồng.</h6>
                                <h6 className="ml-22">7.4. Bên A và bên B sẽ giải quyết các tranh chấp phát sinh liên quan đến hợp đồng này bằng đàm phán và giải quyết hòa bình. Trong trường hợp không giải quyết được bằng đàm phán, tranh chấp sẽ được đưa ra trọng tài tại Công ty APITS, 1412, Đường Cầu Vồng 3, Phường Long Thạnh Mỹ, Quận 9, Hồ Chí Minh.</h6>

                                <p>Trong chứng nhận này, bên A và bên B đã xác nhận rằng họ đã đọc, hiểu và chấp nhận tất cả các điều khoản và điều kiện được ghi trong hợp đồng này. Hợp đồng này có giá trị pháp lý và có hiệu lực sau khi được ký và đóng dấu bởi hai bên.</p><br />

                                <div className="signature">
                                    <div className="signature-left">
                                        <h6>Đại diện của bên A</h6>
                                        <p><label className="label-signature-name">Bên A:</label>Công ty APITS<br />
                                            <label className="label-signature-name">Đại diện:</label>Mr.A<br />
                                            <label className="label-signature-name">Chức vụ:</label>Director<br />
                                            {`Ngày ${now.getDate()}, tháng ${now.getMonth()}, năm ${now.getFullYear()}`}
                                            <div className="sign mt-24">
                                                <FontAwesomeIcon icon={faCheck} style={{color: "green"}}/> Signed
                                            </div>
                                        </p>
                                    </div>
                                    <div className="signature-right">
                                        <h6>Đại diện của bên B</h6>
                                        <p><label className="label-signature-name">Bên B:</label>Công ty {partyB}<br />
                                            <label className="label-signature-name">Đại diện:</label><input type="text" className="input-text" /><br />
                                            <label className="label-signature-name">Chức vụ:</label><input type="text" className="input-text" /><br />
                                            {`Ngày ${now.getDate()}, tháng ${now.getMonth()}, năm ${now.getFullYear()}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-create">
                                <button className="btn btn-cancel" onClick={() => { setIsCreate(false) }}>Cancel</button>
                                <button className=" btn" onClick={() => { handleCreateLarborSupply() }}>Create</button>
                            </div>
                        </div>

                    )
                    : (contractAgreement !== undefined || contractType === 'EMPLOYMENT CONTRACT AGREEMENT')
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
                                    <p>-	This Employment Contract Agreement (hereinafter referred to as the “Agreement”) is entered into on {isPreview ? dateSign : <input type='text' className='input-w200 input-text' value={dateSign} onChange={e => setDateSig(e.target.value)} />} (the “Effective Date”), by and between Apits, with an address of {isPreview ? '1412, Đường Cầu Vồng 3, Phường Long Thạnh Mỹ, Quận 9, Hồ Chí Minh' : <input type='text' value={'1412, Đường Cầu Vồng 3, Phường Long Thạnh Mỹ, Quận 9, Hồ Chí Minh'} className='input-w200 input-text' />} (hereinafter referred to as the “Employer”), and {isPreview ? partyB : <input type='text' className='input-w200 input-text' value={partyB} onChange={(e) => setPartyB(e.target.value)} />}, with an address of {isPreview ? addressB : <input type='text' className='input-w200 input-text' value={addressB} onChange={e => setAddressB(e.target.value)} />} (hereinafter referred to as the “Employee”) (collectively referred to as the “Parties”).</p>
                                    <h5>DUTIES AND RESPONSIBILITIES</h5>
                                    <p>-	During the employment period, the Employee shall have the responsibility to perform the following duties:<br />
                                        {isPreview ? missionEmployee : <textarea rows={5} className='p0-14 textarea' style={{ width: "100%" }} value={missionEmployee} onChange={(e) => { setMissionEmployee(e.target.value) }} />}  <br />
                                        <br />
                                        -	The Parties agree that any responsibilities provided in this Agreement may not be assigned to any other party unless both parties agree to the assignment in writing
                                    </p>
                                    <h5>PAY AND COMPENSATION</h5>
                                    <p>-	The Parties hereby agree that the Employer will pay the Employee an annual salary of {isPreview ? salary : <input type='text' className='input-w130 input-text' value={salary} />} payable semi-monthly and subject to regular deductions and withholdings as required by law.</p>
                                    <p>-	Whereas the Parties also agree that annual salary may be increased annually by an amount as may be approved by the Employer and, upon such increase, the increased amount shall thereafter be deemed to be the annual salary for purposes of this Agreement.</p>
                                    <h5>BENEFITS</h5>
                                    <p>-	The Parties hereby agree that the Employee shall receive the benefits (Insurance, Holiday and Vacation) provided by the Employer as indicated below.<br />
                                        {isPreview ? benefits : <textarea rows={5} className='p0-14 textarea' style={{ width: "100%" }} onChange={(e) => { setBenefits(e.target.value) }} />}<br />
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
                                            <p><label className="label-signature-name">Name:</label>Mr.A<br />
                                                <label className="label-signature-name">Signature:</label>Mr.A<br />
                                                <label className="label-signature-name">Date:</label>{moment(new Date()).format("DD-MM-YYYY")}
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
                                    <button className="btn btn-cancel" onClick={() => { setIsCreate(false) }}>Cancel</button>
                                    {
                                        contractAgreement !== undefined ?
                                            <button className=" btn" onClick={() => { handleCreateAgreement() }}>Sign</button>
                                            :
                                            <button className=" btn" onClick={() => { handleCreateAgreement() }}>Create</button>

                                    }
                                </div>
                            </div>
                        )
                        : <div className="container"></div>
            }
        </div >
    );
}

export default ContractCreateForm;
