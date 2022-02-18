import { gql } from '@apollo/client';

export const GET_WEIGHT = gql`
    query me {
        me {
            _id
            username
            email
            weight
            height
            age
            sex
            goal
        }
    }
`;