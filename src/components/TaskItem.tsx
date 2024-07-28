import { Task } from '../types/task';
import styles from '../styles/Home.module.css';

interface TaskItemProps {
    task: Task;
}

const statusColors = {
    'In Progress': '#E9A23B',
    'Completed': '#32D657',
    "Won't do": '#DD524C'
};

const TaskItem = ({ task }: TaskItemProps) => {
    return (
        <div className={styles.taskItem} style={{ borderLeft: `5px solid ${statusColors[task.status]}` }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
        </div>
    );
};

export default TaskItem;
