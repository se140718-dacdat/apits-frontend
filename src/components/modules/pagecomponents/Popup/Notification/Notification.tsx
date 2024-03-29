import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { useEffect, useState } from "react";
import { NotificationEntity, Roles } from '../../../../../model';
import axios from '../../../../../api/axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';


const Notification = () => {
    const account = useSelector((state: any) => state.auth.login.currentUser);
    const user = useSelector((state: any) => state.user.user.user);
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState<NotificationEntity[]>([]);
    const [role, setRole] = useState<string>("");

    useEffect(() => {
        fetchData();
        console.log(notifications)
    }, [])

    const fetchData = async () => {
        let api = "";
        switch (account?.role.name) {
            case "CANDIDATE":
                api = "Candidate?candidateId=";
                setRole("candidate");
                break;
            case "ENTERPRISE":
                api = "Enterprise?enterpriseId=";
                setRole("enterprise");
                break;
            default:
                api = "Employee?employeeId=";
                setRole("employee");
                break;
        }
        await axios.get(`/notification/getAllNotificationBy${api}${user?.id}`).then((res) => {
            const data = res.data.data.listNotifications
            if (data !== null && data !== undefined) {
                setNotifications(data);
            }
        })
    }

    const handleClick = async (notification: NotificationEntity) => {
        if (!notification.read) {
            await axios.get(`/notification/updateisRead?notificationId=${notification.id}`).then((res) => {
                if (res.data.status === "SUCCESS") {
                    fetchData();
                }
            })
        }
        switch (notification.notificationType) {
            case "EVALUATION_SESSION":
                switch (role) {
                    case "candidate":
                        navigate("/candidate-evaluation");
                        break;
                    case "employee":
                        navigate("/professor-evaluation");
                        break;
                    default:
                        navigate("/");
                        break;
                }
                break;
            case "RECRUITMENT_REQUEST":
                navigate(`/post-detail/${notification?.recruitmentRequestId}`);
                break;
            case "ASSIGN":
                switch (role) {
                    case "candidate":
                        navigate(`/candidate-view-assign`)
                        break;
                    case "employee":
                        navigate(`/apply-management`)
                        break;
                    case "enterprise":
                        navigate(`/post-detail/${notification?.recruitmentRequestId}`)
                        break;
                    default:
                        navigate(`/`)
                        break;
                }
                break;
            default:
                break;
        }
    }

    return (
        <OverlayTrigger
            trigger="click"
            key={'bottom'}
            placement={'bottom'}
            overlay={
                <Popover id={`popover-positioned-bottom`} className='notification-popup-cover' style={{ minWidth: "250px" }}>
                    <Popover.Header as="h3">{`Notifications`} <a className='see-all' href='/notification'>See all</a></Popover.Header>
                    <Popover.Body className='notification-body'>
                        {
                            notifications !== undefined && notifications?.map((notification) => {
                                const arr = notification?.content?.split("\n", notification.content.length)
                                return (
                                    <div className={`notification-popup-item ${notification.read ? "opacity-5" : ""}`} key={notification.id} onClick={() => { handleClick(notification) }}>
                                        <strong>{notification.subject}</strong>
                                        <br></br>
                                        {
                                            (arr !== undefined && arr?.length < 1)
                                                ?
                                                (<div><span>You don't have any notifications</span></div>)
                                                :
                                                arr?.map((str, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <span>{str}</span>
                                                            <br></br>
                                                        </div>
                                                    )
                                                })
                                        }
                                    </div>
                                )
                            })
                        }
                    </Popover.Body>
                </Popover>
            }
        >
            <Badge badgeContent={notifications.filter((e) => e.read === false).length} className="navlink align-self" color="primary">
                <NotificationsIcon className='hover-primary icon' color="action" />
            </Badge>
        </OverlayTrigger>
    )
}

export default Notification