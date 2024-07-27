import { Task } from '../types/task';
import styles from '../styles/Home.module.css';

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <div className={styles.taskItem}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>{task.completed ? 'Completed' : 'Not Completed'}</p>
    </div>
  );
};

export default TaskItem;
