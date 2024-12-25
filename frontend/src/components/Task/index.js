import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { ThreeDots } from "react-loader-spinner";
import {Link} from 'react-router-dom'
import { IoHome } from "react-icons/io5";
import { IoIosContact } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";





import './index.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const statusSelect = {
  pending: 'Pending',
  inProgress: 'In Progress',
  completed: 'Completed'
}

const priorityStatus = {
  low: 'Low',
  medium: 'Medium',
  high: 'High'
}

const requestStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  done: 'DONE',
  failed: 'FAILED',
  noData: 'NO DATA'
}

const Task = () => {
    const [todoData, setTodoData] = useState([])
    const [task, setTask] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState(statusSelect.pending)
    const [priority, setPriority] = useState(priorityStatus.low)
    const [error, setError] = useState('')
    const [dataStatus, setDataStatus] = useState(requestStatus.initial)
    const [editBtn, setEditBtn] = useState(false)
    const [updateTodoId, setUpdateTodoId] = useState('')
    const [filterTask, setFilterTask] = useState('All')
    

    const today = new Date().toISOString().split("T")[0];

    const [dueDate, setDueDate] = useState(today);
    
    const history = useHistory()


    const todosData = async () => {
      setDataStatus(requestStatus.progress)
      const url = 'https://task-backend-0qhe.onrender.com/tasks'
      const jwtToken = Cookies.get('jwt')
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`
        }
      })
      
      if (response.ok){
        const data = await response.json()
        if (data.length === 0){
          setDataStatus(requestStatus.noData)
          return
        }
        setDataStatus(requestStatus.done)
        setTodoData(data)
        setError('')
      } else {
        setDataStatus(requestStatus.failed)
        setError('Something went wrong')
      }
      
      
    }

    useEffect(() => {
      todosData()
    }, [])

    const onAddBtn = async () => {
      

      if (task === ''){
        setError('Please Enter Task Name')
        return
      } else if (description === ''){
        setError('Please Enter Description')
        return 
      }

      const todoTask = {
        title: task,task, status, description, priority, dueDate
      }



      try{
        const jwtToken = Cookies.get('jwt')
        const url = 'https://task-backend-0qhe.onrender.com/tasks'
        const response = await fetch(url,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
          },
          body: JSON.stringify(todoTask)
        })
      } catch (e) {
        return 
        
      }

      setError('')
      setStatus(statusSelect.pending)
      setTask('')
      setDescription('')
      todosData()
      setDueDate(today)
      setPriority(priorityStatus.low)
    }


    const onDeleteTodo = async (id) => {
      const url = `https://task-backend-0qhe.onrender.com/task/${id}`
      const jwtToken = Cookies.get('jwt')


      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`
        }
      });

      todosData()
    }
    

    const onEditTodo = async () => {
      const updateTodoData = {
        task: task,
        status,
        description,
        dueDate,
        priority,
      };
    
      console.log(updateTodoData);
      console.log(updateTodoId);
    
      const url = `https://task-backend-0qhe.onrender.com/task/${updateTodoId}`;
      const jwtToken = Cookies.get('jwt');
    
      try {
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(updateTodoData),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error updating task:', errorData.errorMsg);
          alert(`Failed to update task: ${errorData.errorMsg}`);
          return;
        }
    
        const responseData = await response.json();
        console.log('Task updated successfully:', responseData);
    
        
        setUpdateTodoId('');
        setEditBtn(false);
        setTask('');
        setDataStatus('');
        setPriority(priorityStatus.low);
        setStatus(statusSelect.pending);
        setDueDate(new Date().toISOString().split('T')[0]);
    
        
        todosData();
      } catch (error) {
        console.error('Failed to update task:', error);

      }
    };
    


    const onUpdateTodoId = (id) => {
      setEditBtn(true)
      setUpdateTodoId(id)
    }

    const onLogoutBtn = () => {
      Cookies.remove('jwt')
      return history.push('/login')
    }

    const filterData = filterTask !== 'All' ? todoData.filter(each => each.status === filterTask) : todoData

    return (
      <>
      {
        dataStatus === requestStatus.progress && <div className='page-center-position'>
          <div className="products-loader-container">
        <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
        </div>
      }

      {
        dataStatus === requestStatus.failed && <div className='page-center-position'>
          <div class="error-container">
          <h1>Something Went Wrong</h1>
          <p>We couldn't process your request. Please try again later.</p>
          <button class="retry-btn" onClick={todosData}>Retry</button>
      </div>
        </div>
      }

      {
        dataStatus === requestStatus.noData && 
        
        <div className="todos-container">
          <nav className='nav-bar'>
            <Link to='/'>
              <button type='button' className='hide-btn'>
                <IoHome className='icons'/>
              </button>
            </Link>
            <Link to='/profile'>
              <button type='button' className='hide-btn'>
                <IoIosContact className='icons' />
              </button>
            </Link>
            <Link to='/login'>
              <button type='button' className='hide-btn' onClick={onLogoutBtn}>
              <MdLogout className='icons' />
              </button>
            </Link>
          </nav>
        <h1 className="todos-header">
          <h1>Tasks List</h1>
        </h1>
        <div className="add-task-container">
          <input type="text" value={task} className="task-input" onChange={e => setTask(e.target.value)} placeholder="Task Name" />
          <select value={status} className="status-select" onChange={e => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
         
          
        </div>
        
        <textarea placeholder='Enter Description' className='description-box' onChange={e => setDescription(e.target.value)}></textarea>
        <div className='date-container'>
        <select value={priority} className="status-select priority-input-size" onChange={e => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
          className='priority-input-size'
            type="date"
            id="date"
            name="date"
            min={today}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div className='div-button-container'>
        {
            editBtn ? <button className="add-task-btn"  onClick={onEditTodo}>Save</button> : 
            <button className="add-task-btn" onClick={onAddBtn}>Add Task</button>
          }
          </div>
        {error && <p className="error">{error}</p>}
        <div className="no-data-container">
          <h1>No Task's Available</h1>
        </div>
      </div>    
      
      }

      {
        dataStatus === requestStatus.done && <div className="todos-container">
          <nav className='nav-bar'>
            <Link to='/'>
              <button type='button' className='hide-btn'>
                <IoHome className='icons'/>
              </button>
            </Link>
            <Link to='/profile'>
              <button type='button' className='hide-btn'>
                <IoIosContact className='icons' />
              </button>
            </Link>
            <Link to='/login'>
              <button type='button' className='hide-btn' onClick={onLogoutBtn}>
              <MdLogout className='icons' />
              </button>
            </Link>
          </nav>
        <h1 className="todos-header">
          <h1>Tasks List</h1>
        </h1>
        <div className="add-task-container">
          <input type="text" value={task} className="task-input" onChange={e => setTask(e.target.value)} placeholder="Task Name" />
          <select value={status} className="status-select" onChange={e => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
         
          
        </div>
        
        <textarea className='description-box' onChange={e => setDescription(e.target.value)}></textarea>
        <div className='date-container'>
        <select value={priority} className="status-select priority-input-size" onChange={e => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
          className='priority-input-size'
            type="date"
            id="date"
            name="date"
            min={today}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div className='div-button-container'>
        {
            editBtn ? <button className="add-task-btn"  onClick={onEditTodo}>Save</button> : 
            <button className="add-task-btn" onClick={onAddBtn}>Add Task</button>
          }
          </div>
        {error && <p className="error">{error}</p>}

        <select className="status-select filter-option" onChange={e => setFilterTask(e.target.value)}>
        <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        <ul className="todos-list">
          {
            filterData.map(each => (
              <li className="todo-item" key={each.id}>
                <div className="todo-content">
                  <p className="todo-title">{each.task}</p>
                  <p className="task-description">{each.description}</p>
                </div>
                <div className='status-container'>
                  <p className="todo-status todo">{each.status}</p>
                  <p className="todo-status todo">{each.priority}</p>
                </div>
                <div className='status-container'>
                <p className='due-date-heading'>Due Date</p>
                <p className='due-date'>{each.dueDate}</p>
                </div>
                <div className="todo-actions">
                  
                  <button className={editBtn ? 'edit-btn-disabled' : 'edit-btn'} onClick={() => onUpdateTodoId(each.id)} disabled={editBtn}>Edit</button>
                  <button className={editBtn ? 'delete-btn-disabled' : 'delete-btn'} onClick={() => onDeleteTodo(each.id)} disabled={editBtn}>Delete</button>
                </div>
                
                <div className='del-edit-container'>
                  <button className={editBtn ? 'edit-btn-disabled hide-btn-edit' : 'edit-btn hide-btn-edit'} onClick={() => onUpdateTodoId(each.id)} disabled={editBtn}><FaRegEdit className='edit-icon'/></button>
                  <button className={editBtn ? 'delete-btn-disabled hide-btn-delete' : 'delete-btn hide-btn-delete'} onClick={() => onDeleteTodo(each.id)} disabled={editBtn}><MdOutlineDelete className='del-icon' /></button>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
      }

      
    </>
    )
}

export default Task