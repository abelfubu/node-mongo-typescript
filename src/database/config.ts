import mongoose from 'mongoose';

export const dbConnection = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_CONNECTION_STRING as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database Running!', db.connections[0].name);
  } catch (error) {
    console.log(error);
    throw Error('Something went wrong connecting to the database');
  }
};
