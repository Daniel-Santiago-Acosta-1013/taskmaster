const TaskItem = ({ task }) => {
    return (
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>{task.completed ? 'Completed' : 'Not Completed'}</p>
      </div>
    );
  };
  
  export default TaskItem;
  