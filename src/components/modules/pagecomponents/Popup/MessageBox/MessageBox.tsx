import './MessageBox.css';
import React, { Dispatch, FC, SetStateAction } from 'react';
interface Props {
    message: string;
    title: string;
    status: string;
    setMessage: Dispatch<SetStateAction<string>>
}
const MessageBox: FC<Props> = props => {
    return (
        <div>
            <div className="msg-request" style={{borderLeft: `4px solid ${props.status}`}}>
                <h4 className="msg-content">{props.message}</h4>
                <button className="msg-close" onClick={() => props.setMessage('')}><i className="pi pi-times-circle"></i></button>
            </div>
        </div>
    )
}

export default MessageBox
