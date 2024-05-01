-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 30, 2024 at 09:20 PM
-- Server version: 5.7.23-23
-- PHP Version: 8.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sshell18_cpt262_fall2024_final`
--

-- --------------------------------------------------------

--
-- Table structure for table `OrderItems`
--

CREATE TABLE `OrderItems` (
  `dborderitem_id` int(11) NOT NULL,
  `dbproduct_id` int(11) NOT NULL COMMENT 'FK for Product',
  `dborder_id` int(11) NOT NULL COMMENT 'FK for Order',
  `dborderitem_quantity` int(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `OrderItems`
--

INSERT INTO `OrderItems` (`dborderitem_id`, `dbproduct_id`, `dborder_id`, `dborderitem_quantity`) VALUES
(5, 5, 3, 1),
(6, 4, 3, 1),
(7, 4, 7, 2),
(8, 7, 8, 60);

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `dborder_id` int(11) NOT NULL,
  `dborder_datetime` datetime DEFAULT NULL,
  `dbplayer_id` int(11) NOT NULL COMMENT 'FK for Player',
  `dbuser_id` int(11) NOT NULL COMMENT 'FK for User'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Orders`
--

INSERT INTO `Orders` (`dborder_id`, `dborder_datetime`, `dbplayer_id`, `dbuser_id`) VALUES
(2, '2024-05-18 10:00:00', 2, 6),
(3, '2024-05-18 08:05:00', 3, 9),
(4, '2024-03-27 12:30:00', 3, 9),
(5, '2024-03-27 12:30:00', 3, 9),
(6, '2024-03-27 08:01:00', 3, 9),
(7, '2024-04-16 11:17:00', 9, 11),
(8, '2024-04-24 11:02:00', 2, 11);

-- --------------------------------------------------------

--
-- Table structure for table `Players`
--

CREATE TABLE `Players` (
  `dbplayer_id` int(11) NOT NULL,
  `dbplayer_firstname` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dbplayer_lastname` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `dbplayer_email` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `dbplayer_phone` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dbplayer_rewardstier` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dbplayer_password` varchar(128) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Players`
--

INSERT INTO `Players` (`dbplayer_id`, `dbplayer_firstname`, `dbplayer_lastname`, `dbplayer_email`, `dbplayer_phone`, `dbplayer_rewardstier`, `dbplayer_password`) VALUES
(2, 'Samuel', 'Shelley', 'sshell18@hgtc.edu', '1111111111', 'Standard', '$2b$10$8.KOw9FY1jYSZrj89OtC/.NdtKTWh2iBaj4xtIHlPVt2UC9fYBioy'),
(3, 'Andy', 'Buck', 'abuck@gmail.com', '1111111114', 'Standard', '$2b$10$I75RAMN1nVtH8ylEWMAbF.vhuEzWZ03T01xoDQ7z/k3aFcT5p6waq'),
(8, 'Kristen', 'Cavanagh', 'k@c.com', '8435045544', 'Plus', '$2b$10$BBCGPF1yuPps6XcLMOZL3eYvnrDfMZ3OmB1lBXddR8qkFFeZYvFNe'),
(9, 'test', 'test', 'test@test.com', '1111111115', 'Plus', '$2b$10$FT7p0TRS0lus8kQX3bbUaugzWowPuE5huYGm4aG4iwC.MVb8PUNhW'),
(10, 'player', 'player', 'player@user.com', '', 'Premium', '$2b$10$RGWqV3QrxeLRfYKqrcNk/.YnQSXOSRYBVdAPlgavmfc5gf.vMcpIu'),
(19, 'Jane', 'Cavanagh', 'jan@doe.com', '8545551212', 'Standard', '$2b$10$MaEAmQZIPgIvprvxFegPJ.IoxPVXIKPQNqFFyCx8XqG5kBIeKFhAK'),
(20, 'player', 'player', 'player@player.com', '1234567890', 'Plus', '$2b$10$Jv8chhuJuzPGwoZHvfK3QOPFkrStsDwkRkn5BsB1SDmU1EWqKDvpG'),
(23, 'Eirami', 'Graham', 'eg@hgtc.edu', '9999999990', 'Plus', '$2b$10$YvV1F2Q4A90s/mooX0nvZeexxgBn90gx2k596uaSyRbYPJahxHcjO'),
(24, 'Trent', 'Miller', 'trentm@test.com', '8435041212', 'Premium', '$2b$10$k9gVXeh64Zjy8eP/rR43HOUKFziG2MTgV.nOhOC85yaJHg9GLbSxe');

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE `Products` (
  `dbproduct_id` int(11) NOT NULL,
  `dbproduct_name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `dbproduct_description` text COLLATE utf8_unicode_ci,
  `dbproduct_price` double(10,2) DEFAULT NULL,
  `dbproduct_quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`dbproduct_id`, `dbproduct_name`, `dbproduct_description`, `dbproduct_price`, `dbproduct_quantity`) VALUES
(1, 'test-product1', 'This is a test product; this will be used for test queries.', 99.99, 50),
(2, 'test-product2', 'This is a test product as well; this will also be used for test queries.', 149.99, 300),
(4, 'logo polo m bu', 'TCTG Logo Polo Shirt; Medium Blue', 19.99, 200),
(5, 'logo polo m bn', 'TCTG Logo Polo Shirt; Medium Brown', 24.99, 125),
(7, 'Taylor Gloves', 'Taylor Made Premium Golf Gloves', 55.76, 200),
(9, 'rayban sunglasses', 'Ray-Ban Sunglasses Bl', 100.00, 200);

-- --------------------------------------------------------

--
-- Table structure for table `Purchases`
--

CREATE TABLE `Purchases` (
  `dborder_id` int(11) NOT NULL COMMENT 'FK for Order',
  `dbpurchase_status` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dbpurchase_datetimefulfilled` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Purchases`
--

INSERT INTO `Purchases` (`dborder_id`, `dbpurchase_status`, `dbpurchase_datetimefulfilled`) VALUES
(2, 'Pending', '2024-05-18 10:02:00'),
(3, 'Pending', '2024-05-18 08:05:00'),
(6, 'Pending', '2024-04-11 15:11:00'),
(7, 'Fulfilled', '2024-04-16 11:20:00'),
(8, 'Pending', '2024-04-24 11:06:00');

-- --------------------------------------------------------

--
-- Table structure for table `Reservations`
--

CREATE TABLE `Reservations` (
  `dbreservation_id` int(11) NOT NULL,
  `dbreservation_datetime` datetime DEFAULT NULL,
  `dbplayer_id` int(11) NOT NULL COMMENT 'FK for Player',
  `dbuser_id` int(11) NOT NULL COMMENT 'FK for User'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Reservations`
--

INSERT INTO `Reservations` (`dbreservation_id`, `dbreservation_datetime`, `dbplayer_id`, `dbuser_id`) VALUES
(1, '2024-05-18 08:00:00', 2, 0),
(2, '2024-05-18 10:08:00', 3, 9),
(3, '2024-05-25 08:32:00', 3, 0),
(5, '2024-04-02 11:04:00', 3, 6),
(7, '2024-04-13 08:00:00', 2, 9),
(19, '2024-04-22 10:08:00', 20, 0),
(20, '2024-04-23 12:00:00', 9, 0),
(21, '2024-04-23 12:00:00', 9, 0),
(24, '2024-04-24 08:00:00', 9, 0),
(25, '2024-04-24 09:04:00', 9, 9),
(26, '2024-04-25 11:04:00', 2, 11),
(28, '2024-06-07 11:20:00', 9, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `dbuser_id` int(11) NOT NULL,
  `dbuser_firstname` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `dbuser_lastname` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dbuser_email` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `dbuser_phone` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dbuser_password` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `dbuser_role` varchar(16) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`dbuser_id`, `dbuser_firstname`, `dbuser_lastname`, `dbuser_email`, `dbuser_phone`, `dbuser_password`, `dbuser_role`) VALUES
(0, 'self reservation', 'self reservation', 'self@reservation.com', '', '$2b$10$D4qzPZmm.6HLx3o568exg.EF6n2Hrf0kpkA7dcMu0E0oNRRsuCTe6', 'Player'),
(6, 'Samuel', 'Shelley', 'sshell18@hgtc.edu', '8433250888', '$2b$10$G44k2mifFvGJj4lu63HlJuWcW26cJWgIakTNZGYc.dkQcZhRtePE6', 'Assistant'),
(9, 'Allen', 'Bermingham', 'aberm@gmail.com', '1111111113', '$2b$10$3PRvmMB5rNKJaGKKiSY56eSDfuSwBgou.2GDzT3xoQYhuFDzPwyIi', 'Front-Desk'),
(11, 'user', 'user', 'user@user.com', '', '$2b$10$ifjvCAtDWW5O4u.lia7sC.RT.BgdNC9ljHhqmm7DkxbcgQT/vc87W', 'Manager'),
(13, 'manager', 'manager', 'manager@manager.com', '2222222222', '$2b$10$PvNdZggQBO3HxClHfkmaHeWF4cQzpid5teNLIzdpm6wgftpxXONUe', 'Manager'),
(14, 'front-desk', 'front-desk', 'front@desk.com', '3333333333', '$2b$10$Gk27eoZwoRtPqkkWbg6UbuBBQmZOUv6vm3lg13PGPYYbPSPlDKY7C', 'Front-Desk'),
(15, 'assistant', 'assistant', 'assistant@assistant.com', '4444444444', '$2b$10$FD74MAZq2lv3bnzBG.xo2.0FCSXhHiyb22/7B5bblMwvGNeAeY/g.', 'Assistant'),
(16, 'usertest', 'usertest', 'usertest@usertest.com', '0987654321', '$2b$10$hFKYxiGalBAeFva4RfKkGOPbnnDyUeCQ6lRZsC/AXc3dN58Sk49ei', 'Manager'),
(18, 'Testman', 'Testman', 'test@man.com', '1882883889', '$2b$10$y8PcG/omZoKLgYdgF//RcuB8xXx/GwMbDWCn/Uw512GH8hSUXNwbO', 'Manager');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `OrderItems`
--
ALTER TABLE `OrderItems`
  ADD PRIMARY KEY (`dborderitem_id`),
  ADD KEY `dbproduct_id` (`dbproduct_id`),
  ADD KEY `dborder_id` (`dborder_id`);

--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`dborder_id`),
  ADD KEY `dbplayer_id` (`dbplayer_id`),
  ADD KEY `dbuser_id` (`dbuser_id`);

--
-- Indexes for table `Players`
--
ALTER TABLE `Players`
  ADD PRIMARY KEY (`dbplayer_id`);

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`dbproduct_id`);

--
-- Indexes for table `Purchases`
--
ALTER TABLE `Purchases`
  ADD PRIMARY KEY (`dborder_id`);

--
-- Indexes for table `Reservations`
--
ALTER TABLE `Reservations`
  ADD PRIMARY KEY (`dbreservation_id`),
  ADD KEY `dbplayer_id` (`dbplayer_id`,`dbuser_id`),
  ADD KEY `dbuser_id` (`dbuser_id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`dbuser_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `OrderItems`
--
ALTER TABLE `OrderItems`
  MODIFY `dborderitem_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `dborder_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Players`
--
ALTER TABLE `Players`
  MODIFY `dbplayer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
  MODIFY `dbproduct_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Reservations`
--
ALTER TABLE `Reservations`
  MODIFY `dbreservation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `dbuser_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `OrderItems`
--
ALTER TABLE `OrderItems`
  ADD CONSTRAINT `OrderItems_ibfk_1` FOREIGN KEY (`dborder_id`) REFERENCES `Orders` (`dborder_id`),
  ADD CONSTRAINT `OrderItems_ibfk_2` FOREIGN KEY (`dbproduct_id`) REFERENCES `Products` (`dbproduct_id`);

--
-- Constraints for table `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`dbplayer_id`) REFERENCES `Players` (`dbplayer_id`),
  ADD CONSTRAINT `Orders_ibfk_2` FOREIGN KEY (`dbuser_id`) REFERENCES `Users` (`dbuser_id`);

--
-- Constraints for table `Purchases`
--
ALTER TABLE `Purchases`
  ADD CONSTRAINT `Purchases_ibfk_1` FOREIGN KEY (`dborder_id`) REFERENCES `Orders` (`dborder_id`);

--
-- Constraints for table `Reservations`
--
ALTER TABLE `Reservations`
  ADD CONSTRAINT `Reservations_ibfk_1` FOREIGN KEY (`dbuser_id`) REFERENCES `Users` (`dbuser_id`),
  ADD CONSTRAINT `Reservations_ibfk_2` FOREIGN KEY (`dbplayer_id`) REFERENCES `Players` (`dbplayer_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
