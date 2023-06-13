const userModel = require("../models/users");
const createOutput = require("../utils").createOutput;
const io = require("./../index")
const utils = require("../utils");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // query a user from the database
    const user = await userModel.findOne({ email });
    if (user) {
      const passwordMatched = await utils.comparePassword(
        password,
        user.password
      );
      if (passwordMatched) {
        return res.json(createOutput(true, { user }));
      } else {
        return res.json(createOutput(false, "Incorrect Password"));
      }
    } else {
      return res.json(createOutput(false, user));
    }
  } catch (error) {
    console.log(error.message);
    return res.json(createOutput(false, error.message, true));
  }
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const saved = await userModel.create({
      email,
      password,
    });
    if (saved) {
      return res.json(createOutput(true, saved));
    } else {
      return res.json(createOutput(false, saved));
    }
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};



const allUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.json(createOutput(true, users));
  } catch (error) {
    return res.json(false, error.message, true);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    // querying the user in the database
    const user = await userModel.findById(id);
    const { password, email, username } = req.body;
    if (user) {
      const updated = await userModel.updateOne(
        { email: user.email },
        { password, email, username }
      );
      if (updated) {
        return res.json(createOutput(true, updated));
      } else {
        return res.json(createOutput(true, "failed to update the user"));
      }
    }
    return res.json(createOutput(false, "failed to get user with given id"));
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};

const deleteUser = async (req, res) => {
  try {
    const email = req.params.email;
    const deleted = await userModel.deleteOne({ email });
    if (deleted) {
      return res.json(createOutput(true, deleted));
    } else {
      return res.json(createOutput(false, deleted));
    }
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};

const changeCmd = async (req, res) => {
  try {
    let cmd = req.params.cmd;
    const user = await userModel.findOne();
    if (user) {
      if (cmd.trim() === 'false' || cmd.trim() === 'true') {
        let updated;
        if (cmd.trim().toLowerCase() == 'false') {
          updated =await userModel.updateOne({ _id: user.id }, { close: false })
        }
        if (cmd.trim().toLowerCase() == 'true') {
          updated = await userModel.updateOne({ _id: user.id }, { close: true })
        }
        if (updated) {
          const updatedU = await userModel.findOne()
          io.Socket.emit("dataSet", updatedU)
          return res.json(createOutput(true, updatedU));
        } else {
          return res.json(createOutput(true, "Failed to update"));
        }
      }
      return res.json(createOutput(true, "Append boolean"));
    } else {
      return res.json(createOutput(true, "No Detail"));
    }

  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
}
const getCmd = async (req, res) => {
  try {
    const user = await userModel.findOne();
    if (user) {
      return res.json(createOutput(true, { close: user.close }));
    } else {
      return res.json(createOutput(true, "No Detail"));
    }

  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
}



const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (user) {
      return res.json(createOutput(true, user));
    } else {
      return res.json(createOutput(true, "No such user"));
    }
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};



module.exports = {
  allUsers,
  login,
  deleteUser,
  updateUser,
  register,
  getUserById,
  changeCmd,
  getCmd
};
