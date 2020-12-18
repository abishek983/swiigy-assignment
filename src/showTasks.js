import { SHOW_TASKS} from "./showTasksQuery"
import { useState } from "react"
import { useQuery, useMutation, gql } from '@apollo/client';

const DELETE_TASKS = gql`
mutation Delete($id: Int!){
    delete_tasks(where: {
      id: {
          _eq: $id
      }
    }){
      affected_rows
    }
  }
`

//update Task
// const UPDATE_TASKS = gql`
//     mutation UPDATE($start_time: Time){
//         update_tasks(_set: {
//         start_time: 1212
//         }, where: {
//         id:{
//             _eq: 
//         }
//         }){
//         affected_rows
//         returning
//         }
//     }
// `

//Delete Tags 
const DELETE_TAGS = gql`
    mutation DELETE($id: Int!){
        delete_tags(where: {
        id:{
            _eq: $id
        }
        }){
        affected_rows
        }
    }
`

//update Tags
const UPDATE_TASKS = gql`
    mutation UPDATE($title: String!, $id: Int!){
        update_tasks(_set: {
        title: $title
        }, where: {
        id:{
            _eq: $id
        }
        }){
        affected_rows
        }
  }
`
export const ShowTasks = () => {
    
    const { loading, error, data } = useQuery(SHOW_TASKS);
    
    const [delete_tasks] = useMutation(DELETE_TASKS,{
        onCompleted(){
        },
        refetchQueries: [
            { query: SHOW_TASKS }
        ]
    })
    
    const [delete_tags] = useMutation(DELETE_TAGS, {
        onCompleted(){
            console.log("complete")
        }
    })

    const [update_tasks] = useMutation(UPDATE_TASKS,{
        refetchQueries: [
            { query: SHOW_TASKS }
        ]
    })
    
    //states
    const [newTask, setNewTask] = useState('')
    const [inputTask, setInputTask] = useState(false)

    const handleTaskDelete = (e) => {
        delete_tasks({variables: {id: e.target.id}})
    }

    const handleTagDelete = (e) => {
        delete_tags({variables: {id: e.target.id}})
    }

    // sending timestamp but mutation throwing error
    const upDateTime = (e) => {
        const d = new Date()
        console.log(d.getTime())
    }

    const updateTask = (e) => {
        update_tasks({variables: {title: newTask, id: e.target.id}})
    }



    return (
        <>
        <div>
            <div className="flex">
                <p>Task Title</p>
                <p>Tag</p> 
                <p>Start Time</p>
                <p>End Time</p>
            </div>
            {/* <div className="task-column">
                <h5>Task Tile</h5>
                <h5>Tag</h5>
                <h5>Start Time</h5>
                <h5>End Time</h5>
            </div> */}
            {
                data && 
                data.tasks.map((task, key) => {
                    return(
                        <div key={key} id={task.id} className="flex">
                            {console.log(task)}
                            <div>
                                {
                                    !inputTask ? 
                                    <p>{task.title}</p>:
                                    <input id={task.id} type="text" onSubmit={(e) => updateTask(e)}></input>
                                }
                                <button id={task.id} onClick={(e) => setInputTask(!inputTask)}>Edit</button>
                                <button id={task.id} onClick={(e) => handleTaskDelete(e)}>Delete</button>
                            </div>
                            <div>
                                <p>{task.tags[0].name}</p>
                                <button>Edit</button>
                                <button id={task.id} onClick={(e) => handleTagDelete(e)}>Delete</button>
                            </div>
                            <div>
                                 <p>{task.tags[0].start_time ? task.tags[0].start_time : "00:00"}</p>
                                <button onClick={(e) => upDateTime(e)}>Start</button>
                            </div>
                            <div>
                                <p>{task.tags[0].end_time ? task.tags[0].end_time : "00:00"}</p>
                                <button onClick={(e) => upDateTime(e)}>End</button>
                            </div>
                        </div>
                    ) 
                }
                )
                
            }
        </div>
        </>
    )
}
