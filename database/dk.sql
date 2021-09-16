-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 16, 2021 at 06:15 AM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dk`
--

-- --------------------------------------------------------

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
CREATE TABLE IF NOT EXISTS `author` (
  `phoneNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `author_ID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`author_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `author`
--

INSERT INTO `author` (`phoneNumber`, `author_ID`, `firstName`, `lastName`, `email`) VALUES
('09994323324', 1, 'Leo', 'Tolstoy', 'leo@gmail.com'),
('0998547448', 2, 'William', 'Shakespeare', 'will@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `author_titles_title`
--

DROP TABLE IF EXISTS `author_titles_title`;
CREATE TABLE IF NOT EXISTS `author_titles_title` (
  `authorAuthorID` int(11) NOT NULL,
  `titleTitleID` int(11) NOT NULL,
  PRIMARY KEY (`authorAuthorID`,`titleTitleID`),
  KEY `IDX_d109956e5973d38528ecb9977e` (`authorAuthorID`),
  KEY `IDX_ddebacf8f521db15075b6aca6f` (`titleTitleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `author_titles_title`
--

INSERT INTO `author_titles_title` (`authorAuthorID`, `titleTitleID`) VALUES
(1, 13);

-- --------------------------------------------------------

--
-- Table structure for table `format`
--

DROP TABLE IF EXISTS `format`;
CREATE TABLE IF NOT EXISTS `format` (
  `format_ID` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `format_Code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`format_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `format`
--

INSERT INTO `format` (`format_ID`, `description`, `format_Code`) VALUES
(1, 'This writing format is often used when referencing language or literature but is also useful outside of the humanities subjects as well.', 'Turabian'),
(2, 'Initially created in 1929, APA style was created by the American Psychological Association. It offers three kinds of information to be included in the text body of composition. The last name of the author, the date of publication.', 'APA'),
(3, 'This writing format is often used when referencing language or literature but is also useful outside of the humanities subjects as well.', 'MLA'),
(4, 'This writing format is often used when referencing language or literature but is also useful outside of the humanities subjects as well.', 'Chicago');

-- --------------------------------------------------------

--
-- Table structure for table `title`
--

DROP TABLE IF EXISTS `title`;
CREATE TABLE IF NOT EXISTS `title` (
  `title_ID` int(11) NOT NULL AUTO_INCREMENT,
  `isbn` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `dateOfPublication` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `format_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`title_ID`),
  UNIQUE KEY `IDX_2765c5f5a86a19cf413939d3ae` (`isbn`),
  KEY `FK_31fc4617b78f86d4a79f3a82cd2` (`format_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `title`
--

INSERT INTO `title` (`title_ID`, `isbn`, `title`, `description`, `dateOfPublication`, `format_ID`) VALUES
(13, 'U432NKJ3', 'War and Peace', 'Wonderful book', '12/2/1851', 1);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `author_titles_title`
--
ALTER TABLE `author_titles_title`
  ADD CONSTRAINT `FK_d109956e5973d38528ecb9977e4` FOREIGN KEY (`authorAuthorID`) REFERENCES `author` (`author_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_ddebacf8f521db15075b6aca6f4` FOREIGN KEY (`titleTitleID`) REFERENCES `title` (`title_ID`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `title`
--
ALTER TABLE `title`
  ADD CONSTRAINT `FK_31fc4617b78f86d4a79f3a82cd2` FOREIGN KEY (`format_ID`) REFERENCES `format` (`format_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
