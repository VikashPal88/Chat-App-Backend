import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filderedUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filderedUsers);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.send(500).json({ error: "Interval server error" });
  }
};
