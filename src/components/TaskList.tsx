import { Task } from '../types/task';
import TaskItem from './TaskItem';

interface TaskListProps {
    tasks: Task[];
}

const TaskList = ({ tasks }: TaskListProps) => {
    return (
        <div>
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} />
            ))}
        </div>
    );
};

export default TaskList;
