import dotenv from "dotenv"
import users from "./data/users.js"
import Order from "./models/orderModel.js"
import User from "./models/userModel.js"
import connectDB from "./config/db.js"
import Maid from "./models/maidModel.js"
import maids from "./data/maids.js"

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Maid.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[2]._id

    const sampleMaids = maids.map(p => {
      return { ...p, user: adminUser }
    })

    await Maid.insertMany(sampleMaids)
    console.log("Data Imported!")
    process.exit()
  } catch (error) {
    console.error(`Error: ${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Maid.deleteMany()
    await User.deleteMany()

    console.log("Data Destroyed!")
    process.exit()
  } catch (error) {
    console.error(`Error: ${error}`)
  }
}

if (process.argv[2] == "-d") {
  destroyData()
} else {
  importData()
}
