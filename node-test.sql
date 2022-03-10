-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: Mar 10, 2022 at 08:31 AM
-- Server version: 5.7.14
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node-test`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
CREATE TABLE IF NOT EXISTS `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `body` varchar(5000) NOT NULL,
  `photo` varchar(150) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `body`, `photo`, `created_by`, `created_at`) VALUES
(41, 'Hellow World', 'This is a demo post', '193f6773-738c-4ee7-bd42-f239af119f85_scar3crow_final.jpg', 1, '2021-05-01 15:13:39'),
(42, 'this is the second', 'hi, i am sayeem', NULL, 1, '2021-05-01 15:16:06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `photo` varchar(200) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `photo`, `created_at`) VALUES
(1, 'sayeem mohammad shahria', 'sayeems@gmail.com', '$2a$10$APLTaVq/djNIJnmKkbwmpetADuF0XCXl/fOQpqp8whlos1ETL3FLe', NULL, '2021-04-24 16:24:04'),
(3, 'test book', 'admin@cms.com', '$2a$08$Fj3io9Y/g0iw0hK/g.hB0uRskNr8scQ1P5Y4HDRw5PJNC52p3YXUu', NULL, '2021-04-24 17:08:31'),
(4, 'ecdp', 'superadmin@bdeducation.org.bd', '$2a$08$vXz8x4MZbpFBYivD/o60MOzlyjJ5Ncc.HWP0tG.hUtFK3MgVtw9PO', NULL, '2021-04-24 17:09:04'),
(5, 'abdullah', 'ab@gmail.com', '$2a$08$ZDjO/fDYkNm1llSRskn8/.ZOKwjIgVyAMxFyU3OLEuQZwdjTmoXKq', NULL, '2021-04-24 19:00:36');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
