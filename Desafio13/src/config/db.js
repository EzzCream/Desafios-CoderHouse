import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log(`----------------------------------------------`);
		console.log(`Conectados a Mongo ✨`);
		console.log(`----------------------------------------------`);
	}
});

export default mongoose;
