import { useState, useEffect } from 'react';
import { Task } from '../types/task';
import styles from '../styles/Home.module.css';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    task?: Task;
    onSave: (task: Task) => void;
}

const TaskModal = ({ isOpen, onClose, task, onSave }: TaskModalProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setCompleted(task.completed);
        } else {
            setTitle('');
            setDescription('');
            setCompleted(false);
        }
    }, [task]);

    const handleSubmit = () => {
        const updatedTask: Task = {
            ...task,
            title,
            description,
            completed: completed || false
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

                <button onClick={handleSubmit} className={styles.addButton}>
                    {task ? 'Save Changes' : 'Add Task'}
                </button>
            </div>
        </div>
    );
};

export default TaskModal;
