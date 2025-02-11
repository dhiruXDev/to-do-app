import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import Loading from '../Loading/Loading';
import { getUserToken } from '../../helper/token';
import Edit from "./Edit";
import Navbar from '../Navbar';
import Delete from "./Delete";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [taskErr, setTaskErr] = useState('');
  useEffect(() => {
    setLoading(true)
    todolistFetch();
  }, []);

  const todolistFetch = () => {
    fetch(`${API_BASE_URL}/todo`, {
      headers: {
        'Authorization': `${getUserToken()}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setTasks(data)
        setLoading(false)
      });
  }

  const handleNewTaskChange = event => {
    setNewTask(event.target.value);
    setTaskErr('');
  };

  const handleNewTaskSubmit = event => {
    event.preventDefault();
    if (CheckValidation()) {

      setLoading(true)
      fetch(`${API_BASE_URL}/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${getUserToken()}`,
        },
        body: JSON.stringify({ title: newTask })
      })
        .then(response => response.json())
        .then(data => {
          todolistFetch();
          setNewTask('');
          setLoading(false)
        });
    }

  };

  const CheckValidation = () => {
    let isValid = true;
    if (!newTask) {
      isValid = false;
      setTaskErr('This field is required');
    }

    return isValid;
  }

  const handleTaskDelete = (id) => {
    setLoading(true)
    setDeleteId(id);
    setDeleteModal(!deleteModal);

  };
  const handleTaskEdit = (item) => {
    setLoading(true);
    setEditModal(!editModal);
    // setTitle(item.title)
    setEditData({ 'item_id': item._id, 'title': item.title })

    setLoading(false)
  };

  const closeModal = () => {
    setEditModal(!editModal); todolistFetch();
  };

  const closeDeleteModal = () => {
    setDeleteModal(!deleteModal);
    todolistFetch();
  };
  return (
    <>
      <Navbar />
      <Edit data={editData} open={editModal} close={closeModal} />
      <Delete deleteId={deleteId} open={deleteModal} close={closeDeleteModal} />
      <div className="container py-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card card-outline-secondary rounded-0">              
              {loading && <Loading />}
              <div className="card-body">
                <form onSubmit={handleNewTaskSubmit}>
                  <div className='form-group'>
                    <label>New Task: </label>
                      <input className='form-control' type="text" value={newTask} onChange={handleNewTaskChange} />
                      <p className='text-danger'>{taskErr ? taskErr : ''}</p>                     
                  </div>
                  <button className='btn btn-primary' type="submit">Add Task</button>
                </form>
                
              </div> 
                          
            </div>
            <ul className='d-flex flex-wrap list-group border-0 gap-2 mt-4'>
              {tasks.map(task => (
                <li className='list-group-item border-0 pl-0 pr-0 mr-0' key={task._id}>
                  <span className='mr-2'>{task.title}</span>
                  <button className='mr-0 btn-sm btn btn-danger float-right' onClick={() => handleTaskDelete(task._id)}>Delete</button>
                  <button className='mr-2 btn-sm btn btn-secondary float-right' onClick={() => handleTaskEdit(task)}>Edit</button>

                  
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoApp;
