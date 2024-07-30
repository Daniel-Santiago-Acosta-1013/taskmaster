import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import Task from '../../../models/Task';

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const tasks = await Task.find({});
                res.status(200).json({ success: true, data: tasks });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const task = await Task.create(req.body);
                res.status(201).json({ success: true, data: task });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const { id } = req.query;
                const deletedTask = await Task.findByIdAndDelete(id);
                if (!deletedTask) {
                    return res.status(404).json({ success: false, message: 'Task not found' });
                }
                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const task = await Task.findByIdAndUpdate(req.query.id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!task) {
                    return res.status(404).json({ success: false, message: 'Task not found' });
                }
                res.status(200).json({ success: true, data: task });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PATCH':
            try {
                const task = await Task.findByIdAndUpdate(req.query.id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!task) {
                    return res.status(404).json({ success: false, message: 'Task not found' });
                }
                res.status(200).json({ success: true, data: task });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
};
