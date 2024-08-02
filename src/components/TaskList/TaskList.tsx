import { Task } from '../../types/task';
import TaskItem from '../TaskItem/TaskItem';
import styles from './TaskList.module.css';

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
