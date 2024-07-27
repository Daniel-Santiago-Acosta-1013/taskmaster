import mongoose, { Document, Model, Schema } from 'mongoose';

interface ITask extends Document {
    title: string;
    description: string;
    completed: boolean;
}

const TaskSchema: Schema = new Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

const Task: Model<ITask> = mongoose.models.Task || mongoose.model('Task', TaskSchema);

export default Task;
