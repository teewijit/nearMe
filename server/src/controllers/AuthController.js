const { TblUser, TblUserSession, Seq } = require("../entity");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { logger } = require("../utils");
const { v4: uuidV4 } = require("uuid");

module.exports.singIn = async (req, res) => {
  const { username, password } = req.body;

  const user = await TblUser.findOne({
    where: { username },
    plain: true,
  });
  if (!user) {
    logger.http(req, 200, `Failed to sing in, not found user by ${username}`);
    return res.json({
      status: false,
      message: `Failed to sing in, please try again`,
    });
  }

  let matchedPassword = await bcrypt.compareSync(password, user.password);
  if (!matchedPassword) {
    logger.http(req, 200, `Failed to sing in, invalid password by ${username}`);
    return res.json({
      status: false,
      message: `Failed to sing in, please try again`,
    });
  }

  if (user.approve === 0) {
    logger.http(req, 200, `Wait to Admin approve your account ${username}`);
    return res.json({
      status: false,
      message: `Wait to Admin approve your account`,
    });
  }

  const payload = { id: user.id };
  let tokenUID = uuidV4();
  let refreshTokenUID = uuidV4();
  const token = jwt.sign(
    { uid: tokenUID, user: payload },
    process.env.JWT_SECRET,
    {
      algorithm: "HS256",
      expiresIn: "5m",
    }
  );
  const refreshToken = jwt.sign(
    { uid: refreshTokenUID, user: payload },
    process.env.JWT_SECRET,
    {
      algorithm: "HS256",
      expiresIn: "1d",
    }
  );

  const existingSession = await TblUserSession.findOne({ where: { user_id: user.id } });
  if (existingSession) {
    await TblUserSession.update(
      { ac_uid: tokenUID, rf_uid: refreshTokenUID },
      { where: { user_id: user.id } }
    );
  } else if(!existingSession){
    let created_user_session = await TblUserSession.create(
      {
        user_id: user.id,
        ac_uid: tokenUID,
        rf_uid: refreshTokenUID,
      }
    );
    logger.http(
      req,
      200,
      `Not found session for userid ${user.id}, create new session id ${created_user_session.id}`
    );
    // console.log(created_user_session);
    // return res.send({created_user_session})
  }  

  let options = {};
  res.cookie("ac", token, { ...options, maxAge: 1000 * 60 * 5 });
  res.cookie("rf", refreshToken, { ...options, maxAge: 1000 * 60 * 60 * 24 });

  logger.http(
    req,
    200,
    `Successful sing in, ac_uid ${tokenUID} | rf_uid ${refreshTokenUID}`
  );
  return res.send({
    status: true,
    message: "Successful sing in",
    data: {
      role_id: user.role_id,
      tokenUID,
      refreshTokenUID
    },
  });
};

module.exports.singOut = async (req, res) => {
  const userid = req.user.id;

  const updateUserSession = await TblUserSession.update(
    { ac_uid: null, rf_uid: null },
    { where: { user_id: userid }, returning: true }
  );
  if (updateUserSession[0] < 1) {
    logger.http(req, 200, `Not found session for userid ${userid}`);
    return res.json({
      status: false,
      message: `Failed to sing out, please try again`,
    });
  }

  return res.json({ status: true, message: `Successful sing out` });
};
