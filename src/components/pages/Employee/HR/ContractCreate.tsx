import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import MessageBox from '../../../modules/pagecomponents/Popup/MessageBox/MessageBox'
import { ContractCreate, interviewDetailResponse } from '../../../../entity';
import { currencyMask, currencyMaskString, currencyToNumber } from '../../../../mask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import axios from '../../../../api/axios';
import { getCommissionPercent } from '../../../../handle';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

interface Props {
    interviewDetail: interviewDetailResponse | undefined;
    setIsCreate: Dispatch<SetStateAction<boolean>>;
}

const ContractCreatePage: FC<Props> = ({ interviewDetail, setIsCreate }) => {
    const now = new Date();
    const user = useSelector((state: any) => state.user.user.user);


    const [message, setMessage] = useState<string>('');
    const [messageStatus, setMessageStatus] = useState('');
    const [isPreview, setIsPreview] = useState(false);
    const [salary, setSalary] = useState<string>("");

    useEffect(() => {
        if (interviewDetail) {
            setSalary(currencyMaskString(interviewDetail?.interview.assign.recruitmentRequest.salaryDetail))
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSalary(e.target.value);
    }

    const handleCreate = async () => {
        if (interviewDetail !== undefined) {
            console.log(currencyToNumber(salary))
            const request: ContractCreate = {
                dateCreated: now,
                salary: salary ? currencyToNumber(salary) : 0,
                creatorId: user?.id,
                enterpriseId: interviewDetail?.interview.assign.recruitmentRequest.creator.id,
                candidateId: interviewDetail.interview.assign.candidate.id,
                interviewDetailId: interviewDetail.id,
                commissionFee: parseInt(getCommissionPercent(interviewDetail?.interview.assign.recruitmentRequest.experienceSpecialty.name).split("%")[0])
            }
            console.log(request);
            await axios.post("/contract/createContract", request).then(async (res) => {
                console.log(res)
                if (res.data.status == 200) {
                    await axios.put(`/interview-detail/changeStatusDoneByInterviewId?id=${interviewDetail?.interview.id}`).then((res) => {
                        console.log(res)
                        if (res.data.status == "SUCCESS") {
                            setIsCreate(false);
                        }
                    })
                }
            })
        }
    }

    return (
        <div id='ContractCreateForm'>
            {
                message != '' ?
                    <MessageBox status={messageStatus} message={message} setMessage={setMessage} title='inasd'></MessageBox>
                    :
                    null
            }
            <div className="contract__type">
                <label className="">Contract type: </label>
                <div>CONTRACT OF LABOR SUPPLY</div>
                <OverlayTrigger
                    trigger="click"
                    key={interviewDetail?.description}
                    placement='bottom'
                    overlay={
                        <Popover id="popover-contained">
                            <Popover.Header as="h3">Description</Popover.Header>
                            <Popover.Body>
                                {interviewDetail?.description}
                            </Popover.Body>
                        </Popover>
                    }
                >
                    <Button className='btn-description'>Description</Button>
                </OverlayTrigger>
                <button className="btn-preview" onClick={() => setIsPreview(!isPreview)}>{isPreview ? 'Edit' : 'Review'}</button>
            </div>
            {
                (interviewDetail)
                    ?
                    (<div className="pages">
                        <div className="page-size page__1">
                            <div className="national-crest">
                                <span>Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam</span>
                                <span>Độc lập – tự do – hạnh phúc</span>
                                <div></div>
                            </div>
                            <div className="centered">
                                <h3>HỢP ĐỒNG CUNG CẤP NHÂN SỰ</h3>
                            </div>
                            <h5>Bên cung cấp dịch vụ (bên A): <strong style={{ textDecoration: "none" }}>APITS</strong></h5>
                            <span>Địa chỉ: 1412, Đường Cầu Vồng 3, Phường Long Thạnh Mỹ, Quận 9, Hồ Chí Minh</span><br />
                            <span>Số điện thoại: +84 948.678.678</span><br />
                            <span>Email: apits@apits.com.vn </span><br />

                            <h5>Bên tìm kiếm nhân sự (bên B): <strong style={{ textDecoration: "none" }}>{interviewDetail?.interview.assign.recruitmentRequest.name}</strong></h5>
                            <p>Địa chỉ: {interviewDetail?.interview.assign.recruitmentRequest.workLocation}</p>
                            <p>Số điện thoại: {interviewDetail?.interview.assign.recruitmentRequest.hrPhone}</p>
                            <p>Email: {interviewDetail?.interview.assign.recruitmentRequest.creator.email}</p>

                            <h5>Bên nhân sự (bên C): <strong style={{ textDecoration: "none" }}>{interviewDetail?.interview.assign.candidate.name}</strong></h5>
                            <p>Địa chỉ: {interviewDetail?.interview.assign.candidate.address}</p>
                            <p>Số điện thoại: {interviewDetail?.interview.assign.candidate.phone}</p>
                            <p>Email: {interviewDetail?.interview.assign.candidate.email}</p>

                            <p>Được biết đến với nhau theo thỏa thuận này, ba bên đã đồng ý với các điều khoản sau đây:</p>

                            <h5>1. Nội dung của hợp đồng</h5>
                            <p>Bên A cam kết cung cấp cho Bên B nhân sự là bên C:</p>

                            <h5>2. Thời hạn của hợp đồng</h5>
                            <p>Hợp đồng này có hiệu lực từ ngày ký và kết thúc sau khi các bên hoàn thành các điều kiện cụ thể được ghi trong hợp đồng hoặc được chấm dứt bởi bất kỳ bên nào thông qua thông báo bằng văn bản cho bên còn lại trước ít nhất 7 ngày.</p>

                            <h5>3. Giá cả và phương thức thanh toán</h5>
                            <p>Bên B sẽ thanh toán cho Bên A số tiền cung cấp dịch vụ được thỏa thuận trong hợp đồng sau khi nhận được và chấp nhận dịch vụ. Phương thức thanh toán được thống nhất là chuyển khoản ngân hàng của Bên A</p>
                            <p>Bên A và B đã thống nhất về mức phí dịch vụ dựa trên kinh nghiệm của ứng viên được cung cấp. Theo đó, với ứng viên có kinh nghiệm <strong>{interviewDetail?.interview.assign.recruitmentRequest.experienceSpecialty.name}</strong>, mức phí dịch vụ là <strong>{getCommissionPercent(interviewDetail?.interview.assign.recruitmentRequest.experienceSpecialty.name)}</strong> của mức lương cơ bản mà doanh nghiệp đã đề xuất là {isPreview ? <strong>{currencyMaskString(interviewDetail ? interviewDetail?.interview.assign.recruitmentRequest.salaryDetail : 0)}</strong> : <input style={{ paddingLeft: "0" }} type="text" placeholder={salary} className="input-text" value={salary} onChange={(e) => { handleChange(currencyMask(e)) }} />}
                                <strong>(VNĐ)</strong>. Bên B sẽ thanh toán mức phí dịch vụ được thỏa thuận cho Bên A sau khi nhận được và chấp nhận dịch vụ.</p>

                            <h5>4. Bảo mật thông tin</h5>
                            <p>Các bên cam kết giữ bí mật về tất cả thông tin liên quan đến Bên C được cung cấp bởi Bên A và tất cả các thông tin khác liên quan đến việc thực hiện dịch vụ. Bên A và Bên B đều đồng ý không tiết lộ bất kỳ thông tin nào về Bên C được cung cấp hoặc các thông tin khác được đưa ra trong quá trình thực hiện dịch vụ, trừ khi có sự đồng ý bằng văn bản của Bên A hoặc theo yêu cầu của cơ quan pháp luật có thẩm quyền.</p>

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

                            <h5>7. Trả Lương Và Bồi Thường</h5>
                            <p>Các Bên theo đây đồng ý rằng Bên B sẽ trả cho Bên C mức lương cơ bản là <strong>{salary} (VNĐ)</strong>, phải trả một tháng một lần và chịu các khoản khấu trừ và giữ lại thường xuyên theo yêu cầu của pháp luật.</p>
                            <p>- Xét rằng các Bên cũng đồng ý rằng tiền lương cơ bản có thể được tăng lên hàng năm với số tiền có thể được Bên B chấp thuận và khi tăng như vậy, số tiền tăng lên sau đó sẽ được coi là tiền lương hàng năm cho các mục đích của Thỏa thuận này.</p>

                            <h5>8. Quyền Lợi</h5>
                            <p>- Các Bên theo đây đồng ý rằng Bên C sẽ nhận được các phúc lợi (Bảo hiểm, Ngày lễ và Kỳ nghỉ) do Bên B cung cấp như được nêu dưới đây:<br />
                                <ul>
                                    {interviewDetail.interview.assign.recruitmentRequest.benefits.split("\n").map((str) =>
                                        <li>{str}</li>
                                    )}
                                </ul>
                            </p>

                            <h5>9. Giờ Làm Việc Và Địa Điểm</h5>
                            <p>- Bên C đồng ý sẽ làm việc từ thứ 2 đến thứ 6, nghỉ trưa 1 tiếng.<br />
                                - Cụ thể, Bên C đồng ý sẽ làm việc {interviewDetail.interview.assign.recruitmentRequest.typeOfWork}.<br />
                                - Địa điểm làm việc của Bên C sẽ được đặt tại {interviewDetail.interview.assign.recruitmentRequest.workLocation} hoặc địa điểm khác mà các Bên có thể thỏa thuận tùy từng thời điểm.<br />
                            </p>

                            <h5>10. Điều khoản khác</h5>
                            <h6 className="ml-22">7.1. Bên A và bên B cam kết thực hiện các điều khoản và điều kiện của hợp đồng này một cách nghiêm túc và trung thực.</h6>
                            <h6 className="ml-22">7.2. Bất kỳ sự thay đổi hoặc bổ sung nào của hợp đồng này phải được thực hiện bằng văn bản và có sự đồng ý của cả hai bên.</h6>
                            <h6 className="ml-22">7.3. Hợp đồng này sẽ có hiệu lực kể từ ngày ký kết và có thời hạn đến khi đủ điều kiện chấm dứt theo quy định của hợp đồng.</h6>
                            <h6 className="ml-22">7.4. Bên A và bên B sẽ giải quyết các tranh chấp phát sinh liên quan đến hợp đồng này bằng đàm phán và giải quyết hòa bình. Trong trường hợp không giải quyết được bằng đàm phán, tranh chấp sẽ được đưa ra trọng tài tại Công ty APITS, 1412, Đường Cầu Vồng 3, Phường Long Thạnh Mỹ, Quận 9, Hồ Chí Minh.</h6>

                            <p>Trong chứng nhận này, cả 3 bên đã xác nhận rằng họ đã đọc, hiểu và chấp nhận tất cả các điều khoản và điều kiện được ghi trong hợp đồng này. Hợp đồng này có giá trị pháp lý và có hiệu lực sau khi được ký và đóng dấu bởi hai bên.</p><br />

                            <div className="signature">
                                <div className="signature-left">
                                    <h6>Đại diện của bên A</h6>
                                    <p><label className="label-signature-name">Bên A:</label>Công ty APITS<br />
                                        <label className="label-signature-name">Đại diện:</label>Mr.A<br />
                                        <label className="label-signature-name">Chức vụ:</label>Director<br />
                                        <div>
                                            {`Ngày ${now.getDate()}, tháng ${now.getMonth()}, năm ${now.getFullYear()}`}
                                        </div>
                                    </p>
                                </div>
                                <div className="signature-left">
                                    <h6>Đại diện của bên B</h6>
                                    <p><label className="label-signature-name">Bên B:</label>{interviewDetail?.interview.assign.recruitmentRequest.creator.name}<br />
                                        <label className="label-signature-name">Đại diện:</label><br />
                                        <label className="label-signature-name">Chức vụ:</label><br />
                                    </p>
                                </div>
                                <div className="signature-left">
                                    <h6>Đại diện của bên C</h6>
                                    <p><label className="label-signature-name">Bên C:</label>{interviewDetail?.interview.assign.candidate.name}<br />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="btn-create">
                            <button className="btn btn-cancel" onClick={() => { setIsCreate(false) }}>Cancel</button>
                            <button className=" btn" onClick={() => { handleCreate() }}>Create</button>

                        </div>
                    </div>)
                    : null
            }

        </div>
    )
}

export default ContractCreatePage;