CREATE TABLE tblRole (
  id SERIAL PRIMARY KEY,
  name TEXT,
  update_by INTEGER,
  update_date DATE,
  create_by INTEGER,
  create_date DATE,
  delete_by INTEGER,
  delete_date DATE
);

CREATE TABLE tblUser (
  id SERIAL PRIMARY KEY,
  username TEXT,
  password TEXT,
  first_name TEXT,
  last_name TEXT,
  brithday DATE,
  sex TEXT,
  tel INTEGER,
  email TEXT,
  role_id INTEGER,
  approve INTEGER,
  update_by INTEGER,
  update_date DATE,
  create_by INTEGER,
  create_date DATE,
  delete_by INTEGER,
  delete_date DATE
);

CREATE TABLE tblStore (
  id SERIAL PRIMARY KEY,
  storeName TEXT,
  storeImg TEXT,
  storeAddress TEXT,
  storeTel INTEGER,
  storeOpen INTEGER,
  storeClose INTEGER,
  storeDetail TEXT,
  storeLon TEXT,
  storeLat TEXT,
  isVet TEXT,
  status TEXT,
  userId INTEGER,
  update_by INTEGER,
  update_date DATE,
  create_by INTEGER,
  create_date DATE,
  delete_by INTEGER,
  delete_date DATE
);

CREATE TABLE tb_user_session (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  ac_uid TEXT,
  rf_uid TEXT,
  update_date TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES tb_user(id)
);

CREATE TABLE tblAnimal (
  id SERIAL PRIMARY KEY,
  Hn TEXT,
  name TEXT,
  remark TEXT,
  sex TEXT,
  type_id TEXT,
  image TEXT,
  update_by INTEGER,
  update_date DATE,
  create_by INTEGER,
  create_date DATE,
  delete_by INTEGER,
  delete_date DATE
);

CREATE TABLE tblType (
  id SERIAL PRIMARY KEY,
  name TEXT,
  update_by INTEGER,
  update_date DATE,
  create_by INTEGER,
  create_date DATE,
  delete_by INTEGER,
  delete_date DATE
);

CREATE TABLE tblAppointment (
  id SERIAL PRIMARY KEY,
  animal_id INTEGER,
  user_id INTEGER,
  date TEXT,
  time TIME,
  update_by INTEGER,
  update_date DATE,
  create_by INTEGER,
  create_date DATE,
  delete_by INTEGER,
  delete_date DATE
);

CREATE TABLE tblAnimalOwner (
  user_id INTEGER,
  animal_id INTEGER,
  remark TEXT,
  date TEXT,
  update_by INTEGER,
  update_date DATE,
  create_by INTEGER,
  create_date DATE,
  delete_by INTEGER,
  delete_date DATE
);

CREATE VIEW view_vet_card AS
SELECT
  a.id,
  a.id AS animal_id,
  a.user_id,
  a.name AS animal_name,
  a.sex AS animal_sex,
  t.name AS type_name,
  t.id AS type_id,
  u.first_name AS first_name,
  u.last_name AS last_name,
  u.tel,
  a.remark,
  a.image,
  a.Hn,
  COALESCE(create_by.first_name, '-') AS create_by,
  COALESCE(a.create_date, '-') AS create_date,
  COALESCE(update_by.first_name, '-') AS update_by,
  COALESCE(a.update_date, '-') AS update_date,
  delete_by.first_name AS delete_by,
  delete_by.delete_date AS delete_date
FROM
  tblanimal AS a
  INNER JOIN tbluser AS u ON u.id = a.user_id
  INNER JOIN tbltype AS t ON a.type_id = t.id
  LEFT JOIN tbluser AS create_by ON a.create_by = create_by.id
  LEFT JOIN tbluser AS update_by ON a.update_by = update_by.id
  LEFT JOIN tbluser AS delete_by ON a.delete_by = delete_by.id
WHERE
  a.delete_by IS NULL
ORDER BY
  a.user_id;

CREATE VIEW view_appointment AS
SELECT
  ap.id,
  ap.time,
  ap.date,
  a.id AS animal_id,
  a.user_id,
  a.name AS animal_name,
  a.sex AS animal_sex,
  t.name AS type_name,
  t.id AS type_id,
  u.first_name AS first_name,
  u.last_name AS last_name,
  u.tel,
  a.remark,
  a.image,
  a.Hn,
  ap.status,
  ap.action,
  s.storeName AS store_name,
  COALESCE(create_by.first_name, '-') AS create_by,
  COALESCE(ap.create_date, '-') AS create_date,
  COALESCE(update_by.first_name, '-') AS update_by,
  COALESCE(ap.update_date, '-') AS update_date,
  delete_by.first_name AS delete_by,
  delete_by.delete_date AS delete_date
FROM
  tblappointment AS ap
  INNER JOIN tbluser AS u ON ap.user_id = u.id
  INNER JOIN tblanimal AS a ON ap.animal_id = a.id
  INNER JOIN tbltype AS t ON a.type_id = t.id
  INNER JOIN tblstore AS s ON ap.store_id = s.id
  LEFT JOIN tbluser AS create_by ON ap.create_by = create_by.id
  LEFT JOIN tbluser AS update_by ON ap.update_by = update_by.id
  LEFT JOIN tbluser AS delete_by ON ap.delete_by = delete_by.id
WHERE
  ap.delete_by IS NULL
ORDER BY
  ap.id