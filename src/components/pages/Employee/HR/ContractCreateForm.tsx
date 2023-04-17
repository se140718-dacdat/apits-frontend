import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../../api/axios";
import { CandidateEntity, ContractAgreement, ContractAgreementResponse, ContractLaborSupply, ContractLarborSupplyResponse, interviewDetailResponse } from "../../../../entity";
import "./ContractCreateForm.css";

interface Props {
    interviewDetail: interviewDetailResponse | undefined;
    contractAgreement: ContractAgreementResponse | undefined;
    contractLaborSupply: ContractLarborSupplyResponse | undefined;
    setIsCreate: Dispatch<SetStateAction<boolean>>
}

const ContractCreateForm: React.FC<Props> = ({ interviewDetail, contractAgreement, contractLaborSupply, setIsCreate }) => {
    const user = useSelector((state: any) => state.user.user.user);
    const now = new Date();

    const getSalary = () => {
        if(contractLaborSupply) {
            return contractLaborSupply.salary
        } else if(contractAgreement) {
            return contractAgreement.salary
        } else {
            return 0
        }
    }

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
    const [dateSign, setDateSig] = useState<string>(moment((new Date()).toString()).format('YYYY-MM-DD'));
    const [isPreview, setIsPreview] = useState(false);
    const [salary, setSalary] = useState<number>(getSalary());
    const [missionEmployee, setMissionEmployee] = useState<string>(contractAgreement ? contractAgreement.missionEmployee : '');
    const [benefits, setBenefits] = useState<string>(contractAgreement ? contractAgreement.benefits : '');
    const [candidate, setCandidate] = useState<CandidateEntity>();
    const [requestLaborSupply, setRequestLaborSupply] = useState<ContractLaborSupply>();


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
            salary: salary ? salary : 0,
            benefits: benefits,
            nameHiring: interviewDetail !== undefined ? interviewDetail?.interview.assign.recruitmentRequest.creator.name : "",
            signatureHiring: "Mr.A",
            signatureEmployee: "",
            dateEmployeeSigned: "",
            createId: user?.id,
            signerId: interviewDetail !== undefined ? interviewDetail.interview.assign.candidate.id : 0
        }
        console.log(request);
        await axios.post("/contract/createContractLaborSupply", requestLaborSupply).then((res) => {
            console.log(res.data);
        })
        await axios.post("/contract/createContractAgreement", request).then((res) => {
            console.log(res.data);
            setIsCreate(false);
        })
        await axios.put(`/interview-detail/changeStatusDoneByInterviewId?id=${interviewDetail?.interview.id}`)
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
            salary: salary ? salary : 0,
            signerId: interviewDetail !== undefined ? interviewDetail.interview.assign.recruitmentRequest.creator.id : 0
        }
        setRequestLaborSupply(request);
        setContractType('EMPLOYMENT CONTRACT AGREEMENT');

        // await axios.post("/contract/createContractLaborSupply", request).then((res) => {
        //     console.log(res.data);
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
                                                <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} /> Signed
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
                                <button className="btn btn-cancel" onClick={() => { setIsCreate(false); setRequestLaborSupply(undefined) }}>Cancel</button>
                                {
                                    contractLaborSupply !== undefined ?
                                        <button className=" btn" onClick={() => {}}>Sign</button>
                                        :
                                        <button className=" btn" onClick={() => { handleCreateLarborSupply() }}>Create</button>
                                }
                            </div>
                        </div>

                    )
                    : (contractAgreement !== undefined || contractType === 'EMPLOYMENT CONTRACT AGREEMENT')
                        ? (
                            <div className="pages">
                                <div className="page-size">
                                    <div className="national-crest">
                                        <span>Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam</span>
                                        <span>Độc lập – tự do – hạnh phúc</span>
                                        <div></div>
                                    </div>
                                    <div className="centered">
                                        <h3>HỢP ĐỒNG LAO ĐỘNG</h3>
                                    </div>
                                    <h5>Các Bên</h5>
                                    <p>- Thỏa thuận Hợp đồng Lao động này (sau đây gọi là “Thỏa thuận”) được ký kết vào ngày 16 tháng 4 năm 2023 (“Ngày có hiệu lực”), giữa Apits có địa chỉ 1412, Đường Cầu Vồng 3, Phường Long Thạnh Mỹ, Quận 9, Hồ Chí Minh (sau đây gọi là “Bên cung cấp dịch vụ”) và Lương Hồ Đắc Đạt, có địa chỉ tại TP.HCM (sau đây gọi là “Người lao động”) (gọi chung là “Các bên”) .</p>
                                    <h5>Nhiệm Vụ Và Trách Nhiệm</h5>
                                    <p>- Trong thời gian làm việc, Người lao động có trách nhiệm thực hiện các nhiệm vụ sau:<br />
                                        {isPreview ? missionEmployee : <textarea rows={5} className='p0-14 textarea' style={{ width: "100%" }} value={missionEmployee} onChange={(e) => { setMissionEmployee(e.target.value) }} />}  <br />
                                        <br />
                                        - Các Bên đồng ý rằng bất kỳ trách nhiệm nào được quy định trong Thỏa thuận này sẽ không được chuyển nhượng cho bất kỳ bên nào khác trừ khi cả hai bên đồng ý chuyển nhượng bằng văn bản
                                    </p>
                                    <h5>Trả Lương Và Bồi Thường</h5>
                                    <p>Các Bên theo đây đồng ý rằng Người sử dụng lao động sẽ trả cho Người lao động mức lương hàng năm là {isPreview ? <strong>{salary}</strong> : <input type='text' className='input-w130 input-text' value={salary} />} (VNĐ), phải trả một tháng một lần và chịu các khoản khấu trừ và giữ lại thường xuyên theo yêu cầu của pháp luật.</p>
                                    <p>- Xét rằng các Bên cũng đồng ý rằng tiền lương hàng năm có thể được tăng lên hàng năm với số tiền có thể được Người sử dụng lao động chấp thuận và, khi tăng như vậy, số tiền tăng lên sau đó sẽ được coi là tiền lương hàng năm cho các mục đích của Thỏa thuận này.</p>
                                    <h5>Quyền Lợi</h5>
                                    <p>- Các Bên theo đây đồng ý rằng Người lao động sẽ nhận được các phúc lợi (Bảo hiểm, Ngày lễ và Kỳ nghỉ) do Người sử dụng lao động cung cấp như được nêu dưới đây.<br />
                                        {isPreview ? benefits : <textarea rows={5} className='p0-14 textarea' style={{ width: "100%" }} onChange={(e) => { setBenefits(e.target.value) }} />}<br />
                                    </p>
                                    <h5>Giờ Làm Việc Và Địa Điểm</h5>
                                    <p>- Người lao động đồng ý sẽ làm việc từ thứ 2 đến thứ 6, nghỉ trưa 5 tiếng.<br />
                                        - Cụ thể, Người lao động đồng ý sẽ làm việc trung bình 40 giờ/tuần.<br />
                                        - Địa điểm làm việc của Người lao động sẽ được đặt tại TP.HCM hoặc địa điểm khác mà các Bên có thể thỏa thuận tùy từng thời điểm.<br />
                                    </p>
                                    <h5>Khoản của thỏa thuận</h5>
                                    <p>- Hợp đồng này có hiệu lực kể từ ngày ký kết Hợp đồng này.<br />
                                        - Khi kết thúc thời hạn của Thỏa thuận, Thỏa thuận này sẽ không được tự động gia hạn cho một thời hạn mới.<br />
                                    </p>

                                    <h5>Chấm Dứt Hợp Đồng</h5>
                                    <p>- Thỏa thuận này có thể bị chấm dứt trong trường hợp sau đây xảy ra:<br />
                                        1. Ngay lập tức trong trường hợp một trong các Bên vi phạm Hợp đồng này.<br />
                                        2. Vào bất kỳ thời điểm nào bằng cách cung cấp thông báo bằng văn bản cho bên kia 7 ngày trước khi chấm dứt Thỏa thuận.<br />
                                        - Khi chấm dứt Thỏa thuận này, Nhân viên sẽ được yêu cầu trả lại tất cả các tài liệu, sản phẩm hoặc bất kỳ nội dung nào khác của Chủ lao động một cách thuận tiện sớm nhất, nhưng không quá 7 ngày.</p>
                                    <h5>Điều Khoản Bảo Mật</h5>
                                    <p>- Tất cả các điều khoản và điều kiện của Thỏa thuận này và bất kỳ tài liệu nào được cung cấp trong thời hạn của Thỏa thuận phải được Người lao động giữ bí mật, trừ khi việc tiết lộ là bắt buộc theo quy trình của pháp luật.<br />
                                        - Tiết lộ hoặc sử dụng thông tin này cho bất kỳ mục đích nào ngoài phạm vi của Thỏa thuận này, hoặc ngoài các trường hợp ngoại lệ được nêu ở trên, đều bị nghiêm cấm nếu không có sự đồng ý trước của Nhà tuyển dụng.
                                    </p>
                                    <h5>Sở Hữu Trí Tuệ</h5>
                                    <p>- Bằng văn bản này, Người lao động đồng ý rằng bất kỳ tài sản trí tuệ nào do Người sử dụng lao động cung cấp sẽ vẫn là tài sản duy nhất của Người sử dụng lao động bao gồm nhưng không giới hạn ở bản quyền, bằng sáng chế, quyền bí mật thương mại và các quyền sở hữu trí tuệ khác liên quan đến bất kỳ ý tưởng nào , khái niệm, kỹ thuật, phát minh, quy trình, tác phẩm của tác giả, Thông tin mật hoặc bí mật thương mại.</p>
                                    <h5>Độc Quyền</h5>
                                    <p>- Các Bên đồng ý rằng Thỏa thuận này không phải là một thỏa thuận độc quyền và Người sử dụng lao động có quyền ký kết các thỏa thuận tương tự khác với các nhân viên khác.<br />
                                    </p>

                                    <p>- Tuy nhiên, Người lao động không có quyền tham gia vào một thỏa thuận tương tự miễn là Người lao động vẫn là một bên của Thỏa thuận này.</p>
                                    <h5>Trách Nhiệm Hữu Hạn</h5>
                                    <p>- Trong mọi trường hợp, Chủ lao động và Nhân viên sẽ không chịu trách nhiệm cá nhân đối với bất kỳ thiệt hại nào do vi phạm nghĩa vụ của bên thứ ba, trừ khi hành động hoặc việc không hành động của Chủ lao động hoặc Nhân viên liên quan đến hành vi sai trái có chủ ý, gian lận hoặc vi phạm pháp luật có chủ ý.</p>
                                    <h5>Khả Năng Nghiêm Trọng</h5>
                                    <p>- Trong trường hợp bất kỳ điều khoản nào của Thỏa thuận này bị tòa án có thẩm quyền cho là vô hiệu và không thể thi hành, thì các điều khoản còn lại sẽ vẫn được thi hành theo ý định của các Bên.</p>
                                    <h5>Toàn Bộ Thỏa Thuận</h5>
                                    <p>- Thỏa thuận này bao gồm toàn bộ thỏa thuận và sự hiểu biết giữa các Bên theo đây liên quan đến chủ đề của thỏa thuận này và thay thế tất cả các thỏa thuận, sự hiểu biết, sự thuyết phục và điều kiện trước đó, rõ ràng hay ngụ ý, bằng lời nói hoặc bằng văn bản, dưới bất kỳ hình thức nào</p>
                                    <h5>Điều khoản khác</h5>
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
                                                    <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} /> Signed
                                                </div>
                                            </p>
                                        </div>
                                        <div className="signature-right">
                                            <h6>Đại diện của bên B</h6>
                                            <p><label className="label-signature-name">Bên B:</label>{partyB}<br />
                                                {`Ngày ${now.getDate()}, tháng ${now.getMonth()}, năm ${now.getFullYear()}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="btn-create">
                                    <button className="btn btn-cancel" onClick={() => { setIsCreate(false); setRequestLaborSupply(undefined) }}>Cancel</button>
                                    {
                                        contractAgreement !== undefined ?
                                            <button className=" btn" onClick={() => { }}>Sign</button>
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
