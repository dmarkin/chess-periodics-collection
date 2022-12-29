import mongoose from 'mongoose';
import chalk from 'chalk';

export const connectToDB = async () => {
    // if (mongoose.connections[0]) return;

    await mongoose
        .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.olh9bsx.mongodb.net/?retryWrites=true&w=majority`)
        .then(() => console.log(chalk.green('Connected!')))
        .catch((error) => console.log(chalk.red(`Connection Error: ${error}`)));
};
