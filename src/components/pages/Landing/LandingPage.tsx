import { FC, useEffect } from 'react'
import "./LandingPage.css"
import { useSelector } from 'react-redux';
import { Roles } from '../../../model';
import LandingContent from './LandingContent';


const LandingPage: FC = () => {
    const user = useSelector((state: any) => state.auth.login.currentUser);
    const role = user?.roleId;

    const roleHandler = () => {
        switch (role) {
            case Roles.Candidate:
                return (
                    <div>Candidate Landing Page</div>
                )
            default:
                return (
                    <LandingContent/>
                )

        }
    }
    return (
        <div id="LandingPage">
           { roleHandler()}
        </div>

    )
}

export default LandingPage;
