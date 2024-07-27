import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>{task.completed ? 'Completed' : 'Not Completed'}</p>
    </div>
  );
};

export default TaskItem;
