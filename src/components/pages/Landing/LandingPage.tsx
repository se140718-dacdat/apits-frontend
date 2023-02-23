import React, { FC, useEffect, useState } from 'react'
import "./LandingPage.css"
import { useSelector } from 'react-redux';
import { Roles } from '../../../model';


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
                    <div>Landing Page</div>
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
