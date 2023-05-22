const { Sequelize, TblType } = require("../entity");
const { Op } = Sequelize;

// เรียกดูรายการสมาชิกทั้งหมด
module.exports.Search = async (req, res) => {
  try {
    const users = await TblType.findAll({
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