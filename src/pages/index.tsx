import { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { getTasks, updateTask } from '../services/taskService';
import styles from '../styles/Home.module.css';
import TaskModal from '../components/TaskModal';
import { Task } from '../types/task';

export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

    useEffect(() => {
        async function fetchData() {
            const tasks = await getTasks();
            setTasks(tasks || []);
        }

        fetchData();
    }, []);

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedTask(undefined);
        setIsModalOpen(false);
    };

    const handleSaveTask = async (task: Task) => {
        if (task._id) {
            await updateTask(task._id, task);
            const updatedTasks = tasks.map(t => (t._id === task._id ? task : t));
            setTasks(updatedTasks);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>My Task Board</h1>
            <p className={styles.subtitle}>Tasks to keep organised</p>
            <TaskForm />
            <TaskList tasks={tasks} onTaskClick={handleTaskClick} />
            <TaskModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                task={selectedTask}
                onSave={handleSaveTask}
            />
        </div>
    );
}
