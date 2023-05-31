import { Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../../api/axios';
import { AssignResponse, CandidateAssignRow } from '../../../entity';
import { getDaysLeft, openNewTab } from '../../../handle';
import { currencyMaskString } from '../../../mask';
import { Progress, Status, Tracking } from "../../../model";
import MessageBox from '../../modules/pagecomponents/Popup/MessageBox/MessageBox';
import "./CandidateViewAssign.css";
import { ProgressBar } from 'react-bootstrap';
import { ApplyTracking } from '../../../Models';

const CandidateViewAssign = () => {
  const user = useSelector((state: any) => state.user.user.user);

  const [assigns, setAssigns] = useState<AssignResponse[]>([]);
  const [assignTrackings, setAssignTrackings] = useState<ApplyTracking[]>([]);
  const [assignTracking, setAssignTracking] = useState<ApplyTracking>();
  const [message, setMessage] = useState<string>('');
  const [messageStatus, setMessageStatus] = useState('');

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async (): Promise<ApplyTracking[]> => {
    setAssignTrackings([])
    const response = await axios.get<{ data: AssignResponse[] }>(`/apply/getListAssignByCandidateId?candidateId=${user?.id}`);
    const data: AssignResponse[] = response?.data?.data;
    setAssigns(data);
    if (data.length > 0 && data.find((e: AssignResponse) => e.status === "DONE")) {
      const tmp = data.find((e: AssignResponse) => e.status === "DONE")
      if (tmp !== undefined) {
        let item: AssignResponse;
        item = tmp;
        await axios.get(`/apply-history/trackingStatusByApply?applyId=${item.id}`).then((res) => {
          setAssignTracking({
            apply: item,
            tracking: res.data.data
          })
        })
      }
    } else if (data.length > 0) {
      data.map(async (item) => {
        await axios.get(`/apply-history/trackingStatusByApply?applyId=${item.id}`).then((res) => {
          setAssignTrackings((prevTrackings) => [...prevTrackings, {
            apply: item,
            tracking: res.data.data
          }])
        })
      })
    }
    return assignTrackings;
  }


  const handleConfirmAssign = async (id: number) => {
    await axios.put(`/apply/approvedByCandidate/{id}?id=${id}&candidateId=${user?.id}`).then((res) => {
      if (res.data.status === "SUCCESS") {
        fetchData();
        setMessage(res.data.message);
        setMessageStatus("green");
      } else {
        setMessage("Confirm fail! Please try again");
        setMessageStatus("red");
      }
    })
  }

  return (
    <div id='CandidateViewAssign'>
      {
        message != '' ?
          <MessageBox status={messageStatus} message={message} setMessage={setMessage} title='inasd'></MessageBox>
          :
          null
      }
      <h2>List job for you</h2>
      {
        (assignTracking !== undefined)
          ?
          (
            <table className='table-job'>
              <thead>
                <tr>
                  <th className='col1'>ID</th>
                  <th className='col2'>Post</th>
                  <th className='col3'>Company</th>
                  <th className='col4'>Position</th>
                  <th className='col5'>Salary</th>
                  <th className='col6'>Deadline</th>
                </tr>
              </thead>
              <tbody>
                <Fragment>
                  <tr>
                    <td className='col1'>{assignTracking.apply.id}</td>
                    <td className='col2 link' onClick={() => { openNewTab(`/post-detail/${assignTracking.apply.recruitmentRequest.id}`) }}>{assignTracking.apply.recruitmentRequest.title}</td>
                    <td className='col3'>{assignTracking.apply.recruitmentRequest.creator.name}</td>
                    <td className='col4'>{assignTracking.apply.recruitmentRequest.specialtyExperience.experience.name} {assignTracking.apply.recruitmentRequest.specialtyExperience.specialty.name}</td>
                    <td className='col5'>{currencyMaskString(assignTracking.apply.recruitmentRequest.salaryDetail)}đ</td>
                    <td className='col6'>{getDaysLeft(assignTracking.apply.recruitmentRequest?.createAt, assignTracking.apply.recruitmentRequest?.expiryDate) > 0 ? `${getDaysLeft(assignTracking.apply.recruitmentRequest?.createAt, assignTracking.apply.recruitmentRequest?.expiryDate)} days left to apply` : "Expired"}</td>
                  </tr>
                  <tr>
                    <td className='tracking-container' colSpan={6}>
                      <div className='tracking'>
                        <ProgressBar className='progress' variant="success" now={Progress.DONE} />
                        <div className='tracking-detail'>
                          <div className="tracking-item">
                            <span className="tracking-item-name primary-color">
                              Pending
                            </span>
                            <span className="tracking-item-time">
                              {assignTracking.tracking.find((e) => e.status === "PENDING")?.date}
                            </span>
                          </div>
                          <div className="tracking-item">
                            <span className="tracking-item-name primary-color">
                              Confirmed
                            </span>
                            <span className="tracking-item-time">
                              {assignTracking.tracking.find((e) => e.status === "CONFIRMED")?.date}
                            </span>
                          </div>
                          <div className="tracking-item">
                            <span className="tracking-item-name primary-color">
                              Evaluating
                            </span>
                            <span className="tracking-item-time">
                              {assignTracking.tracking.find((e) => e.status === "EVALUATING")?.date}
                            </span>
                          </div>
                          <div className="tracking-item">
                            <span className="tracking-item-name primary-color">
                              Approved
                            </span>
                            <span className="tracking-item-time">
                              {assignTracking.tracking.find((e) => e.status === "WIN")?.date}
                            </span>
                          </div>
                          <div className="tracking-item">
                            <span className="tracking-item-name primary-color">
                              Done
                            </span>
                            <span className="tracking-item-time">
                              {assignTracking.tracking.find((e) => e.status === "DONE")?.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </Fragment>
              </tbody>
            </table>
          )
          : (assignTracking === undefined && assignTrackings.length > 0)
            ?
            (
              <table className='table-job'>
                <thead>
                  <tr>
                    <th className='col1'>ID</th>
                    <th className='col2'>Post</th>
                    <th className='col3'>Company</th>
                    <th className='col4'>Position</th>
                    <th className='col5'>Salary</th>
                    <th className='col6'>Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    assignTrackings?.map((assign) => {
                      let progress = 0;
                      switch (assign.apply.status) {
                        case "CONFIRMED":
                          progress = Progress.CONFIRMED;
                          break;
                        case "EVALUATING":
                          progress = Progress.EVALUATING;
                          break;
                        case "WIN":
                          progress = Progress.WIN;
                          break;
                        case "DONE":
                          progress = Progress.DONE;
                          break;
                        default:
                          progress = Progress.PENDING;
                      }
                      return (
                        <Fragment>
                          <tr>
                            <td className='col1'>{assign.apply.id}</td>
                            <td className='col2 link' onClick={() => { openNewTab(`/post-detail/${assign.apply.recruitmentRequest.id}`) }}>{assign.apply.recruitmentRequest.title}</td>
                            <td className='col3'>{assign.apply.recruitmentRequest.creator.name}</td>
                            <td className='col4'>{assign.apply.recruitmentRequest.specialtyExperience.experience.name} {assign.apply.recruitmentRequest.specialtyExperience.specialty.name}</td>
                            <td className='col5'>{currencyMaskString(assign.apply.recruitmentRequest.salaryDetail)}đ</td>
                            <td className='col6'>{getDaysLeft(assign?.apply.recruitmentRequest?.createAt, assign?.apply.recruitmentRequest?.expiryDate) > 0 ? `${getDaysLeft(assign?.apply.recruitmentRequest?.createAt, assign?.apply.recruitmentRequest?.expiryDate)} days left to apply` : "Expired"}</td>
                            {
                              (assign.apply.status === "PENDING") ?
                                <td className='col7'>
                                  <Button variant="contained" color="success" onClick={() => { handleConfirmAssign(assign.apply.id) }}>
                                    Confirm
                                  </Button>
                                </td>
                                : null
                            }
                          </tr>
                          <tr>
                            <td className='tracking-container' colSpan={7}>
                              <div className='tracking'>
                                <ProgressBar className='progress' variant="success" now={progress} />
                                <div className='tracking-detail'>
                                  {
                                    (assign.tracking.find((e) => e.status === "PENDING"))
                                      ? (
                                        <div className="tracking-item">
                                          <span className="tracking-item-name primary-color">
                                            Pending
                                          </span>
                                          <span className="tracking-item-time">
                                            {assign.tracking.find((e) => e.status === "PENDING")?.date}
                                          </span>
                                        </div>
                                      )
                                      :
                                      (
                                        <div className="tracking-item">
                                          <span className="tracking-item-name">
                                            Pending
                                          </span>
                                        </div>
                                      )
                                  }
                                  {
                                    (assign.tracking.find((e) => e.status === "CONFIRMED"))
                                      ? (
                                        <div className="tracking-item">
                                          <span className="tracking-item-name primary-color">
                                            Confirmed
                                          </span>
                                          <span className="tracking-item-time">
                                            {assign.tracking.find((e) => e.status === "CONFIRMED")?.date}
                                          </span>
                                        </div>
                                      )
                                      :
                                      (
                                        <div className="tracking-item">
                                          <span className="tracking-item-name">
                                            Confirmed
                                          </span>
                                        </div>
                                      )
                                  }
                                  {
                                    (assign.tracking.find((e) => e.status === "EVALUATING"))
                                      ? (
                                        <div className="tracking-item">
                                          <span className="tracking-item-name primary-color">
                                            Evaluating
                                          </span>
                                          <span className="tracking-item-time">
                                            {assign.tracking.find((e) => e.status === "EVALUATING")?.date}
                                          </span>
                                        </div>
                                      )
                                      :
                                      (
                                        <div className="tracking-item">
                                          <span className={`tracking-item-name ${assign.tracking.find((e) => e.status === "EVALUATING") ? "primary-color" : ""}`}>
                                            Evaluating
                                          </span>
                                        </div>
                                      )
                                  }
                                  {
                                    (assign.tracking.find((e) => e.status === "WIN"))
                                      ? (
                                        <div className="tracking-item">
                                          <span className="tracking-item-name primary-color">
                                            Approved
                                          </span>
                                          <span className="tracking-item-time">
                                            {assign.tracking.find((e) => e.status === "WIN")?.date}
                                          </span>
                                        </div>
                                      )
                                      :
                                      (
                                        <div className="tracking-item">
                                          <span className={`tracking-item-name ${assign.tracking.find((e) => e.status === "WIN") ? "primary-color" : ""}`}>
                                            Approved
                                          </span>
                                        </div>
                                      )
                                  }
                                  {
                                    (assign.tracking.find((e) => e.status === "DONE"))
                                      ? (
                                        <div className="tracking-item">
                                          <span className="tracking-item-name primary-color">
                                            Done
                                          </span>
                                          <span className="tracking-item-time">
                                            {assign.tracking.find((e) => e.status === "DONE")?.date}
                                          </span>
                                        </div>
                                      )
                                      :
                                      (
                                        <div className="tracking-item">
                                          <span className={`tracking-item-name ${assign.tracking.find((e) => e.status === "DONE") ? "primary-color" : ""}`}>
                                            Done
                                          </span>
                                        </div>
                                      )
                                  }
                                </div>
                              </div>
                            </td>
                          </tr>
                        </Fragment>
                      )
                    })
                  }
                </tbody>
              </table>
            )
            :
            <h5 style={{ textAlign: "center", width: "100%", marginTop: "3%" }}>List is empty</h5>
      }
    </div>
  )
}

export default CandidateViewAssign