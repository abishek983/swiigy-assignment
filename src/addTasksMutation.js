import { gql } from '@apollo/client';

export const ADD_TASK_MUTATION = gql`
  mutation AddTask($task: String!, $tag: String!){
    insert_tasks(objects: {title: $task, 
    task_tags: {
    data:{
      tag: {
        data: {
          name: $tag
        }
      }
    }
    }
  })
  {
    affected_rows
  }
  }
`