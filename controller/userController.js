const User = require(`../model/userModel`);
const { StatusCodes } = require("http-status-codes");
const userController = {
  create: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      let data = await User.create({
        name,
        email,
        password,
        role,
      });
      res.status(StatusCodes.ACCEPTED).json({
        msg: "New user registered succesfully",
        user: data,
      });
    } catch (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      //if login through email
      if (email) {
        let extEmail = await User.findOne({ email });
        console.log(extEmail);
        if (!extEmail)
          return res
            .status(StatusCodes.CONFLICT)
            .json({ msg: `${email} is not registered`, success: false });

        //comparing the password(string,hash)
        console.log(password, extEmail.password);
        let isMatch = password === extEmail.password;
        if (!isMatch)
          return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ msg: `password not matched`, success: false });
        res.status(StatusCodes.OK).json({
          msg: `login success`,
          success: true,
          user: {
            email: extEmail.email,
            role: extEmail.role,
            username: extEmail.name,
            id:extEmail._id,
          },
        });
      }
    } catch (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: err.message, success: false });
    }
  },
  read: async (req, res) => {
    try {
      let id = req.params.id;
      let single = await User.findById({ _id: id });
      if (!single) return res.status(404).json({ msg: `requested not found` });
      res.status(200).json({ user: single });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  update: async (req, res) => {
    try {
      let id = req.params.id;
      let { name } = req.body;

      let single = await User.findById({ _id: id });
      if (!single)
        return res.status(400).json({ msg: `requested id not found` });

      await User.findByIdAndUpdate({ _id: id }, req.body);

      res.status(200).json({ msg: ` info updated succesfully`, user: single });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      let id = req.params.id;
      let { name } = req.body;

      let single = await User.findById({ _id: id });
      if (!single)
        return res.status(400).json({ msg: `requested id not found` });

      await User.findByIdAndDelete({ _id: id }, req.body);

      res.status(200).json({ msg: ` info deleted succesfully` });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  readall: async (req, res) => {
    try {
      let userList = await User.find({});

      let users = userList.filter((item) => item.role !== "admin");

      return res
        .status(StatusCodes.OK)
        .json({ length: users.length, users, success: true });
    } catch (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: err.message });
    }
  },
};
module.exports = userController;
