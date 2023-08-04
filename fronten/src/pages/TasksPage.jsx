import React, { useEffect } from 'react'
import { useAuth } from '../context/authContext'
import { useTasks } from '../context/TaskContext';
import VerNotas from '../Components/VerNotas';
import { useNavigate } from 'react-router-dom';

export default function TasksPage() {
  const { getTasks, tasks, isAuthenticated } = useTasks();
  const navigate = useNavigate();

  useEffect(() => {
    getTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container'>
      <div className>

        <h1>TasksPage!</h1>
        {
          <VerNotas />
        }
      </div>
    </div>
  )
}
