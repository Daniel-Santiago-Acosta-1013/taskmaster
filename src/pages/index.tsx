import { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import { getTasks, updateTask, createTask, deleteTask } from '../services/taskService';
import TaskModal from '../components/TaskModal';
import { Task } from '../types/task';
import Swal from 'sweetalert2';
import styles from '../styles/Home.module.css';

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

    const handleAddTaskClick = () => {
        setSelectedTask(undefined);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedTask(undefined);
        setIsModalOpen(false);
    };

    const handleSaveTask = async (task: Task) => {
        try {
            if (task._id) {
                const updatedTask = await updateTask(task._id, task);
                if (updatedTask) {
                    const updatedTasks = tasks.map(t => (t._id === task._id ? updatedTask : t));
                    setTasks(updatedTasks);
                    Swal.fire('Success', 'Task updated successfully', 'success');
                }
            } else {
                const newTask = await createTask(task);
                if (newTask) {
                    setTasks([...tasks, newTask]);
                    Swal.fire('Success', 'Task created successfully', 'success');
                }
            }
        } catch (error) {
            Swal.fire('Error', 'An error occurred while saving the task', 'error');
        } finally {
            handleModalClose();
        }
    };

    const handleDeleteTask = async (id: string) => {
        const deletedTask = await deleteTask(id);
        if (deletedTask) {
            const updatedTasks = tasks.filter(t => t._id !== id);
            setTasks(updatedTasks);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>My Task Board</h1>
            <p className={styles.subtitle}>Tasks to keep organised</p>
            <TaskList tasks={tasks} onTaskClick={handleTaskClick} />
            <div className={styles.addTaskCard} onClick={handleAddTaskClick}>
                <img src="./icons/Add_round_duotone.svg" alt="Add Task Icon" />
                <span>Add new task</span>
            </div>
            <TaskModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                task={selectedTask}
                onSave={handleSaveTask}
                onDelete={handleDeleteTask}
            />
        </div>
    );
}
