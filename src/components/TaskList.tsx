import { Task } from '../types/task';
import TaskItem from './TaskItem';
import styles from '../styles/Home.module.css';

interface TaskListProps {
    tasks: Task[];
    onTaskClick: (task: Task) => void;
}

const TaskList = ({ tasks, onTaskClick }: TaskListProps) => {
    return (
        <div className={styles.taskList}>
            {tasks.map((task) => (
                <div key={task._id} onClick={() => onTaskClick(task)}>
                    <TaskItem task={task} />
                </div>
            ))}
        </div>
    );
};

export default TaskList;
