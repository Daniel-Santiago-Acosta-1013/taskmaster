import { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { getTasks } from '../services/taskService';

export default function Home() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const tasks = await getTasks();
            setTasks(tasks);
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>TaskMaster</h1>
            <TaskForm />
            <TaskList tasks={tasks} />
        </div>
    );
}
