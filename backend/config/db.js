import mongoose from "mongoose";

export const connectDB = async () => {

    await mongoose.connect('mongodb+srv://pawankdtu1_db_user:pqqlcg8vO5IgFy3a@cluster0.totjlsd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log("DB Connected"));

}


// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.