import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import Task from '../../../models/Task';

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { id },
        method,
    } = req;

    switch (method) {
        case 'GET':
            try {
                const task = await Task.findById(id);
                if (!task) {
                    return res.status(404).json({ success: false, message: 'Task not found' });
                }
                res.status(200).json({ success: true, data: task });
            } catch (error) {
                res.status(400).json({ success: false, message: error instanceof Error ? error.message : 'An unknown error occurred' });
            }
            break;
        case 'PUT':
            try {
                const task = await Task.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!task) {
                    return res.status(404).json({ success: false, message: 'Task not found' });
                }
                res.status(200).json({ success: true, data: task });
            } catch (error) {
                res.status(400).json({ success: false, message: error instanceof Error ? error.message : 'An unknown error occurred' });
            }
            break;
        case 'PATCH':
            try {
                const task = await Task.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!task) {
                    return res.status(404).json({ success: false, message: 'Task not found' });
                }
                res.status(200).json({ success: true, data: task });
            } catch (error) {
                res.status(400).json({ success: false, message: error instanceof Error ? error.message : 'An unknown error occurred' });
            }
            break;
        case 'DELETE':
            try {
                const deletedTask = await Task.findByIdAndDelete(id);
                if (!deletedTask) {
                    return res.status(404).json({ success: false, message: 'Task not found' });
                }
                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false, message: error instanceof Error ? error.message : 'An unknown error occurred' });
            }
            break;
        default:
            res.status(400).json({ success: false, message: 'Method not allowed' });
            break;
    }
};
