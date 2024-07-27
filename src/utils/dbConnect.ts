import mongoose from 'mongoose';

interface Connection {
    isConnected?: number;
}

const connection: Connection = {};

async function dbConnect() {
    if (connection.isConnected) {
        return;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    }

    const db = await mongoose.connect(process.env.MONGODB_URI);

    connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
