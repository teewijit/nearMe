const { v4: uuidV4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const {
  Sequelize,
  TblAnimal,
  ViewVetCard,
} = require("../entity");
const { Op } = Sequelize;

module.exports.Search = async (req, res) => {
  try {
    const stores = await ViewVetCard.findAll({
      where: {
        delete_by: {
          [Op.is]: null,
        },
      },
    });
    // console.log(stores);
    return res.json({ status: true, data: stores });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// สร้างข้อมูลร้าน
module.exports.Create = async (req, res) => {
  // const { storeName } = req.body;

  // const existingStore = await TblAnimal.findOne({
  //   where: {
  //     storeName,
  //   },
  // });

  // if (existingStore && existingStore.id !== req.params.id) {
  //   return res.status(500).json({
  //     message: "Clinic name is already",
  //   });
  // }

  try {
    if (req.file) {
      const extension = path.extname(req.file.originalname);
      const newFileName = `uploads/${uuidV4()}${extension}`;
      const fontPath = `C:/Users/Admin/Desktop/nearMe/client/public`;
      const filename = `${fontPath}/${newFileName}`;

      console.log(req.body);

      fs.rename(req.file.path, filename, (err) => {
        console.log(filename);
        if (err) {
          console.error(err);
          return res.status(500).json({
            message: "Error uploading file",
          });
        }
      });

      const { create_by, Hn, name, remark, sex, type_id,user_id } = req.body;
      const image = newFileName ? newFileName : null;

      if (!(create_by && Hn && name && remark && sex && type_id && user_id)) {
        res
          .status(400)
          .json({ message: "Bad request: missing required field(s)" });
        return;
      }

      const newUser = await TblAnimal.create({
        Hn,
        name,
        remark,
        sex,
        type_id,
        image,
        user_id,
        create_by,
        create_date: new Date(),
      });

      res.status(201).json({ status: true, message: "Create Success" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.SearchByID = async (req, res) => {
  try {
    const store = await ViewVetCard.findByPk(req.params.id, {
      where: {
        delete_by: {
          [Op.is]: null,
        },
      },
    });
    res.json(store);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// อัพเดทรายการสมัครสมาชิก
module.exports.Update = async (req, res) => {
  const { Hn, name, remark, type_id, sex, update_by } = req.body;
  console.log(req.params.id);
  // console.log(req.params.id);
  try {
    const animals_img = await TblAnimal.findByPk(req.params.id);
    let animalsImg = animals_img.image; // get the existing image name from the database
    console.log(animalsImg);
    if (req.file) {
      // if there's a new file, delete the old file and store the new one
      const extension = path.extname(req.file.originalname);
      const newFileName = `uploads/${uuidV4()}${extension}`;
      const fontPath = `C:/Users/Admin/Desktop/nearMe/client/public`;
      const filename = `${fontPath}/${newFileName}`;
      const oldname = `${fontPath}/${animalsImg}`;
      fs.unlinkSync(oldname); // delete the old file
      fs.renameSync(req.file.path, filename); // store the new file
      animalsImg = newFileName;
    }
    await TblAnimal.update(
      {
        Hn,
        name,
        remark,
        type_id,
        sex, // update the image name in the database
        update_by,
        update_date: new Date(),
        image:animalsImg,
      },
      { where: { id:req.params.id } }
    );
    res.status(200).json({ status: true, message: "Update Success" });
  } catch (error) {
    res.json({ message: error.message });
  }
};


module.exports.Delete = async (req, res) => {
  const { id } = req.body;

  if (!id) return res.json({ status: false, message: "ID is required" });

  const data = await TblAnimal.update(
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
