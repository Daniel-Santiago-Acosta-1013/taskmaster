import { useState, useEffect } from 'react';
import { Task } from '../types/task';
import styles from '../styles/Home.module.css';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    task?: Task;
    onSave: (task: Task) => void;
}

const statusOptions = [
    { value: 'In Progress', label: 'In Progress', color: '#E9A23B', icon: './icons/Time_atack_duotone.svg' },
    { value: 'Completed', label: 'Completed', color: '#32D657', icon: './icons/Done_round_duotone.svg' },
    { value: "Won't do", label: "Won't do", color: '#DD524C', icon: './icons/close_ring_duotone.svg' }
];

const TaskModal = ({ isOpen, onClose, task, onSave }: TaskModalProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<'In Progress' | 'Completed' | "Won't do">('In Progress');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
        } else {
            setTitle('');
            setDescription('');
            setStatus('In Progress');
        }
    }, [task]);

    const handleSubmit = () => {
        const updatedTask: Task = {
            ...task,
            title,
            description,
            status,
            completed: task?.completed || false
        };
        onSave(updatedTask);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <span className={styles.close} onClick={onClose}>
                        <img src="./icons/close_ring_duotone-1.svg" alt="Close" />
                    </span>
                    <h2>{task ? 'Edit Task' : 'New Task'}</h2>
                </div>

                <div className={styles.formInput}>
                    <label>Task name</label>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.input}
                    />
                </div>

                <div className={styles.formInput}>
                    <label>Description</label>
                    <textarea
                        placeholder="Enter a short description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={styles.textarea}
                    />
                </div>

                <div className={styles.formInput}>
                    <label>Status</label>
                    <div className={styles.statusOptions}>
                        {statusOptions.map((option) => (
                            <div key={option.value} className={styles.statusOption} >
                                <input
                                    type="radio"
                                    id={option.value}
                                    name="status"
                                    value={option.value}
                                    checked={status === option.value}
                                    onChange={() => setStatus(option.value as 'In Progress' | 'Completed' | "Won't do")}
                                />
                                <label htmlFor={option.value} >
                                    <img src={option.icon} alt={option.label} style={{ backgroundColor: option.color }}/>
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <button onClick={handleSubmit} className={styles.addButton}>
                    {task ? 'Save Changes' : 'Add Task'}
                </button>
            </div>
        </div>
    );
};

export default TaskModal;
