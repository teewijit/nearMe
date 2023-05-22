const { v4: uuidV4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const {
  Sequelize,
  TblAppointment,
  ViewAppointment,
} = require("../entity");
const { Op } = Sequelize;

module.exports.Search = async (req, res) => {
  try {
    const stores = await ViewAppointment.findAll({
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

  try {
      const { create_by, time, date, animal_id,user_id,tel,store_id } = req.body;
console.log(req.body);
      if (!(create_by && animal_id && user_id && time && date && tel && store_id)) {
        res
          .status(400)
          .json({ message: "Bad request: missing required field(s)" });
        return;
      }

      const newAppointment = await TblAppointment.create({
        store_id,
        animal_id,
        user_id,
        time,
        date,
        create_by,
        tel,
        status: "รออนุมัติ",
        action: "ยังไม่ดำเนินการ",
        create_date: new Date(),
      });

      res.status(201).json({ status: true, message: "Create Success" });
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
  const { status, update_by,action } = req.body;
  console.log(req.params.id);
  // console.log(req.params.id);
  try {
    const resulte = await TblAppointment.update(
      {
        status,
        action,
        update_by,
        update_date: new Date(),
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

  const data = await TblAppointment.update(
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
