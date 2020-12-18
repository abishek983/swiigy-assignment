import { gql } from '@apollo/client';

export const SHOW_TASKS = gql`
    query Tasks{
        tasks{
        id
        title
        start_time
        end_time
        tags{
            name
        }
        }
    }
`
