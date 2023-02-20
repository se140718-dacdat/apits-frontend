import React, { FC } from 'react'
import "./Login.css"

interface Props {
    display: string;
}
const Login: FC<Props> = (props) => {
    return (
        <div id="Login" className={`${props.display}`}>
            <div className="popup">
                
            </div>
        </div>
    )
}

export default Login;