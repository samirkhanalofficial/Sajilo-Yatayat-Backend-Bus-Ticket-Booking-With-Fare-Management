import User from "../model/user.model";
import { createUserType } from "../utils/types/user.type";

class UserRepository {
  constructor() {}

  addUser = async (user: createUserType) => {
    const adminData = new User(user);
    await adminData.save();
    return adminData;
  };
  getUserById = async (id: string) => {
    const user = await User.findById(id);
    return user;
  };
  getUserByPhone = async (mobile: string) => {
    const user = await User.findOne({ mobile });
    // console.log(user);
    return user;
  };
  getAllUser = async () => {
    const user = await User.find();
    return user;
  };

  updateUserDetails = async (userId: string, user: createUserType) => {
    const updatedUser = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });
    return updatedUser;
  };

  deleteUserById = async (userId: string) => {
    const user = await User.findByIdAndDelete(userId);
    return user;
  };
}
let userRepository = new UserRepository();

export { UserRepository, userRepository };
