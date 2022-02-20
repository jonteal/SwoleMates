import React from "react";
import { Card, Icon } from 'semantic-ui-react'
import './personalProfile.css';

const PersonalProfile = () => {
    return (
        <>
        <Card className="personalProfileCard"
            header='Eric Martin'
            meta='Friend'
            description='Eric is a full stack web developer and enjoys spending time with his family.'
            // extra={extra}
        />
        </>
    )
}

export default PersonalProfile;