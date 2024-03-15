-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 15, 2024 at 10:20 AM
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

-- --------------------------------------------------------

--
-- Table structure for table `Players`
--

CREATE TABLE `Players` (
  `dbplayer_id` int(11) NOT NULL,
  `dbplayer_firstname` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dbplayer_lastname` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `dbplayer_email` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `dbplayer_phone` int(10) DEFAULT NULL,
  `dbplayer_rewardstier` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dbplayer_password` varchar(128) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Players`
--

INSERT INTO `Players` (`dbplayer_id`, `dbplayer_firstname`, `dbplayer_lastname`, `dbplayer_email`, `dbplayer_phone`, `dbplayer_rewardstier`, `dbplayer_password`) VALUES
(1, NULL, 'test', 'test@test.com', NULL, NULL, 'test');

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
(1, 'test-product', 'This is a test product; this will be used for test queries.', 99.99, 500),
(2, 'test-product2', 'This is a test product as well; this will also be used for test queries.', 149.99, 300);

-- --------------------------------------------------------

--
-- Table structure for table `Purchases`
--

CREATE TABLE `Purchases` (
  `dborder_id` int(11) NOT NULL COMMENT 'FK for Order',
  `dbpurchase_status` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dbpurchase_datetimefulfilled` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
(2, '2024-03-18 10:00:00', 1, 1),
(3, '2024-03-20 10:00:00', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `dbuser_id` int(11) NOT NULL,
  `dbuser_firstname` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `dbuser_lastname` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dbuser_email` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `dbuser_phone` int(10) DEFAULT NULL,
  `dbuser_password` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `dbuser_role` varchar(16) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`dbuser_id`, `dbuser_firstname`, `dbuser_lastname`, `dbuser_email`, `dbuser_phone`, `dbuser_password`, `dbuser_role`) VALUES
(1, 'test', NULL, 'testuser@test.com', NULL, 'test', 'admin');

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
  MODIFY `dborderitem_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `dborder_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Players`
--
ALTER TABLE `Players`
  MODIFY `dbplayer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
  MODIFY `dbproduct_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Reservations`
--
ALTER TABLE `Reservations`
  MODIFY `dbreservation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `dbuser_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
