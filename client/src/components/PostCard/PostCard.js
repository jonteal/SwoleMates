import React from "react";
import { Button } from "react-bootstrap";
import { Card, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';

const PostCard = ({ post: { body, createdAt, id, firstName, likeCount, commentCount, likes }}) => {
    return (
        <Card>
            <Card.Content>
                <Image />
                <Card.Header>{firstName}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>

            <Card.Content extra>
                <div className="ui two buttons">
                    <Button basic color="green">
                        Approve
                    </Button>
                    <Button basic color="red">
                        Decline
                    </Button>
                </div>
            </Card.Content>
        </Card>
    )
}

export default PostCard;