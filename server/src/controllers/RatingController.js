const { TblRating, Seq } = require('../entity')

// เรียกดูข้อมูลทั้งหมด
module.exports.Search = async (req, res) => {
  try {
    const stores = await TblRating.findAll();
    res.json(stores);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// เรียกดูข้อมูลตามไอดี
module.exports.SearchByID = async (req, res) => {
  try {
    const stores = await TblRating.findByPk(req.params.id);
    res.json(stores);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// สร้างข้อมูล
module.exports.Create = async (req, res) => {
  try {
    await TblRating.create({
      ...req.body
    });
    res.json({ message: "Create Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// อัพเดทข้อมูล
module.exports.Update = async (req, res) => {
    console.log(req.body);
  try {
    await TblRating.update(req.body, { where: { id: req.params.id } });
    res.json({
      message: "Update Success",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// ลบข้อมูล
module.exports.Delete = async (req, res) => {
  try {
    await TblRating.destroy({
      where: { id: req.params.id },
    });
    res.json({
      message: "Delete Success",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
