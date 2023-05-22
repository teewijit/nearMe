const { v4: uuidV4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const { Sequelize, TblStore, ViewStore } = require("../entity");
const { Op } = Sequelize;

module.exports.Search = async (req, res) => {
  try {
    const stores = await ViewStore.findAll({
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

// module.exports.Search = async (req, res) => {
//   try {
//     const stores = await sequelize.query(`
//       SELECT tblStore.*, tblUser.username
//       FROM tblStore
//       INNER JOIN tblUser ON tblStore.userId = tblUser.id;
//       `);
//     return res.json({ status: true, data: stores });
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// };

// เรียกดูรายการสมาชิกรายคน
module.exports.SearchByID = async (req, res) => {
  try {
    const stores = await TblStore.findByPk(req.params.id);
    res.json(stores);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// สร้างข้อมูลร้าน
module.exports.Create = async (req, res) => {
  const { storeName } = req.body;

  const existingStore = await TblStore.findOne({
    where: {
      storeName,
    },
  });

  if (existingStore && existingStore.id !== req.params.id) {
    return res.status(500).json({
      message: "Clinic name is already",
    });
  }
  try {
    if (req.file) {
      const extension = path.extname(req.file.originalname);
      const newFileName = `uploads/${uuidV4()}${extension}`;
      const fontPath = `C:/Users/Admin/Desktop/nearMe/client/public`;
      const filename = `${fontPath}/${newFileName}`;

      fs.rename(req.file.path, filename, (err) => {
        console.log(filename);
        if (err) {
          console.error(err);
          return res.status(500).json({
            message: "Error uploading file",
          });
        }
      });

      
    const {
      create_by,
      storeLat,
      storeLon,
      storeName,
      storeAddress,
      storeTel,
      storeOpen,
      storeClose,
      storeDetail,
      status,
      isVet,
    } = req.body;
    const storeImg = newFileName ? newFileName : null;

    const userId = create_by;

    if (
      !(
        create_by &&
        storeLat &&
        storeLon &&
        storeName &&
        storeAddress &&
        storeTel &&
        storeOpen &&
        storeClose &&
        storeDetail &&
        status &&
        isVet
      )
    ) {
      res
        .status(400)
        .json({ message: "Bad request: missing required field(s)" });
      return;
    }

    const newUser = await TblStore.create({
      storeName,
      storeImg,
      storeAddress,
      storeTel,
      storeOpen,
      storeClose,
      storeDetail,
      storeLon,
      storeLat,
      status,
      userId,
      create_by,
      create_date: new Date(),
      isVet,
    });

    res.status(201).json({ status: true, message: "Create Success" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// อัพเดทรายการสมัครสมาชิก
module.exports.Update = async (req, res) => {
  const {
    update_by,
    storeLat,
    storeLon,
    storeName,
    storeAddress,
    storeTel,
    storeOpen,
    storeClose,
    storeDetail,
    status,
    isVet,
  } = req.body;
  console.log(req.body.status);
  try {
    const stores = await TblStore.findByPk(req.params.id);
    let storeImg = stores.storeImg; // get the existing image name from the database
    if (req.file) {
      // if there's a new file, delete the old file and store the new one
      const extension = path.extname(req.file.originalname);
      const newFileName = `uploads/${uuidV4()}${extension}`;
      const fontPath = `C:/Users/Admin/Desktop/nearMe/client/public`;
      const filename = `${fontPath}/${newFileName}`;
      const oldname = `${fontPath}/${storeImg}`;
      fs.unlinkSync(oldname); // delete the old file
      fs.renameSync(req.file.path, filename); // store the new file
      storeImg = newFileName;
    }
    await TblStore.update(
      {
        storeName,
        storeAddress,
        storeTel,
        storeOpen,
        storeClose,
        storeDetail,
        storeLon,
        storeLat,
        storeImg, // update the image name in the database
        update_by,
        update_date: new Date(),
        isVet,
        status,
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json({ status: true, message: "Update Success" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// อัพเดทรายการสมัครสมาชิก
// module.exports.Update = async (req, res) => {
//   const {
//     update_by,
//     storeLat,
//     storeLon,
//     storeName,
//     storeAddress,
//     storeTel,
//     storeOpen,
//     storeClose,
//     storeDetail,
//     isVet,
//   } = req.body;
//   try {
//     await TblStore.update({
//       storeName,
//       storeAddress,
//       storeTel,
//       storeOpen,
//       storeClose,
//       storeDetail,
//       storeLon,
//       storeLat,
//       update_by,
//       update_date: new Date(),
//       isVet,
//     },{ where: { id: req.params.id } });
//     res.status(200).json({ status: true, message: "Update Success" });
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// };

// ลบรายการสมัครสมาชิก
module.exports.Delete = async (req, res) => {
  const { id } = req.body;

  if (!id) return res.json({ status: false, message: "ID is required" });

  const data = await TblStore.update(
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

// ลบรายการสมัครสมาชิกถาวร
// module.exports.Delete = async (req, res) => {
//   try {
//     await TblStore.destroy({
//       where: { id: req.params.id },
//     });
//     res.json({
//       message: "Delete Success",
//     });
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// };
