import React from "react";
import { Card, Icon } from 'semantic-ui-react';
import './personalProfile.css';
import { useQuery } from '@apollo/client';
import { GET_ME } from "../../utils/queries";

const PersonalProfile = () => {

    const { loading, data } = useQuery(GET_ME);

    if (data) {
        console.log(data);
    }

    return (
        <>
        <Card className="personalProfileCard"
            header='Eric Martin'
            meta='User'
            description='Eric is a full stack web developer and enjoys spending time with his family.'
            // extra={extra}
        />

        </>
    )
}

export default PersonalProfile;