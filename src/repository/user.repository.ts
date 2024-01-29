import User from "../model/user.model";
import { createUserType, userType } from "../utils/types/user.type";

class UserRepository {
  constructor() {}

  addUser = async (user: createUserType): Promise<userType> => {
    const adminData = new User(user);
    await adminData.save();
    return adminData;
  };
  getUserById = async (id: string): Promise<userType | null> => {
    const user = await User.findById(id);
    return user;
  };
  getUserByPhone = async (mobile: string): Promise<userType> => {
    const user = await User.findOne({ mobile });
    return user;
  };
  getAllUser = async (): Promise<userType[]> => {
    const user = await User.find();
    return user;
  };

  updateUserDetails = async (
    userId: string,
    user: createUserType
  ): Promise<userType> => {
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
