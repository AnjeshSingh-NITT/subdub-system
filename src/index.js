import 'dotenv/config';
import app from './app.js';
import connectDB from './database/index.js';

const PORT = process.env.PORT || 8000;

console.log("MONGODB_URI:", process.env.MONGODB_URI ? "Loaded" : "Not loaded");

connectDB()
.then(() => {
    const server = app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    })
    server.on("error", (error) => {
        console.error("Server error:", error);
    });
})
.catch((error) => {
    console.error("FAILED to connect to the database:", error);
});