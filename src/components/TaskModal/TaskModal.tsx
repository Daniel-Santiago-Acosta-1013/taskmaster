import { useState, useEffect } from 'react';
import { Task } from '../../types/task';
import Swal from 'sweetalert2';
import styles from './TaskModal.module.css';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    task?: Task;
    onSave: (task: Task) => void;
    onDelete: (id: string) => void;
}

const statusOptions = [
    { value: 'In Progress', label: 'In Progress', color: '#E9A23B', icon: './icons/Time_atack_duotone.svg' },
    { value: 'Completed', label: 'Completed', color: '#32D657', icon: './icons/Done_round_duotone.svg' },
    { value: "Won't do", label: "Won't do", color: '#DD524C', icon: './icons/close_ring_duotone.svg' }
];

const TaskModal = ({ isOpen, onClose, task, onSave, onDelete }: TaskModalProps) => {
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

    const handleDelete = () => {
        if (task && task._id) {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed && task._id) {
                    onDelete(task._id);
                    onClose();
                    Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
                }
            });
        }
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
                            <div key={option.value} className={`${styles.statusOption} ${status === option.value ? styles.selectedStatus : ''}`}>
                                <input
                                    type="radio"
                                    id={option.value}
                                    name="status"
                                    value={option.value}
                                    checked={status === option.value}
                                    onChange={() => setStatus(option.value as 'In Progress' | 'Completed' | "Won't do")}
                                />
                                <img src={option.icon} alt={option.label} style={{ backgroundColor: option.color }} />
                                <label htmlFor={option.value} >
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.buttonsContainer}>
                    <button onClick={handleSubmit} className={styles.addButton}>
                        {task ? 'Save Changes' : 'Add Task'}
                    </button>
                    {task && (
                        <button onClick={handleDelete} className={styles.deleteButton}>
                            Delete Task
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
