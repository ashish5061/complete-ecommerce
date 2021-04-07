import mongoose from 'mongoose'



const URL = ' mongodb+srv://Ashish:anger@cluster0.uyypd.mongodb.net/proshop?retryWrites=true'
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB