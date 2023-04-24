import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import {useEffect} from "react";



const Notification = ()  => {

    useEffect (() => {
        // fetchData();
    }, [])

    
    
    return (
        <OverlayTrigger
            trigger="click"
            key={'bottom'}
            placement={'bottom'}
            overlay={
                <Popover id={`popover-positioned-bottom`} className='notification-popup-cover'>
                    <Popover.Header as="h3">{`Notifications`} <a className='see-all' href='/notification'>See all</a></Popover.Header>
                    <Popover.Body>
                        <div className='notification-popup-item'>
                            <strong>You have Assigned!</strong>
                            <br></br>
                            <span>We assign you to FPT Software Company</span>
                        </div>
                        <div className='notification-popup-item'>
                            <strong>You have Assigned!</strong>
                            <br></br>
                            <span>We assign you to FPT Software Company</span>
                        </div>
                    </Popover.Body>
                </Popover>
            }
        >
            <FontAwesomeIcon icon={faBell} className="navlink align-self hover-primary icon" />
        </OverlayTrigger>
    )
}

export default Notification