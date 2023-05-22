const { TblRole, Seq } = require('../entity')

// เรียกดูรายการสมาชิกทั้งหมด
module.exports.Search = async (req, res) => {
  try {
    const stores = await TblRole.findAll();
    res.json(stores);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// เรียกดูรายการสมาชิกรายคน
module.exports.SearchByID = async (req, res) => {
  try {
    const stores = await TblRole.findByPk(req.params.id);
    res.json(stores);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// สร้างข้อมูลร้าน
module.exports.Create = async (req, res) => {
  try {
    await TblRole.create({
      ...req.body
    });
    res.json({ message: "Create Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// อัพเดทรายการสมัครสมาชิก
module.exports.Update = async (req, res) => {
  try {
    await TblRole.update(req.body, { where: { id: req.params.id } });
    res.json({
      message: "Update Success",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// ลบรายการสมัครสมาชิก
module.exports.Delete = async (req, res) => {
  try {
    await TblRole.destroy({
      where: { id: req.params.id },
    });
    res.json({
      message: "Delete Success",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
