import { useEffect } from 'react'
import { useTasks } from '../context/TaskContext'

export const Test = () => {
  const { Tasks, getTasks } = useTasks()

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {/* <h1>Test{console.log(Tasks)}</h1> */}
      <h1>Test</h1>
      {
        Tasks ? (
          Tasks.map(task => (
            <div key={task._id}>Title: {task.title}{console.log('Here from there is tasks')}</div>
          ))
        ) : (
          <div>There is no taskes perro</div>
        )
      }
    </div>
  )
}