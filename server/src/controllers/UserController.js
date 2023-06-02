const { Sequelize, TblUser, ViewUser } = require("../entity");
const { Op } = Sequelize;

// เรียกดูรายการสมาชิกทั้งหมด
module.exports.Search = async (req, res) => {
  try {
    const users = await ViewUser.findAll({
      where: {
        delete_by: {
          [Op.is]: null,
        },
      },
    });
    return res.json({ status: true, data: users });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// เรียกดูรายการสมาชิกรายคน
module.exports.SearchByID = async (req, res) => {
  try {
    const user = await TblUser.findByPk(req.params.id);
    res.json(user);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.Create = async (req, res) => {
  try {
    const {
      username,
      password,
      first_name,
      last_name,
      brithday,
      sex,
      tel,
      email,
      role_id,
    } = req.body;
    console.log(req.body);

    if (
      !(
        username &&
        password &&
        first_name &&
        last_name &&
        brithday &&
        sex &&
        tel &&
        email &&
        role_id
      )
    ) {
      res
        .status(400)
        .json({ message: "Bad request: missing required field(s)" });
      return;
    }

    // check user already exist
    const oldUser = await TblUser.findOne({ where: { username } });

    if (oldUser) {
      return res
        .status(409)
        .json({ status: false, message: "User already exists. Please Login" });
    }

    bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
      if (err) {
        res.status(500).json({ status: false, message: "User already" });
        return;
      }

      const newUser = await TblUser.create({
        username,
        password: hashedPassword,
        first_name,
        last_name,
        brithday,
        tel,
        email,
        sex,
        role_id,
        approve: "0",
        create_date: new Date(),
      });

      res.status(201).json({ status: true, message: "Create Success" });
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
module.exports.Update = async (req, res) => {
  const {
    approve,
    username,
    password,
    first_name,
    last_name,
    brithday,
    sex,
    tel,
    role_id,
    email,
    update_by,
  } = req.body;
  console.log(req.body);

  try {
    // Check if a new password is provided
    if (password) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Update the user's password and other information
      await TblUser.update(
        {
          password: hashedPassword,
          first_name,
          last_name,
          brithday,
          sex,
          tel,
          role_id,
          update_by,
          update_date: new Date(),
        },
        { where: { id: req.params.id } }
      );
    } else {
      // Update the user's information excluding the password
      await TblUser.update(
        {
          approve,
          username,
          first_name,
          last_name,
          brithday,
          sex,
          tel,
          role_id,
          email,
          update_by,
          update_date: new Date(),
        },
        { where: { id: req.params.id } }
      );
    }

    res.status(200).json({ status: true, message: "Update Success" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// ลบรายการสมัครสมาชิก
module.exports.Delete = async (req, res) => {
  const { id } = req.body;
  console.log(req.body);

  if (!id) return res.json({ status: false, message: "ID is required" });

  const data = await TblUser.update(
    { delete_date: new Date(), delete_by: req.user.id },
    {
      where: {
        id: id,
        delete_date: {
          [Op.is]: null,
        },
      },
    }
  );

  if (data[0] < 1)
    return res.json({
      status: false,
      message: "Failed to delete, please try again",
    });

  return res.json({ status: true, message: "Delete success" });
};

module.exports.getProfile = async (req, res) => {
  try {
    const user = req.user;
    const userData = await TblUser.findOne({
      attributes: [
        "id",
        "username",
        "password",
        "first_name",
        "last_name",
        "brithday",
        "sex",
        "tel",
        "email",
        "role_id",
        "create_date",
      ],
      where: { id: user.id },
    });
    return res.json({
      status: true,
      message: "Successful get profile",
      data: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Error occurred while retrieving profile",
      data: null,
    });
  }
};

module.exports.checkPass = async (req, res) => {
  const { password } = req.body; // The password entered by the user in the request body
  const user = await TblUser.findOne({
    where: { id: req.params.id }, // Assuming you're fetching the user based on the ID in the request params
  });
  console.log(req.body);
  if (!user) {
    // If user is not found, return an error response
    return res.json({
      status: false,
      message: "Failed, user not found",
    });
  }
  if (!password) {
    // If user is not found, return an error response
    return res.json({
      status: false,
      message: "Failed, password not found",
    });
  }
  let matchedPassword = bcrypt.compareSync(password.toString(), user.password);

  if (!matchedPassword) {
    // If the entered password doesn't match the stored password, return an error response
    return res.json({
      status: false,
      message: "Password not match",
    });
  }

  // If the entered password matches the stored password, return a success response
  return res.json({
    status: true,
    message: "Password is match",
  });
};
