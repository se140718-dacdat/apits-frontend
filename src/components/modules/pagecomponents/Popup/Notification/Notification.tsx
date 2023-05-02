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
                setRole("professor");
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
            case "INTERVIEW":
                navigate(`/${role}-interview?id=${notification.tempId}`);
                break;
            case "CONTRACT_LABOR":
                navigate(`/contract`);
                break;
            case "CONTRACT_AGREEMENT":
                navigate(`/contract`);
                break;
            case "ASSIGN": 
                if (role === "candidate") {
                    navigate(`/candidate-view-assign?id=${notification.tempId}`)
                } else if (role === "enterprise") {
                    navigate(`/profile`)
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
                            notifications?.map((notification) => {
                                const arr = notification.content.split("\n", notification.content.length)
                                return (
                                    <div className={`notification-popup-item ${notification.read ? "opacity-5" : ""}`} key={notification.id} onClick={() => { handleClick(notification) }}>
                                        <strong>{notification.title}</strong>
                                        <br></br>
                                        {
                                            (arr.length < 1)
                                                ?
                                                (<div><span>You don't have any notifications</span></div>)
                                                :
                                                arr.map((str, index) => {
                                                    return (
                                                        <div>
                                                            <span key={index}>{str}</span>
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
            <Badge badgeContent={notifications.length} className="navlink align-self" color="primary">
                <NotificationsIcon className='hover-primary icon' color="action" />
            </Badge>
        </OverlayTrigger>
    )
}

export default Notification