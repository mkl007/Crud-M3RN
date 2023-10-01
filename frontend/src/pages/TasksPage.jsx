import { ViewTasks } from '../components/ViewTasks'

export const TasksPage = () => {
  const taskpageDivStyle = {
    // background : "yelow",
    // boder:"2px solid blue",
  }
  return (
    <div className='' style={taskpageDivStyle}>
      <ViewTasks />
    </div>
  )
};
