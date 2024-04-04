-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2024 at 06:29 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nearme`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblanimal`
--

CREATE TABLE `tblanimal` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `Hn` text DEFAULT NULL,
  `name` text DEFAULT NULL,
  `remark` text DEFAULT NULL,
  `sex` text DEFAULT NULL,
  `type_id` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `update_by` int(11) DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  `create_by` int(11) DEFAULT NULL,
  `create_date` date DEFAULT NULL,
  `delete_by` int(11) DEFAULT NULL,
  `delete_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblanimal`
--

INSERT INTO `tblanimal` (`id`, `user_id`, `Hn`, `name`, `remark`, `sex`, `type_id`, `image`, `update_by`, `update_date`, `create_by`, `create_date`, `delete_by`, `delete_date`) VALUES
(1, 2, '5555555', 'น้องดำ', 'test', 'เมีย', '1', 'uploads/0c1e1a31-20b4-4630-9567-40214e9f6915.png', NULL, NULL, 2, '2023-05-31', 2, '2023-05-31'),
(2, 2, '5555555', 'น้องดำ', 'test', 'เมีย', '1', 'uploads/72ce76cf-38c4-4af0-8133-ed9481f0f8f2.png', NULL, NULL, 2, '2023-05-31', 2, '2023-05-31'),
(3, 2, '5555555', 'น้องดำ', 'test', 'เมีย', '1', 'uploads/599290bb-c9c3-498d-a0ef-bb24a605288e.png', NULL, NULL, 2, '2023-05-31', 2, '2023-06-03'),
(4, 2, '5555555', 'น้องดำ', 'test', 'เมีย', '1', 'uploads/013f46fd-4988-486c-af41-7c264e1dfc96.png', NULL, NULL, 2, '2023-05-31', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tblanimalowner`
--

CREATE TABLE `tblanimalowner` (
  `user_id` int(11) DEFAULT NULL,
  `animal_id` int(11) DEFAULT NULL,
  `remark` text DEFAULT NULL,
  `date` text DEFAULT NULL,
  `update_by` int(11) DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  `create_by` int(11) DEFAULT NULL,
  `create_date` date DEFAULT NULL,
  `delete_by` int(11) DEFAULT NULL,
  `delete_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tblappointment`
--

CREATE TABLE `tblappointment` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `store_id` int(11) NOT NULL,
  `animal_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `date` text DEFAULT NULL,
  `time` time DEFAULT NULL,
  `status` text NOT NULL,
  `action` text NOT NULL,
  `update_by` int(11) DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  `create_by` int(11) DEFAULT NULL,
  `create_date` date DEFAULT NULL,
  `delete_by` int(11) DEFAULT NULL,
  `delete_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tblrole`
--

CREATE TABLE `tblrole` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` text DEFAULT NULL,
  `update_by` int(11) DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  `create_by` int(11) DEFAULT NULL,
  `create_date` date DEFAULT NULL,
  `delete_by` int(11) DEFAULT NULL,
  `delete_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblrole`
--

INSERT INTO `tblrole` (`id`, `name`, `update_by`, `update_date`, `create_by`, `create_date`, `delete_by`, `delete_date`) VALUES
(1, 'admin', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'user', NULL, NULL, 1, '2023-05-31', NULL, NULL),
(3, 'clinic', NULL, NULL, 1, '2023-05-31', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tblstore`
--

CREATE TABLE `tblstore` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `storeName` text DEFAULT NULL,
  `storeImg` text DEFAULT NULL,
  `storeAddress` text DEFAULT NULL,
  `storeTel` int(11) DEFAULT NULL,
  `storeOpen` int(11) DEFAULT NULL,
  `storeClose` int(11) DEFAULT NULL,
  `storeDetail` text DEFAULT NULL,
  `storeLon` text DEFAULT NULL,
  `storeLat` text DEFAULT NULL,
  `isVet` int(2) DEFAULT NULL,
  `status` text DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `update_by` int(11) DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  `create_by` int(11) DEFAULT NULL,
  `create_date` date DEFAULT NULL,
  `delete_by` int(11) DEFAULT NULL,
  `delete_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tblstore`
--

INSERT INTO `tblstore` (`id`, `storeName`, `storeImg`, `storeAddress`, `storeTel`, `storeOpen`, `storeClose`, `storeDetail`, `storeLon`, `storeLat`, `isVet`, `status`, `userId`, `update_by`, `update_date`, `create_by`, `create_date`, `delete_by`, `delete_date`) VALUES
(2, 'JJ Mall', 'uploads/468244b9-56ad-48ad-8051-b6ad86cd56de.jpg', 'พระราม2 จตุจัก กรุงเทพ', 938432222, 23, 15, 'test', '100.5484948', '13.8024898', 0, 'approve', 3, 1, '2023-05-31', 3, '2023-05-31', NULL, NULL),
(3, 'jod', 'uploads/33e3b87b-1ec7-4632-8c58-bedaaef84b8f.jpg', '22', 111111111, 5, 15, 'test edit', '100.4256871', '13.779206', 0, 'approve', 3, 1, '2023-06-03', 3, '2023-06-03', NULL, NULL),
(4, 'จรัญ', 'uploads/2a424cb5-daf3-48f6-b0f6-5fd1253fc963.png', '100/2 bkk', 2311123, 8, 21, 'test', '100.47074317932129', '13.739635210411013', 1, 'approve', 1, 1, '2024-02-09', 1, '2024-02-09', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbltype`
--

CREATE TABLE `tbltype` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` text DEFAULT NULL,
  `update_by` int(11) DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  `create_by` int(11) DEFAULT NULL,
  `create_date` date DEFAULT NULL,
  `delete_by` int(11) DEFAULT NULL,
  `delete_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbltype`
--

INSERT INTO `tbltype` (`id`, `name`, `update_by`, `update_date`, `create_by`, `create_date`, `delete_by`, `delete_date`) VALUES
(1, 'สุนัข', NULL, NULL, 1, '2023-05-31', NULL, NULL),
(2, 'แมว', NULL, NULL, 1, '2023-05-31', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbluser`
--

CREATE TABLE `tbluser` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `first_name` text DEFAULT NULL,
  `last_name` text DEFAULT NULL,
  `brithday` date DEFAULT NULL,
  `sex` text DEFAULT NULL,
  `tel` int(11) DEFAULT NULL,
  `email` text DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `approve` int(11) DEFAULT NULL,
  `update_by` int(11) DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  `create_by` int(11) DEFAULT NULL,
  `create_date` date DEFAULT NULL,
  `delete_by` int(11) DEFAULT NULL,
  `delete_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbluser`
--

INSERT INTO `tbluser` (`id`, `username`, `password`, `first_name`, `last_name`, `brithday`, `sex`, `tel`, `email`, `role_id`, `status`, `approve`, `update_by`, `update_date`, `create_by`, `create_date`, `delete_by`, `delete_date`) VALUES
(1, 'admin', '$2b$10$Ogo4qrn4XEAnGr8FT/RHnOoubchUs58Ep.pwmB1HQgIpDlsQjmozG', 'admin', 'role', NULL, 'Male', NULL, NULL, 1, 1, 1, NULL, NULL, 1, '2023-05-31', NULL, NULL),
(2, 'user', '$2b$10$Ogo4qrn4XEAnGr8FT/RHnOoubchUs58Ep.pwmB1HQgIpDlsQjmozG', 'username edit', 'lastname', '2023-05-31', 'Male', 988888822, 'user@user.com', 2, 0, 1, 2, '2023-06-03', NULL, '2023-05-31', NULL, NULL),
(3, 'clinic', '$2b$10$gQ3NfJejxZOx9sv0VLh4eevyujewC9O1c//tQ0LURLzLexIOmEEam', 'clinicname', 'lastname', '2023-05-31', 'Male', 222222222, 'clinic@clinic.com', 3, 0, 1, 1, '2023-05-31', NULL, '2023-05-31', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tb_user_session`
--

CREATE TABLE `tb_user_session` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `ac_uid` text DEFAULT NULL,
  `rf_uid` text DEFAULT NULL,
  `update_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_user_session`
--

INSERT INTO `tb_user_session` (`id`, `user_id`, `ac_uid`, `rf_uid`, `update_date`) VALUES
(1, 1, '3eb3f878-f7e5-4468-9426-7ef1fb534db5', '818d7c73-7523-421a-a540-5cc62a14bf3e', '2024-02-09 07:54:18'),
(2, 2, NULL, NULL, '2024-02-09 07:54:04'),
(3, 3, NULL, NULL, '2023-06-03 05:21:09');

-- --------------------------------------------------------

--
-- Stand-in structure for view `view_appointment`
-- (See below for the actual view)
--
CREATE TABLE `view_appointment` (
`id` bigint(20) unsigned
,`time` time
,`date` text
,`animal_id` bigint(20) unsigned
,`user_id` int(11)
,`animal_name` text
,`animal_sex` text
,`type_name` text
,`type_id` bigint(20) unsigned
,`first_name` text
,`last_name` text
,`tel` int(11)
,`remark` text
,`image` text
,`Hn` text
,`status` text
,`action` text
,`store_id` bigint(20) unsigned
,`store_name` text
,`create_by` mediumtext
,`create_date` varchar(10)
,`update_by` mediumtext
,`update_date` varchar(10)
,`delete_by` text
,`delete_date` date
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `view_store`
-- (See below for the actual view)
--
CREATE TABLE `view_store` (
`id` bigint(20) unsigned
,`storeName` text
,`storeImg` text
,`storeAddress` text
,`storeTel` int(11)
,`storeOpen` int(11)
,`storeClose` int(11)
,`storeDetail` text
,`storeLon` text
,`storeLat` text
,`isVet` int(2)
,`status` text
,`userId` int(11)
,`create_by_name` mediumtext
,`create_by` mediumtext
,`create_date` varchar(10)
,`update_by` mediumtext
,`update_by_name` mediumtext
,`update_date` varchar(10)
,`delete_by` text
,`delete_by_name` text
,`delete_date` date
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `view_user`
-- (See below for the actual view)
--
CREATE TABLE `view_user` (
`id` bigint(20) unsigned
,`username` text
,`password` text
,`first_name` text
,`last_name` text
,`brithday` date
,`sex` text
,`tel` int(11)
,`email` text
,`status` int(11)
,`role_name` text
,`role_id` int(11)
,`approve` int(11)
,`create_by` mediumtext
,`create_by_name` mediumtext
,`create_date` varchar(10)
,`update_by` mediumtext
,`update_by_name` mediumtext
,`update_date` varchar(10)
,`delete_by` text
,`delete_by_name` text
,`delete_date` date
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `view_vet_card`
-- (See below for the actual view)
--
CREATE TABLE `view_vet_card` (
`id` bigint(20) unsigned
,`animal_id` bigint(20) unsigned
,`user_id` int(11)
,`animal_name` text
,`animal_sex` text
,`type_name` text
,`type_id` bigint(20) unsigned
,`first_name` text
,`last_name` text
,`tel` int(11)
,`remark` text
,`image` text
,`Hn` text
,`create_by` mediumtext
,`create_date` varchar(10)
,`update_by` mediumtext
,`update_date` varchar(10)
,`delete_by` text
,`delete_date` date
);

-- --------------------------------------------------------

--
-- Structure for view `view_appointment`
--
DROP TABLE IF EXISTS `view_appointment`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_appointment`  AS SELECT `ap`.`id` AS `id`, `ap`.`time` AS `time`, `ap`.`date` AS `date`, `a`.`id` AS `animal_id`, `a`.`user_id` AS `user_id`, `a`.`name` AS `animal_name`, `a`.`sex` AS `animal_sex`, `t`.`name` AS `type_name`, `t`.`id` AS `type_id`, `u`.`first_name` AS `first_name`, `u`.`last_name` AS `last_name`, `u`.`tel` AS `tel`, `a`.`remark` AS `remark`, `a`.`image` AS `image`, `a`.`Hn` AS `Hn`, `ap`.`status` AS `status`, `ap`.`action` AS `action`, `s`.`id` AS `store_id`, `s`.`storeName` AS `store_name`, coalesce(`create_by`.`first_name`,'-') AS `create_by`, coalesce(`ap`.`create_date`,'-') AS `create_date`, coalesce(`update_by`.`first_name`,'-') AS `update_by`, coalesce(`ap`.`update_date`,'-') AS `update_date`, `delete_by`.`first_name` AS `delete_by`, `delete_by`.`delete_date` AS `delete_date` FROM (((((((`tblappointment` `ap` join `tbluser` `u` on(`ap`.`user_id` = `u`.`id`)) join `tblanimal` `a` on(`ap`.`animal_id` = `a`.`id`)) join `tbltype` `t` on(`a`.`type_id` = `t`.`id`)) join `tblstore` `s` on(`ap`.`store_id` = `s`.`id`)) left join `tbluser` `create_by` on(`ap`.`create_by` = `create_by`.`id`)) left join `tbluser` `update_by` on(`ap`.`update_by` = `update_by`.`id`)) left join `tbluser` `delete_by` on(`ap`.`delete_by` = `delete_by`.`id`)) WHERE `ap`.`delete_by` is null ORDER BY `ap`.`id` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `view_store`
--
DROP TABLE IF EXISTS `view_store`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_store`  AS SELECT `s`.`id` AS `id`, `s`.`storeName` AS `storeName`, `s`.`storeImg` AS `storeImg`, `s`.`storeAddress` AS `storeAddress`, `s`.`storeTel` AS `storeTel`, `s`.`storeOpen` AS `storeOpen`, `s`.`storeClose` AS `storeClose`, `s`.`storeDetail` AS `storeDetail`, `s`.`storeLon` AS `storeLon`, `s`.`storeLat` AS `storeLat`, `s`.`isVet` AS `isVet`, `s`.`status` AS `status`, `s`.`userId` AS `userId`, coalesce(`create_by`.`first_name`,'-') AS `create_by_name`, coalesce(`create_by`.`first_name`,'-') AS `create_by`, coalesce(`s`.`create_date`,'-') AS `create_date`, coalesce(`update_by`.`first_name`,'-') AS `update_by`, coalesce(`update_by`.`first_name`,'-') AS `update_by_name`, coalesce(`s`.`update_date`,'-') AS `update_date`, `delete_by`.`first_name` AS `delete_by`, `delete_by`.`first_name` AS `delete_by_name`, `delete_by`.`delete_date` AS `delete_date` FROM (((`tblstore` `s` left join `tbluser` `create_by` on(`s`.`create_by` = `create_by`.`id`)) left join `tbluser` `update_by` on(`s`.`update_by` = `update_by`.`id`)) left join `tbluser` `delete_by` on(`s`.`delete_by` = `delete_by`.`id`)) WHERE `s`.`delete_by` is null ORDER BY `s`.`id` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `view_user`
--
DROP TABLE IF EXISTS `view_user`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_user`  AS SELECT `u`.`id` AS `id`, `u`.`username` AS `username`, `u`.`password` AS `password`, `u`.`first_name` AS `first_name`, `u`.`last_name` AS `last_name`, `u`.`brithday` AS `brithday`, `u`.`sex` AS `sex`, `u`.`tel` AS `tel`, `u`.`email` AS `email`, `u`.`status` AS `status`, `r`.`name` AS `role_name`, `u`.`role_id` AS `role_id`, `u`.`approve` AS `approve`, coalesce(`create_by`.`first_name`,'-') AS `create_by`, coalesce(`create_by`.`first_name`,'-') AS `create_by_name`, coalesce(`u`.`create_date`,'-') AS `create_date`, coalesce(`update_by`.`first_name`,'-') AS `update_by`, coalesce(`update_by`.`first_name`,'-') AS `update_by_name`, coalesce(`u`.`update_date`,'-') AS `update_date`, `delete_by`.`first_name` AS `delete_by`, `delete_by`.`first_name` AS `delete_by_name`, `delete_by`.`delete_date` AS `delete_date` FROM ((((`tbluser` `u` join `tblrole` `r` on(`u`.`role_id` = `r`.`id`)) left join `tbluser` `create_by` on(`u`.`create_by` = `create_by`.`id`)) left join `tbluser` `update_by` on(`u`.`update_by` = `update_by`.`id`)) left join `tbluser` `delete_by` on(`u`.`delete_by` = `delete_by`.`id`)) WHERE `u`.`delete_by` is null ORDER BY `u`.`id` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `view_vet_card`
--
DROP TABLE IF EXISTS `view_vet_card`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_vet_card`  AS SELECT `a`.`id` AS `id`, `a`.`id` AS `animal_id`, `a`.`user_id` AS `user_id`, `a`.`name` AS `animal_name`, `a`.`sex` AS `animal_sex`, `t`.`name` AS `type_name`, `t`.`id` AS `type_id`, `u`.`first_name` AS `first_name`, `u`.`last_name` AS `last_name`, `u`.`tel` AS `tel`, `a`.`remark` AS `remark`, `a`.`image` AS `image`, `a`.`Hn` AS `Hn`, coalesce(`create_by`.`first_name`,'-') AS `create_by`, coalesce(`a`.`create_date`,'-') AS `create_date`, coalesce(`update_by`.`first_name`,'-') AS `update_by`, coalesce(`a`.`update_date`,'-') AS `update_date`, `delete_by`.`first_name` AS `delete_by`, `delete_by`.`delete_date` AS `delete_date` FROM (((((`tblanimal` `a` join `tbluser` `u` on(`u`.`id` = `a`.`user_id`)) join `tbltype` `t` on(`a`.`type_id` = `t`.`id`)) left join `tbluser` `create_by` on(`a`.`create_by` = `create_by`.`id`)) left join `tbluser` `update_by` on(`a`.`update_by` = `update_by`.`id`)) left join `tbluser` `delete_by` on(`a`.`delete_by` = `delete_by`.`id`)) WHERE `a`.`delete_by` is null ORDER BY `a`.`user_id` ASC ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tblanimal`
--
ALTER TABLE `tblanimal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblappointment`
--
ALTER TABLE `tblappointment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblrole`
--
ALTER TABLE `tblrole`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblstore`
--
ALTER TABLE `tblstore`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbltype`
--
ALTER TABLE `tbltype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbluser`
--
ALTER TABLE `tbluser`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_user_session`
--
ALTER TABLE `tb_user_session`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblanimal`
--
ALTER TABLE `tblanimal`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tblappointment`
--
ALTER TABLE `tblappointment`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblrole`
--
ALTER TABLE `tblrole`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tblstore`
--
ALTER TABLE `tblstore`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbltype`
--
ALTER TABLE `tbltype`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbluser`
--
ALTER TABLE `tbluser`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_user_session`
--
ALTER TABLE `tb_user_session`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
