import './App.css';
import {ShowTasks} from "./showTasks"
import {useState, useEffect} from "react"
import { gql, useQuery, useMutation } from '@apollo/client';

import {ADD_TASK_MUTATION} from "./addTasksMutation"

const GET_TAGS = gql`
  query Tags{
    tags{
      created_at
      id
      name
    }
  }
`;

const ADD_TASKS = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;


function App() {
  const [task , setTask] = useState('')
  const [tag , setTag] = useState('') 
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccsesMessage] = useState('')
  
  const { loading, error, data } = useQuery(GET_TAGS);
  const [insert_tasks] = useMutation(ADD_TASK_MUTATION, {
    onCompleted(data){
      onSuccess()
    },
    onError(message){
      newError(message)
    }
  })

  const newError = (message) => {
    console.log(typeof(message))
    setErrorMessage('data already exist')
    setTimeout(() => {
      setErrorMessage('')
    },1500)
  }

  const onSuccess = () => {
    setSuccsesMessage("Successfully added")
    setTimeout(() => {
      setSuccsesMessage('')
    },1500)
  }

  const handleInput = (e) => {
    setTask(e.target.value)
    switch(e.target.name){
      case "Tag":
        setTag(e.target.value)
        break
      case "Task":
        setTask(e.target.value)
        break
    }
  }
  // console.log(data, error)
  return (
    <div className="App" >
    {
      errorMessage !==' ' && 
        <h3 className="errorMessage">{errorMessage}</h3>
    }
    {
      successMessage !==' ' && 
        <h3 className="success">{successMessage}</h3>
    }
    <form className="form" onSubmit={(e) => {
      e.preventDefault();
      // addTask({variables: {task: "task", tag: "tag"}})
      insert_tasks({variables: {task: task, tag: tag}})
      console.log(task, tag)
    }}>
      Enter Task: <input type="text" name="Task" onChange={(e) => handleInput(e)} />
      Enter Tag: <input type="text" name="Tag" onChange={(e) => handleInput(e)}/>
      <input type="submit" value="Submit" />
    {/*<h3>Select from the available Tags</h3>
       <ul className="no-dots">
        {
          data && data.tags.map((tag,key) => {
            return (
              <li key={key}>
                <input type="checkbox" name={tag.name} value={tag.name} />
                <label for={tag.name}>{tag.name}</label>
              </li>
            )
          })
        }
      </ul> */}
    </form>
    <ShowTasks />
    </div>
  );
}

export default App;
