-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 21, 2020 at 01:40 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reactlaravel`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `title`, `description`, `created_at`, `updated_at`) VALUES
(1, 'hello world python', 'hello world python', '2020-09-19 05:07:50', '2020-09-19 05:07:50');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ledger_copy`
--

CREATE TABLE `ledger_copy` (
  `id` int(20) NOT NULL,
  `parent_head_id` int(5) NOT NULL,
  `ledger_title` varchar(50) CHARACTER SET utf8 NOT NULL,
  `opening_balance` varchar(20) NOT NULL DEFAULT '0',
  `date` date DEFAULT NULL,
  `remarks` varchar(100) DEFAULT NULL,
  `by` varchar(20) DEFAULT NULL,
  `type` int(20) DEFAULT NULL,
  `ware` int(20) NOT NULL DEFAULT '0',
  `accounts_id` text,
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '1=Active; 2 = Inactive',
  `foreign_name` varchar(255) NOT NULL,
  `trash` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ledger_copy`
--

INSERT INTO `ledger_copy` (`id`, `parent_head_id`, `ledger_title`, `opening_balance`, `date`, `remarks`, `by`, `type`, `ware`, `accounts_id`, `status`, `foreign_name`, `trash`) VALUES
(192, 13, 'Cash', '0', '2016-03-22', 'null', 'admin', 1, 0, '10000406051', 1, '', 0),
(203, 172, 'PURCHASE DICOUNT', '0', '1970-01-01', '', '5', 2, 0, '400032', 1, '', 0),
(204, 87, 'product_issue', '0', '2016-03-03', '', '5', 2, 0, '40000701', 1, '', 0),
(205, 15, 'Commision', '0', '2016-03-03', '', '5', 1, 0, '300012', 1, '', 0),
(225, 108, 'Provision for Taxation', '0', '2016-03-16', '', '5', 1, 0, '300052', 1, '', 0),
(284, 76, 'Common Customer For Reservation', '0', NULL, NULL, NULL, 1, 0, '1000223', 1, '', 0),
(343, 12, 'Bkash', '0', '2016-04-26', 'null', '39', 1, -99, '10002115', 1, '', 0),
(386, 87, 'services', '', '2016-05-17', '', '42', 2, 0, '40000702', 1, '', 0),
(388, 12, 'Brack Bank', '', '2016-05-18', '', '43', 1, -99, '10002116', 1, '', 0),
(422, 17, 'Printer servicing', '', '2016-07-24', '', '48', 2, 0, '400015', 1, '', 0),
(423, 17, 'Monitor servicing', '', '2016-07-24', '', '48', 2, 0, '400016', 1, '', 0),
(424, 17, 'Laptop servicing', '', '2016-07-24', '', '48', 2, 0, '400017', 1, '', 0),
(425, 17, 'Computer servicing', '', '2016-07-24', '', '48', 2, 0, '400018', 1, '', 0),
(431, 18, 'Transport Cost', '', '2016-08-06', '', '48', 1, 0, '300022', 1, '', 0),
(432, 12, 'ibbl 100', '50000', '2016-08-06', '', '48', 1, -99, '10002117', 1, '', 0),
(434, 102, 'Entertainment', '', '2016-08-07', '', '54', 1, 0, '3000112', 1, '', 0),
(435, 93, 'Anwar VI', '100000', '2016-08-07', '', '54', 2, 0, '200022', 1, '', 0),
(436, 87, 'rajib', '', '2016-08-08', '', '53', 2, 0, '40000703', 1, '', 0),
(600, 12, 'alamin', '', '2016-12-07', '', '59', 1, -99, '10002118', 1, '', 0),
(602, 378, 'provident fund(liabilites)', '', '2018-01-30', '', '5', 2, 0, '2000132', 1, '', 0),
(606, 104, 'Printing', '', '2019-03-30', '', '2', 1, 0, '3000132', 1, '', 0),
(608, 87, 'Local', '', '2019-05-04', '', '17', 2, -33, '40000704', 1, '', 0),
(610, 87, 'laundry_transfer', '0', '2016-03-03', '', '5', 2, 0, '40000705', 1, '', 0),
(611, 92, 'Ismail', '', '2019-06-15', '', '17', 2, 0, '200012', 1, '', 0),
(612, 416, 'Central Office Petty Cash', '', '2019-06-17', '', '17', 1, 0, '10000407', 1, '', 0),
(618, 389, 'Central Account', '', '2019-06-17', '', '17', 2, 0, '2000212', 1, '', 0),
(620, 391, 'vat', '', '2019-06-17', '', '17', 2, 0, '2000142', 1, '', 0),
(626, 99, 'Food', '', '2019-06-22', '', '1', 1, 0, '300031', 1, '', 0),
(627, 99, 'Plumbing Iems', '', '2019-06-22', '', '1', 1, 0, '300032', 1, '', 0),
(628, 99, 'Electrical Item', '', '2019-06-22', '', '1', 1, 0, '300033', 1, '', 0),
(629, 99, 'Carpenter Item', '', '2019-06-22', '', '1', 1, 0, '300034', 1, '', 0),
(630, 99, 'Pest Controller ', '', '2019-06-22', '', '1', 1, 0, '300035', 1, '', 0),
(631, 99, 'Cleaning Item', '', '2019-06-22', '', '1', 1, 0, '300036', 1, '', 0),
(632, 99, 'Baladiya', '', '2019-06-22', '', '1', 1, 0, '300037', 1, '', 0),
(633, 99, 'Mobile Expense', '', '2019-06-22', '', '1', 1, 0, '300038', 1, '', 0),
(634, 99, 'Drinking Water', '', '2019-06-22', '', '1', 1, 0, '300039', 1, '', 0),
(635, 87, 'opening Balance', '', '2019-06-22', '', '1', 2, 0, '40000706', 1, '', 0),
(636, 108, 'Stationary Items', '', '2019-07-14', '', '8', 1, 0, '300053', 1, '', 0),
(637, 398, 'Local', '', '2019-08-07', '', '16', 2, 0, '4000212', 1, '', 0),
(638, 394, 'Payment By Refund', '', '2019-08-07', '', '16', 1, 0, '300071', 1, '', 0),
(639, 398, 'Allotment', '', '2019-08-07', '', '16', 2, 0, '4000213', 1, '', 0),
(640, 12, 'bank asia', '', '2019-08-19', '', '16', 1, -99, '10002119', 1, '', 0),
(641, 388, 'Cash Transfer To Central Office', '', '2019-08-20', '', '1', 1, 0, '300061', 1, '', 0),
(642, 398, 'Reservation', '', '2019-08-07', '', '16', 2, 0, '4000214', 1, '', 0),
(643, 15, 'Sale Discount', '0', '2016-03-03', '', '5', 1, 0, '3000122', 1, '', 0),
(720, 391, 'Hotel Payable Tax', '', '2019-08-21', '', '16', 2, 0, '2000143', 1, '', 0),
(721, 397, 'Refund', '', '2019-08-21', '', '16', 2, 0, '2000151', 1, '', 0),
(722, 399, 'Restarunt Bill', '', '2019-08-22', '', '16', 2, 0, '400041', 1, '', 0),
(723, 399, 'Parking Bill', '', '2019-08-22', '', '16', 2, 0, '400042', 1, '', 0),
(724, 399, 'Laundry Bill', '', '2019-08-22', '', '16', 2, 0, '400043', 1, '', 0),
(725, 399, 'Others Bill', '', '2019-08-22', '', '16', 2, 0, '400044', 1, '', 0),
(727, 399, 'Room Charge', '', '2019-08-22', '', '16', 2, 0, '4000444', 1, '', 0),
(728, 399, 'Reservation Cancel Charge', '', '2019-08-22', '', '16', 2, 0, '4000444', 1, '', 0),
(729, 398, 'Return Reservation Revenue', '', '2019-08-26', '', '17', 2, 0, '4000445', 1, '', 0),
(730, 398, 'Return Local Revenue', '', '2019-08-26', '', '17', 2, 0, '4000446', 1, '', 0),
(731, 398, 'Return Allotment Revenue', '', '2019-08-26', '', '17', 2, 0, '40004555', 1, '', 0),
(732, 396, 'FundAccountsId', '', '2019-08-26', '', '17', 2, 0, '40004555', 1, '', 0),
(735, 99, 'Supplies Expenses', '', '2019-08-31', 'For Purchasing daily necessaries for hotel', '17', 1, 0, '3000310', 1, '', 0),
(736, 94, 'Capita', '', '2019-09-01', '', '17', 2, 0, '200031', 1, '', 0),
(737, 401, 'Capital Fund', '', '2019-09-01', '', '17', 2, 0, '2000321', 1, '', 0),
(738, 12, 'Pubali Bank - Abdul Motaleb', '', '2019-09-01', '', '142', 1, 0, '10002119', 1, '', 0),
(741, 406, 'Hotel Contract', '', '2019-09-02', '', '17', 1, 0, '300091', 1, '', 0),
(751, 76, 'Default Agent For Local', '0', NULL, NULL, NULL, 1, 0, '10000407159', 1, '', 0),
(752, 76, 'Group', '0', NULL, NULL, NULL, 1, 0, '10000407160', 1, '', 0),
(756, 76, 'Abdul Majid', '0', NULL, NULL, NULL, 1, 0, '10000407161', 1, '', 0),
(757, 76, 'Tripshop', '0', NULL, NULL, NULL, 1, 0, '10000407162', 1, '', 0),
(759, 15, 'Food Allowance ', '', '2019-09-14', 'Food For Staff as breakfast ', '1', 1, 0, '3000123', 1, '', 0),
(760, 15, 'Conveyance ', '', '2019-09-14', 'For Staff travel Expense  ', '1', 1, 0, '3000124', 1, '', 0),
(761, 87, 'Sales', '', '2019-09-15', '', '17', 2, 0, '40000711', 1, '', 0),
(763, 76, 'Rahath Tours ', '0', NULL, NULL, NULL, 1, 0, '10000407163', 1, '', 0),
(764, 76, 'Nasir ', '0', NULL, NULL, NULL, 1, 0, '10000407164', 1, '', 0),
(765, 76, 'Complimentary Rooms', '0', NULL, NULL, NULL, 1, 0, '10000407165', 1, '', 0),
(766, 94, 'Sundry Fund', '', '2019-09-15', '', '1', 2, 0, '200032', 1, '', 0),
(769, 15, 'Waste Removal Expenses', '', '2019-09-15', '', '1', 1, 0, '3000125', 1, '', 0),
(771, 76, 'Mohsin ', '0', NULL, NULL, NULL, 1, 0, '10000407166', 1, '', 0),
(772, 76, 'Riyaz Tours And Travels', '0', NULL, NULL, NULL, 1, 0, '10000407167', 1, '', 0),
(773, 76, 'Danish Tours & Travels', '0', NULL, NULL, NULL, 1, 0, '10000407168', 1, '', 0),
(774, 76, 'Waqar e madinah', '0', NULL, NULL, NULL, 1, 0, '10000407169', 1, '', 0),
(775, 76, 'Sky World', '0', NULL, NULL, NULL, 1, 0, '10000407170', 1, '', 0),
(776, 15, 'Repair & Maintenance', '', '2019-09-19', '', '1', 1, 0, '3000126', 1, '', 0),
(777, 76, 'Yaseen Travels ', '0', NULL, NULL, NULL, 1, 0, '10000407171', 1, '', 0),
(778, 76, 'Abdur Rashid ', '0', NULL, NULL, NULL, 1, 0, '10000407172', 1, '', 0),
(779, 76, 'Tilal khan', '0', NULL, NULL, NULL, 1, 0, '10000407173', 1, '', 0),
(780, 3, 'Fire & Safety', '', '2019-09-21', '', '1', 1, 0, '30001', 1, '', 0),
(781, 76, 'Dua Al Madinah', '0', NULL, NULL, NULL, 1, 0, '10000407174', 1, '', 0),
(782, 76, 'Gulam Nabi ', '0', NULL, NULL, NULL, 1, 0, '10000407175', 1, '', 0),
(783, 76, 'Siddik Ibrahim', '0', NULL, NULL, NULL, 1, 0, '10000407176', 1, '', 0),
(784, 76, 'Al Qayyum Tours & Travels', '0', NULL, NULL, NULL, 1, 0, '10000407177', 1, '', 0),
(785, 76, 'Ayesha Tours', '0', NULL, NULL, NULL, 1, 0, '10000407178', 1, '', 0),
(786, 76, 'Abdur Rashid Kerala', '0', NULL, NULL, NULL, 1, 0, '10000407179', 1, '', 0),
(787, 76, 'Basalama Tours & Travels', '0', NULL, NULL, NULL, 1, 0, '10000407180', 1, '', 0),
(788, 76, 'Yaqoob Hussain International', '0', NULL, NULL, NULL, 1, 0, '10000407181', 1, '', 0),
(789, 76, 'AL Qubrah Tours Kalkatta', '0', NULL, NULL, NULL, 1, 0, '10000407182', 1, '', 0),
(790, 405, 'Hamza Saeed Information Technology(con-1005)', '0', '2019-09-24', NULL, '53', 2, 0, '2000161', 1, '', 0),
(791, 405, 'Hamza Saeed Information Technology(con-1006)', '0', '2019-09-24', NULL, '55', 2, 0, '2000162', 1, '', 0),
(792, 405, 'Hamza Saeed Information Technology(con-1007)', '0', '2019-09-24', NULL, '12', 2, 0, '2000163', 1, '', 0),
(793, 405, 'Hamza Saeed Information Technology(con-1008)', '0', '2019-09-24', NULL, '7', 2, 0, '2000164', 1, '', 0),
(794, 405, 'Hamza Saeed Information Technology(con-1009)', '0', '2019-09-24', NULL, '17', 2, 0, '2000165', 1, '', 0),
(795, 76, 'Hermein Tugarvi Dr Jafar', '0', NULL, NULL, NULL, 1, 0, '10000407183', 1, '', 0),
(796, 76, 'Travel Brand Shahzad', '0', NULL, NULL, NULL, 1, 0, '10000407184', 1, '', 0),
(797, 76, 'Meezab Group', '0', NULL, NULL, NULL, 1, 0, '10000407185', 1, '', 0),
(798, 76, 'Nasir Diyer Al Masi', '0', NULL, NULL, NULL, 1, 0, '10000407186', 1, '', 0),
(799, 76, 'Arshad Arif Travels', '0', NULL, NULL, NULL, 1, 0, '10000407187', 1, '', 0),
(800, 411, 'Rawdah Al Safa', '0', NULL, NULL, NULL, 1, 0, NULL, 1, '', 0),
(801, 411, 'Jowharat Al Safa', '0', NULL, NULL, NULL, 1, 0, NULL, 1, '', 0),
(802, 411, 'Golden Safa', '0', NULL, NULL, NULL, 1, 0, NULL, 1, '', 0),
(803, 411, 'Manar Al Safa', '0', NULL, NULL, NULL, 1, 0, NULL, 1, '', 0),
(804, 411, 'Lulu Al Safa', '0', NULL, NULL, NULL, 1, 0, NULL, 1, '', 0),
(805, 411, 'Zubair Palace', '0', NULL, NULL, NULL, 1, 0, NULL, 1, '', 0),
(806, 411, 'Al Safa Center', '0', NULL, NULL, NULL, 1, 0, NULL, 1, '', 0),
(807, 411, 'Al Safa Suit ', '0', NULL, NULL, NULL, 1, 0, NULL, 1, '', 0),
(808, 411, 'Al Safa Massi ', '0', NULL, NULL, NULL, 1, 0, NULL, 1, '', 0),
(809, 411, 'Demo Cursor', '0', NULL, NULL, NULL, 1, 0, NULL, 1, '', 0),
(810, 411, 'Central Office', '0', NULL, NULL, NULL, 1, 0, NULL, 1, '', 0),
(811, 411, 'Al Safa Tower', '0', NULL, NULL, NULL, 1, 0, NULL, 1, '', 0),
(812, 411, 'Cash Transfer To Central Office', '0', NULL, NULL, NULL, 1, 0, NULL, 1, '', 0),
(813, 76, 'Al Baraka/Abdul Aziz', '0', NULL, '', NULL, 1, 0, '10000407188', 1, '', 0),
(814, 76, 'Mohammad Abid \\ Umal qura Tours & Travls', '0', NULL, NULL, NULL, 1, 0, '10000407189', 1, '', 0),
(815, 76, 'Al malik tours / yaseen ', '0', NULL, NULL, NULL, 1, 0, '10000407190', 1, '', 0),
(816, 76, 'Supreme Travels / Viqar', '0', NULL, NULL, NULL, 1, 0, '10000407191', 1, '', 0),
(817, 76, 'Ashiq Kerala', '0', NULL, NULL, NULL, 1, 0, '10000407192', 1, '', 0),
(818, 76, 'Max travels Abdul Mannan', '0', NULL, NULL, NULL, 1, 0, '10000407193', 1, '', 0),
(819, 76, 'Ashwak Shakeel', '0', NULL, '', NULL, 1, 0, '10000407194', 1, '', 0),
(820, 76, 'AL Zowar Company', '0', NULL, NULL, NULL, 1, 0, '10000407195', 1, '', 0),
(821, 76, 'Chatta Group', '0', NULL, NULL, NULL, 1, 0, '10000407196', 1, '', 0),
(822, 76, 'Habibi Travels Waseem', '0', NULL, NULL, NULL, 1, 0, '10000407197', 1, '', 0),
(823, 76, 'Ehsan Travel maksud ', '0', NULL, NULL, NULL, 1, 0, '10000407198', 1, '', 0),
(824, 76, 'Al Noor Tours & Travels / Nayeem', '0', NULL, NULL, NULL, 1, 0, '10000407199', 1, '', 0),
(826, 76, 'Iqbal Sait', '0', NULL, 'New ', NULL, 1, 0, '10000407200', 1, '', 0),
(827, 76, 'AL FAIZI TOURS AND TRAVELS', '0', NULL, '', NULL, 1, 0, '10000407201', 1, '', 0),
(828, 76, 'Manzoor', '0', NULL, '', NULL, 1, 0, '10000407202', 1, '', 0),
(829, 76, 'Kamal wafa Usman', '0', NULL, 'Abu Nayeem Ind Mudir = 0507525237, In Madinah Mudir Usman 05', NULL, 1, 0, '10000407203', 1, '', 0),
(830, 76, 'Ali Nawaz', '0', NULL, '', NULL, 1, 0, '10000407204', 1, '', 0),
(831, 76, 'Parviz India', '0', NULL, '', NULL, 1, 0, '10000407205', 1, '', 0),
(832, 76, 'Heramain Syed', '0', NULL, '', NULL, 1, 0, '10000407206', 1, '', 0),
(833, 76, 'Al Arabian Hajj umrah Tours / Abdul Karim', '0', NULL, '', NULL, 1, 0, '10000407207', 1, '', 0),
(834, 76, 'Mudaccir / Azowar', '0', NULL, '', NULL, 1, 0, '10000407208', 1, '', 0),
(835, 76, 'Arabia Originals Tours & Travels', '0', NULL, '', NULL, 1, 0, '10000407209', 1, '', 0),
(836, 76, 'Junaid Tour and Travels', '0', NULL, '', NULL, 1, 0, '10000407210', 1, '', 0),
(837, 76, 'Karwan Hanifi or Babul Adil ', '0', NULL, 'Karwan e Hanifi Or Karwan e Babul Maneger Adil Bhai Ph,0598658612', NULL, 1, 0, '10000407211', 1, '', 0),
(838, 76, 'Hassan Mahboob / F J Travels', '0', NULL, '', NULL, 1, 0, '10000407212', 1, '', 0),
(839, 76, 'Al Taif tour and Travels / Awais', '0', NULL, '', NULL, 1, 0, '10000407213', 1, '', 0),
(840, 76, 'Basma Amar / Waqas', '0', NULL, '', NULL, 1, 0, '10000407214', 1, '', 0),
(841, 76, 'Wahid Tours & Travels', '0', NULL, '', NULL, 1, 0, '10000407215', 1, '', 0),
(842, 76, 'Abdul Majeed / Al Duha', '0', NULL, '', NULL, 1, 0, '10000407216', 1, '', 0),
(843, 76, 'Muqeem Travels / Mujeeb', '0', NULL, '', NULL, 1, 0, '10000407217', 1, '', 0),
(844, 76, 'Funadiq.com / Munib', '0', NULL, '', NULL, 1, 0, '10000407218', 1, '', 0),
(845, 76, 'Globex Tours and Travels / Jamsheed', '0', NULL, '', NULL, 1, 0, '10000407219', 1, '', 0),
(846, 76, 'Sharika Eliyas', '0', NULL, '', NULL, 1, 0, '10000407220', 1, '', 0),
(847, 76, 'As Safa Wal Marwah Tours / MD Suhail', '0', NULL, '', NULL, 1, 0, '10000407221', 1, '', 0),
(848, 76, 'Ghulam Murtoza', '0', NULL, '', NULL, 1, 0, '10000407222', 1, '', 0),
(849, 76, 'Manzoor / Pakistan', '0', NULL, '', NULL, 1, 0, '10000407223', 1, '', 0),
(850, 76, 'Hadi-Masarat/Parvez', '0', NULL, '', NULL, 1, 0, '10000407224', 1, '', 0),
(851, 76, 'Hadi-Masarat/Parvez', '0', NULL, '', NULL, 1, 0, '10002283', 1, '', 0),
(852, 76, 'ALTWAFUQ TRAVELS/Faisal', '0', NULL, '', NULL, 1, 0, '10000407225', 1, '', 0),
(853, 76, 'Sahriar Abdul Halim', '0', NULL, '', NULL, 1, 0, '10000407226', 1, '', 0),
(854, 76, 'Yaseen/Nawabsah', '0', NULL, '', NULL, 1, 0, '10000407227', 1, '', 0),
(855, 76, 'Abdul Malik /Huzaifa', '0', NULL, '', NULL, 1, 0, '10000407228', 1, '', 0),
(856, 76, 'Adnan/Owais', '0', NULL, '', NULL, 1, 0, '10000407229', 1, '', 0),
(857, 76, 'Nesar/Al Arooz-Pakistan', '0', NULL, '', NULL, 1, 0, '10000407230', 1, '', 0),
(858, 76, 'Mohammed Ashfaq Ahmed', '0', NULL, '', NULL, 1, 0, '10000407231', 1, '', 0),
(859, 76, 'Ali Raza', '0', NULL, '', NULL, 1, 0, '10000407232', 1, '', 0),
(860, 76, 'Qury Ataullah', '0', NULL, '', NULL, 1, 0, '10000407233', 1, '', 0),
(861, 76, 'Rawdat Al Molaby Group/Sherif Al-Shishtawi', '0', NULL, '', NULL, 1, 0, '10000407234', 1, '', 0),
(862, 76, 'KZ GROUP/Awais', '0', NULL, '', NULL, 1, 0, '10000407235', 1, '', 0),
(863, 76, 'Air Usman Travels/Muhammad Anowar', '0', NULL, '', NULL, 1, 0, '10000407236', 1, '', 0),
(864, 76, 'Air Usman Travels/Muhammad Anowar', '0', NULL, '', NULL, 1, -666, '10002297', 1, '', 0),
(865, 76, 'Sharika Binham/Mesbha', '0', NULL, '', NULL, 1, 0, '10000407237', 1, '', 0),
(866, 76, 'Idris Muhammad', '0', NULL, '', NULL, 1, 0, '10000407238', 1, '', 0),
(867, 76, 'Professor Ahmed Ali', '0', NULL, '', NULL, 1, 0, '10000407239', 1, '', 0),
(868, 76, 'Dunia Aviation/Yassen', '0', NULL, '', NULL, 1, 0, '10000407240', 1, '', 0),
(869, 76, 'Sidra Tours & Travels', '0', NULL, '', NULL, 1, 0, '10000407241', 1, '', 0),
(870, 76, 'Luck Umrah Tours/Farhan', '0', NULL, '', NULL, 1, 0, '10000407242', 1, '', 0),
(871, 76, 'Yaseen Parsonal Al Hunain', '0', NULL, 'Yassen Parsonal Account Work ', NULL, 1, 0, '10000407243', 1, '', 0),
(872, 76, 'Al Hunain Shahzad Yaseen', '0', NULL, 'Al Hunain Shahzad Adnan ', NULL, 1, 0, '10000407244', 1, '', 0),
(873, 76, 'J K TOUTS & TRAVELS/TARAQ', '0', NULL, '', NULL, 1, 0, '10000407245', 1, '', 0),
(874, 76, 'As Sunnah Tours & Travels/ Syed Saqib', '0', NULL, '', NULL, 1, 0, '10000407246', 1, '', 0),
(875, 76, 'MD.Rana Zapor', '0', NULL, '', NULL, 1, 0, '10000407247', 1, '', 0),
(876, 76, 'Sartaj Ahmed-Pakistan', '0', NULL, '', NULL, 1, 0, '10000407248', 1, '', 0),
(877, 76, 'Wadiyar Al Madina/Zulpiqar', '0', NULL, '', NULL, 1, 0, '10000407249', 1, '', 0),
(878, 76, 'Sumaira Aviation/Sazzad', '0', NULL, '', NULL, 1, 0, '10000407250', 1, '', 0),
(879, 76, 'Ameena Tours/Mubarak', '0', NULL, '', NULL, 1, 0, '10000407251', 1, '', 0),
(880, 76, 'Hemad Travels/Waqas', '0', NULL, '', NULL, 1, 0, '10000407252', 1, '', 0),
(881, 76, 'M ROHAN TRAVELS & TOURS/NAVED', '0', NULL, '', NULL, 1, 0, '10000407253', 1, '', 0),
(882, 76, 'Mohsin / Hyderabad ', '0', NULL, '', NULL, 1, 0, '10000407254', 1, '', 0),
(883, 76, 'Irfan / Pakistan', '0', NULL, '', NULL, 1, 0, '10000407255', 1, '', 0),
(884, 76, 'Al Ebrar Travels/Sadiq', '0', NULL, 'Sayed Muhammad Sadiq ', NULL, 1, 0, '10000407256', 1, '', 0),
(885, 76, 'Kawan-Safina-E-Raza Travels', '0', NULL, '', NULL, 1, 0, '10000407257', 1, '', 0),
(886, 76, 'Al Kazi Tours & Travels/ muhammad Hussain', '0', NULL, '', NULL, 1, 0, '10000407258', 1, '', 0),
(887, 76, 'Khidmat Travels Turist-UK/Aftab Ahmed Chowdury', '0', NULL, 'By Anjuman', NULL, 1, 0, '10000407259', 1, '', 0),
(888, 76, 'Qunain Travels/Hafej Khasem', '0', NULL, '', NULL, 1, 0, '10000407260', 1, '', 0),
(889, 76, 'Royal Blue Travels/Tanveer', '0', NULL, '', NULL, 1, 0, '10000407261', 1, '', 0),
(890, 76, 'Abdul Aziz/Pakistan', '0', NULL, '', NULL, 1, 0, '10000407262', 1, '', 0),
(891, 76, 'Al Falah Tours & Travels', '0', NULL, '', NULL, 1, 0, '10000407263', 1, '', 0),
(892, 76, 'Hamza Bina/Ejab Chowdury', '0', NULL, '', NULL, 1, 0, '10000407264', 1, '', 0),
(893, 76, 'HNH Travels-Anas', '0', NULL, '', NULL, 1, 0, '10000407265', 1, '', 0),
(894, 76, 'Lala International-Pakistan/Maqsud', '0', NULL, '', NULL, 1, 0, '10000407266', 1, '', 0),
(895, 76, 'Al Safa Tours & Travels', '0', NULL, '', NULL, 1, 0, '10000407267', 1, '', 0),
(896, 76, 'Al Kabir/Abdur Rahman', '0', NULL, '', NULL, 1, 0, '10000407268', 1, '', 0),
(897, 76, 'M.JAHID TRAVELS/ IMRAN', '0', NULL, '', NULL, 1, 0, '10000407269', 1, '', 0),
(898, 76, 'Ameena Tours & Travels/Siraz pk', '0', NULL, '', NULL, 1, 0, '10000407270', 1, '', 0),
(899, 76, 'Hatim E Khaba/Qury Shaheb', '0', NULL, '', NULL, 1, 0, '10000407271', 1, '', 0),
(900, 76, 'Latip Tours & Travels/ MD Munir', '0', NULL, '', NULL, 1, 0, '10000407272', 1, '', 0),
(902, 76, 'Al Makka Travels/Muwazzam', '0', NULL, '', NULL, 1, 0, '10000407273', 1, '', 0),
(903, 76, 'UFA Enterprises-Md Ezaz', '0', NULL, '', NULL, 1, 0, '10000407274', 1, '', 0),
(904, 76, 'Al Taqwa/Abdus Samad', '0', NULL, '', NULL, 1, 0, '10000407275', 1, '', 0),
(905, 76, 'Marhaba Tours & Travels/Tayyab ', '0', NULL, '', NULL, 1, 0, '10000407276', 1, '', 0),
(906, 76, 'Malik Riyaz-Pakistan/Selim', '0', NULL, '', NULL, 1, 0, '10000407277', 1, '', 0),
(907, 76, 'Al Sada Tours/Ayyub', '0', NULL, '', NULL, 1, 0, '10000407278', 1, '', 0),
(908, 76, 'Tour D Care/ Belal Vai', '0', NULL, 'By Irfan vai', NULL, 1, 0, '10000407279', 1, '', 0),
(909, 76, 'Subidha Tours & Travels/Riduwan', '0', NULL, '', NULL, 1, 0, '10000407280', 1, '', 0),
(910, 76, 'Abrar Air Travels/Sayedur Rahman', '0', NULL, '', NULL, 1, 0, '10000407281', 1, '', 0),
(912, 76, 'Welfare Tours & Travels/Hamidul Islam', '0', NULL, '', NULL, 1, 0, '10000407282', 1, '', 0),
(913, 76, 'Al Madina Tours @ Travels/Md Abdullah ', '0', NULL, '', NULL, 1, 0, '10000407283', 1, '', 0),
(915, 76, 'Diyar Al Masy//Usman', '0', NULL, '', NULL, 1, 0, '10000407284', 1, '', 0),
(916, 76, 'Madina Tours & Travels/Sayed Ali', '0', NULL, '', NULL, 1, 0, '10000407285', 1, '', 0),
(917, 76, 'Arjuwan Al Madina/Akram', '0', NULL, '', NULL, 1, 0, '10000407286', 1, '', 0),
(918, 76, 'Eklas Tours & Travels/Sapeer', '0', NULL, '', NULL, 1, 0, '10000407287', 1, '', 0),
(919, 76, 'Ehsan-Masarat/Personal', '0', NULL, '', NULL, 1, 0, '10000407288', 1, '', 0),
(920, 76, 'Yamany International/Abu Bokkor', '0', NULL, '', NULL, 1, 0, '10000407289', 1, '', 0),
(921, 76, 'Ibrahim/Karacy', '0', NULL, '', NULL, 1, 0, '10000407290', 1, '', 0),
(922, 76, 'Binnoria Hajj & Umrah/Md Fazal', '0', NULL, '', NULL, 1, 0, '10000407291', 1, '', 0),
(923, 76, 'SN Tours & Travels/MD,Shah Alam', '0', NULL, '', NULL, 1, 0, '10000407292', 1, '', 0),
(924, 76, 'Duhar Novabgonj Hajj Kafela/Moulana Ibrahim', '0', NULL, '', NULL, 1, 0, '10000407293', 1, '', 0),
(925, 76, 'Ershad /Personal', '0', NULL, 'From Al Baraka', NULL, 1, 0, '10000407294', 1, '', 0),
(926, 76, 'Abdul Mazid /Personal', '0', NULL, '', NULL, 1, 0, '10000407295', 1, '', 0),
(927, 76, 'Al Munazah Tours & Travels PVT.LTD.', '0', NULL, '', NULL, 1, 0, '10000407296', 1, '', 0),
(928, 76, 'Ridwan Travels/Razaul Karim', '0', NULL, '', NULL, 1, 0, '10000407297', 1, '', 0),
(929, 76, 'Khadem Al Madina/Abdul Munayem', '0', NULL, '', NULL, 1, 0, '10000407298', 1, '', 0),
(930, 76, 'J Y Overseas & Hajj Kafela/-Md.Anowar Ctg', '0', NULL, '', NULL, 1, 0, '10000407299', 1, '', 0),
(931, 76, 'Al Kabir Tours & Travels/Hyder', '0', NULL, '', NULL, 1, 0, '10000407300', 1, '', 0),
(932, 76, 'Tayyab Pakistan', '0', NULL, '', NULL, 1, 0, '10000407301', 1, '', 0),
(933, 76, 'Madani Travels-Madani', '0', NULL, '', NULL, 1, 0, '10000407302', 1, '', 0),
(934, 76, 'Sahara Hajj Umrah Serviseas-/Basit', '0', NULL, 'Retation With Al Fala Tours Imran', NULL, 1, 0, '10000407303', 1, '', 0),
(935, 76, 'Abdullah /Hotel Mahbub Al Tayyaba', '0', NULL, '', NULL, 1, 0, '10000407304', 1, '', 0),
(936, 76, 'Nafam Group Hajj & Umrah Specialist--Md Sohel', '0', NULL, '', NULL, 1, 0, '10000407305', 1, '', 0),
(937, 76, 'Al Tawakal Tours & Travels-Rana Ataullah', '0', NULL, '', NULL, 1, 0, '10000407306', 1, '', 0),
(938, 76, 'Abu Turki Diyar Masi', '0', NULL, 'Abu Turki Cousin Abu Abdullah Zowar, Realitive Hoqe Newaz', NULL, 1, 0, '10000407307', 1, '', 0),
(939, 76, 'Gowher-Khasmiri', '0', NULL, '', NULL, 1, 0, '10000407308', 1, '', 0),
(940, 76, 'Al Imam Hajj Kafela-Nejam', '0', NULL, '', NULL, 1, 0, '10000407309', 1, '', 0),
(941, 76, 'Baleeno Travel--Farhan', '0', NULL, '', NULL, 1, 0, '10000407310', 1, '', 0),
(942, 76, 'Gul Zada Tours & Travels-Rhased', '0', NULL, '', NULL, 1, 0, '10000407311', 1, '', 0),
(943, 76, 'Riyad Malih-Libia', '0', NULL, '', NULL, 1, 0, '10000407312', 1, '', 0),
(944, 76, 'Parabath Tours & Travels/Rahmatul Bary ', '0', NULL, '', NULL, 1, 0, '10000407313', 1, '', 0),
(945, 76, 'Al Affan Tours & Travels-Ershad', '0', NULL, '', NULL, 1, 0, '10000407314', 1, '', 0),
(946, 76, 'K.M Tours & Travels-Mr Zubair', '0', NULL, '', NULL, 1, 0, '10000407315', 1, '', 0),
(947, 76, 'Wat-World Aviation Travels & Tours-Rana Zapor', '0', NULL, '', NULL, 1, 0, '10000407316', 1, '', 0),
(948, 76, 'Subhan Travels-Akhil Pk', '0', NULL, '', NULL, 1, 0, '10000407317', 1, '', 0),
(949, 76, 'Asad Bati-Pakistan', '0', NULL, '', NULL, 1, 0, '10000407318', 1, '', 0),
(950, 76, 'Ahmad Muhammad Khalil', '0', NULL, '', NULL, 1, 0, '10000407319', 1, '', 0),
(951, 76, 'Waqas International Travel (Pvt) Ltd-Saik Vai', '0', NULL, '', NULL, 1, 0, '10000407320', 1, '', 0),
(952, 76, 'Techno Travels & Tours-Shah Alam', '0', NULL, '', NULL, 1, 0, '10000407321', 1, '', 0),
(953, 76, 'Asdaf Umrah Services-M. Aslam Tahiri', '0', NULL, '', NULL, 1, 0, '10000407322', 1, '', 0),
(954, 76, 'Yasir Travels-Sajed', '0', NULL, '', NULL, 1, 0, '10000407323', 1, '', 0),
(955, 76, 'Sukkur travel/Belal Jatoi', '0', NULL, '', NULL, 1, 0, '10000407324', 1, '', 0),
(956, 76, 'Muhammad Nasir', '0', NULL, '', NULL, 1, 0, '10000407325', 1, '', 0),
(957, 76, 'Anam Bd-Durrat Eliyas', '0', NULL, '', NULL, 1, 0, '10000407326', 1, '', 0),
(958, 76, 'Al Yasir-Shahed', '0', NULL, '', NULL, 1, 0, '10000407327', 1, '', 0),
(959, 76, 'Abu Belal Travels-Muhammad Ismail', '0', NULL, '', NULL, 1, 0, '10000407328', 1, '', 0),
(960, 76, 'Sharika Muhajjor Rommal/Yaqub Afgany', '0', NULL, '', NULL, 1, 0, '10000407329', 1, '', 0),
(961, 76, 'Ansari Tours & Travels-Muhammad Qasim', '0', NULL, '', NULL, 1, 0, '10000407330', 1, '', 0),
(962, 76, 'Abdul Mazid /Personal', '0', NULL, '', NULL, 1, 0, '10000407331', 1, '', 0),
(963, 76, 'M.JAHID TRAVELS/ IMRAN', '0', NULL, '', NULL, 1, 0, '10000407332', 1, '', 0),
(964, 76, 'Mudaccir-Mubin', '0', NULL, '', NULL, 1, 0, '10000407333', 1, '', 0),
(965, 76, 'An Nahian Hajj Kafela-Mr Ismail', '0', NULL, '', NULL, 1, 0, '10000407334', 1, '', 0),
(966, 76, 'Anwar Pakistan-Kidmat Indian', '0', NULL, '', NULL, 1, 0, '10000407335', 1, '', 0),
(967, 76, 'New World Travel & Tours-Md Belal', '0', NULL, '', NULL, 1, 0, '10000407336', 1, '', 0),
(968, 76, 'Al Hadaya Group-Yaseen ', '0', NULL, '', NULL, 1, 0, '10000407337', 1, '', 0),
(969, 76, 'Ethmar Travels & Tours', '0', NULL, '', NULL, 1, 0, '10000407338', 1, '', 0),
(970, 76, 'Ethmar Travels & Tours', '0', NULL, '', NULL, 1, 0, '10000407339', 1, '', 0),
(971, 76, 'Sajjed (Bd)0088', '0', NULL, '', NULL, 1, 0, '10000407340', 1, '', 0),
(972, 76, 'Sami rajpoot traevels-Iftikhar', '0', NULL, '', NULL, 1, 0, '10000407341', 1, '', 0),
(973, 76, 'Irfan-Max-Personal', '0', NULL, '', NULL, 1, 0, '10000407342', 1, '', 0),
(974, 76, 'Wasim Bakar-India', '0', NULL, '', NULL, 1, 0, '10000407343', 1, '', 0),
(975, 76, 'Labbaik Overseas Ltd-Md Kawsar', '0', NULL, '', NULL, 1, 0, '10000407344', 1, '', 0),
(976, 76, 'Adom Al Ghat-Ibrahim Abu Rayan', '0', NULL, '', NULL, 1, 0, '10000407345', 1, '', 0),
(977, 76, 'Tamanna Travels-Md Mamun Vai', '0', NULL, '', NULL, 1, 0, '10000407346', 1, '', 0),
(978, 76, 'Great Air Travels-Mr Arjuman', '0', NULL, '', NULL, 1, 0, '10000407347', 1, '', 0),
(979, 76, 'Musa Ishaque Corporation-Mr Soaib', '0', NULL, '', NULL, 1, 0, '10000407348', 1, '', 0),
(980, 76, 'Tasfique Travels-Mr Samrat', '0', NULL, '', NULL, 1, 0, '10000407349', 1, '', 0),
(981, 76, 'Al Safeer Tours & Travels-Ali Hussain Box', '0', NULL, '', NULL, 1, 0, '10000407350', 1, '', 0),
(982, 76, 'Etemad Tours & Travels-Mr Rapiq', '0', NULL, '', NULL, 1, 0, '10000407351', 1, '', 0),
(983, 76, 'Jonaki Travels-Wazedur Rahamn', '0', NULL, '', NULL, 1, 0, '10000407352', 1, '', 0),
(984, 76, 'Gul Foraz. Shahed pakistam', '0', NULL, '', NULL, 1, 0, '10000407353', 1, '', 0),
(985, 76, 'Abdullah Al Ghamdi-Malek Boshir', '0', NULL, '', NULL, 1, 0, '10000407354', 1, '', 0),
(986, 76, 'Al Miqat Tours-Muhammad Jamil', '0', NULL, '', NULL, 1, 0, '10000407355', 1, '', 0),
(987, 76, 'Abu Atia-Chaina', '0', NULL, '', NULL, 1, 0, '10000407356', 1, '', 0),
(988, 76, 'Ghulam Murthoza-Binham Personal', '0', NULL, '', NULL, 1, 0, '10000407357', 1, '', 0),
(989, 76, 'Heremain-Mr Safat', '0', NULL, '', NULL, 1, 0, '10000407358', 1, '', 0),
(990, 76, 'Makka Tours & Travels-Haji Imran Malek', '0', NULL, '', NULL, 1, 0, '10000407359', 1, '', 0),
(991, 76, 'Al Baraka-Nafesi/Humayon', '0', NULL, '', NULL, 1, 0, '10000407360', 1, '', 0),
(992, 76, 'Ajwa International Tours & Travels-Mohammad Khatib', '0', NULL, '', NULL, 1, 0, '10000407361', 1, '', 0),
(993, 76, 'Al Heremain-Md Faiz', '0', NULL, '', NULL, 1, 0, '10000407362', 1, '', 0),
(994, 76, 'Ibrahim Mansur-Hotel Andulus ', '0', NULL, '', NULL, 1, 0, '10000407363', 1, '', 0),
(995, 76, 'Global Travels', '0', NULL, '', NULL, 1, 0, '10000407364', 1, '', 0),
(996, 76, 'Parvez-Personal/Pakistan', '0', NULL, '', NULL, 1, 0, '10000407365', 1, '', 0),
(997, 76, 'Bangladesh Hajje Baitullah Tours & Travels', '0', NULL, '', NULL, 1, 0, '10000407366', 1, '', 0),
(998, 76, 'Arjumand Tours & Travels Pvt Ltd', '0', NULL, '', NULL, 1, 0, '10000407367', 1, '', 0),
(999, 76, 'Shaiq personal', '0', NULL, '', NULL, 1, 0, '10000407368', 1, '', 0),
(1000, 76, 'Shaiq personal', '0', NULL, '', NULL, 1, 0, '10000407369', 1, '', 0),
(1001, 76, 'Madanion Al Madina-Mr Nijam Uddin', '0', NULL, '', NULL, 1, 0, '10000407370', 1, '', 0),
(1002, 76, ' Ifrha Tours & Travels/Irfan', '0', NULL, '', NULL, 1, 0, '10000407371', 1, '', 0),
(1005, 76, 'Mezaab-E-Kaaba', '0', NULL, '', NULL, 1, 0, '10000407372', 1, '', 0),
(1006, 76, 'Al-Hadaya Group-Yaseen', '0', NULL, NULL, NULL, 1, 0, '10000407373', 1, '', 0),
(1007, 76, 'Omar Faruk Travels-Kolkata-Sahin Rahman', '0', NULL, '', NULL, 1, 0, '10000407374', 1, '', 0),
(1008, 76, 'Reduwan', '0', NULL, '', NULL, 1, 0, '10000407375', 1, '', 0),
(1009, 4, 'Rev', '', '2020-01-19', '', '1', 2, 0, '40001', 1, '', 0),
(1010, 76, 'Al Zahir Travels& Tours-Mazhar', '0', NULL, '', NULL, 1, 0, '10000407376', 1, '', 0),
(1011, 76, 'Ayesha Tours Hajj & Umrah-Sayed Azhar', '0', NULL, '', NULL, 1, 0, '10000407377', 1, '', 0),
(1012, 76, 'Yanus personal', '0', NULL, '', NULL, 1, 0, '10000407378', 1, '', 0),
(1013, 76, 'MAWAQET HAJJ & UMRAH-Mr Muhi', '0', NULL, 'Reservation Hotel Mawaqet ', NULL, 1, 0, '10000407379', 1, '', 0),
(1014, 76, 'Alif International Tours & Travels-Mr Hamza', '0', NULL, 'Guzrat-India', NULL, 1, 0, '10000407380', 1, '', 0),
(1015, 76, 'Qawafil Al Zowar-Esham', '0', NULL, '', NULL, 1, 0, '10000407381', 1, '', 0),
(1016, 76, 'Allied Tours & Travels-Fayyaz Ahmed', '0', NULL, '', NULL, 1, 0, '10000407382', 1, '', 0),
(1017, 76, 'Maqsum Bhai-Pakistan', '0', NULL, '', NULL, 1, 0, '10000407383', 1, '', 0),
(1018, 76, 'Waqas International Travel (Pvt) Ltd-Sai', '0', NULL, '', NULL, 1, 0, '10000407384', 1, '', 0),
(1019, 76, 'Etlala Makka-Gukzar Pk', '0', NULL, '', NULL, 1, 0, '10000407385', 1, '', 0),
(1020, 76, 'test agent', '0', NULL, '', NULL, 1, 0, '10002217141', 1, '', 0),
(1021, 76, 'test agent 2 fd', '0', NULL, 'test agent 2 fd remarks', NULL, 1, 0, '10002217142', 1, '', 0),
(1022, 76, 'test agent 3 sa-am', '0', NULL, 'test agent 3 sa-am remarks', NULL, 1, 0, '10002217143', 1, '', 0),
(1023, 76, 'test agent 4 sa-fd update', '0', NULL, 'test agent 4 sa-fd remarks', NULL, 1, 0, '10002217145', 1, '', 0),
(1024, 76, 'Saik-Personal-Pakistan', '0', NULL, '', NULL, 1, 0, '10002217146', 1, '', 0),
(1025, 76, 'Saik-Personal-Pakistan', '0', NULL, '', NULL, 1, 0, '10002217147', 1, '', 0),
(1026, 76, 'Saik-Personal-Pakistan', '0', NULL, '', NULL, 1, 0, '10002217148', 1, '', 0),
(1027, 76, 'Saik-Personal-Pakistan', '0', NULL, '', NULL, 1, 0, '10002217149', 1, '', 0),
(1028, 76, 'Saik-Personal-Pakistan', '0', NULL, 'NA', NULL, 1, 0, '10000407386', 1, '', 0),
(1029, 76, 'Monir Ahmed-Parsonal-Latip Travels', '0', NULL, '', NULL, 1, 0, '10000407387', 1, '', 0),
(1030, 76, 'U-Travels-Mr Farhan', '0', NULL, 'U Travels -PAKISTAN-From Akmal Bhai Basma Emmar', NULL, 1, 0, '10000407388', 1, '', 0),
(1031, 76, 'Al Bosra International Tours & Travels-Imtiaz', '0', NULL, 'India Kashmir', NULL, 1, 0, '10000407389', 1, '', 0),
(1032, 76, 'Taibah Borshad Tours & Travels-Selim', '0', NULL, '', NULL, 1, 0, '10000407390', 1, '', 0),
(1033, 76, 'The Heaven Tours & Travels-Aziz Bhai', '0', NULL, 'Kolkata', NULL, 1, 0, '10000407391', 1, '', 0),
(1034, 76, 'At Tawhid Travels-Abdur Rahman', '0', NULL, '', NULL, 1, 0, '10000407392', 1, '', 0),
(1035, 76, 'IRFAN-CASH', '0', NULL, '', NULL, 1, 0, '10000407393', 1, '', 0),
(1036, 76, 'AWIS VHIA /BARIK', '0', NULL, '', NULL, 1, 0, '10000407394', 1, '', 0),
(1037, 76, 'Johdo Taqwa Catering Service-Mr Abid', '0', NULL, '', NULL, 1, 0, '10000407395', 1, '', 0),
(1038, 76, 'Ethmar Tours & Travels-Mr Zia', '0', NULL, '', NULL, 1, 0, '10000407396', 1, '', 0),
(1039, 76, 'Lahore Travels-Ch Akhter Ali', '0', NULL, '', NULL, 1, 0, '10000407397', 1, '', 0),
(1040, 76, 'Kawser Aziz-Kashmir', '0', NULL, 'India Kashmir', NULL, 1, 0, '10000407398', 1, '', 0),
(1041, 76, 'Sherag Al Madina Tours & Travel/ Shahid', '0', NULL, 'From Basma Amar / Waqas', NULL, 1, 0, '10000407399', 1, '', 0),
(1042, 76, 'The Rafi Travels & Tours-Abdul Halim Rafi', '0', NULL, '', NULL, 1, 0, '10000407400', 1, '', 0),
(1043, 109, 'Test', '0', '2020-07-13', NULL, '1', 1, 0, '10000406052', 1, 'Test', 0),
(1044, 77, 'aa update', '0', '2020-07-13', NULL, '1', 2, 0, '20000407', 1, 'aa update', 0),
(1045, 77, 'SA Enterprise Ltd', '0', '2020-07-20', NULL, '1', 2, 0, '20000407', 1, 'SA Enterprise Ltd', 0),
(1046, 445, 'Alif Traders', '0', '2020-07-29', NULL, '1', 2, 0, '1000040701', 1, 'Alif Traders', 0),
(1048, 12, 'Test Bank10000406042', '0', '2020-07-19', NULL, '1', 1, 0, '10000406042', 1, '', 0),
(1049, 109, 'Test cash', '0', NULL, '', '1', 1, 0, '10000406053', 1, '', 0),
(1050, 109, 'Test Cash 2', '0', NULL, '', '1', 1, 0, '10000406054', 1, '', 0),
(1051, 109, 'Test Cash 3', '0', NULL, '', '1', 1, 0, '10000406055', 1, '', 0),
(1052, 3, 'Test expense', '0', NULL, '', '1', 1, 0, '30002', 1, '', 0),
(1053, 109, 'Test Cash 4', '0', NULL, '', '1', 1, 0, '10000406056', 1, '', 0),
(1054, 87, 'test', '0', NULL, '', '1', 2, 0, '40000707', 1, '', 0),
(1055, 87, 'test 2', '0', NULL, '', '1', 2, 0, '40000708', 1, '', 0),
(1056, 395, 'test 5', '0', NULL, '', '1', 1, 0, '3000181', 2, '', 0),
(1057, 87, 'test', '0', NULL, '', '1', 2, 0, '40000709', 1, '', 0),
(1058, 218, 'test', '0', NULL, '', '1', 2, 0, '400007011', 2, '', 0),
(1059, 218, 'test', '0', NULL, '', '1', 2, 0, '400007012', 2, '', 0),
(1060, 218, 'test', '0', NULL, '', '1', 2, 0, '400007013', 2, '', 0),
(1061, 218, 'test', '0', NULL, '', '1', 2, 0, '400007014', 2, '', 0),
(1062, 418, 'test da', '0', NULL, '', '1', 1, 0, '100004111', 1, '', 0),
(1063, 423, 'Commision -4', '0', NULL, '', '1', 1, 0, '300011091', 1, '', 0),
(1064, 423, 'de', '0', NULL, '', '1', 1, 0, '300011092', 1, '', 0),
(1065, 423, '4444', '0', NULL, '', '1', 1, 0, '300011093', 1, '', 0),
(1066, 423, '6666', '0', NULL, '', '1', 1, 0, '300011094', 1, '', 0),
(1067, 78, 'Machinery A/c', '0', NULL, '', '1', 1, 0, '100003031', 1, 'Machinery A/c', 0),
(1068, 424, 'Computer Software', '0', NULL, '', '1', 1, 0, '100003051', 1, 'Computer Software', 0),
(1069, 424, 'Computer Software Accumulated Depreciation', '0', NULL, '', '1', 1, 0, '100003052', 1, 'Computer Software Accumulated Depreciation', 0),
(1070, 417, 'Majed Enterprise', '0', '2020-07-19', NULL, '1', 2, 0, '2000040701', 1, 'Majed Enterprise', 0),
(1071, 12, 'Test Bank 210000406043', '0', '2020-07-19', NULL, '1', 1, 0, '10000406043', 1, '', 0),
(1072, 77, 'Raihan Traders', '0', '2020-07-19', NULL, '1', 2, 0, '20000407', 1, '', 0),
(1073, 77, 'A2Z Vendor', '0', '2020-07-20', NULL, '1', 2, 0, '20000407', 1, 'A2Z Vendor', 0),
(1074, 109, 'Cash Test', '0', '2020-07-20', NULL, '1', 1, 0, '10000406057', 1, 'Cash Test', 0),
(1075, 78, 'Testing', '0', NULL, '', '1', 1, 0, '100003032', 1, 'Testing', 0),
(1076, 430, 'Testing', '0', NULL, '', '1', 1, 0, '10000303011', 1, 'Testing', 0),
(1077, 417, 'Taher Store', '0', '2020-07-20', NULL, '1', 2, 0, '2000040701', 1, '', 0),
(1078, 77, 'Vendor A', '0', '2020-07-22', NULL, '1', 2, 0, '20000407', 1, '', 0),
(1079, 417, 'Vendor B', '0', '2020-07-22', NULL, '1', 2, 0, '2000040701', 1, '', 0),
(1080, 10, 'Furniture & Fixtures', '0', NULL, '', '1', 1, 0, '1000031', 1, 'Furniture & Fixtures', 0),
(1081, 444, 'Printer', '0', NULL, '', '1', 1, 0, '100003061', 1, 'Printer', 0),
(1082, 445, 'Cursor', '0', NULL, '', '1', 1, 0, '10000407011', 1, '', 0),
(1083, 445, 'Globelink', '0', NULL, '', '1', 1, 0, '10000407012', 1, '', 0),
(1084, 77, 'test customer', '0', '2020-07-28', NULL, '1', 2, 0, '20000407', 1, 'test cus foreign', 0),
(1086, 12, 'Bank of Saudi Arabia10000406045', '0', '2020-07-29', NULL, '1', 1, 0, '10000406045', 1, '', 0),
(1087, 445, 'Customer 1', '0', '2020-07-29', NULL, '1', 2, 0, '1000040701', 1, 'Customer 1 fn', 0),
(1088, 445, 'customer 2', '0', '2020-07-29', NULL, '1', 2, 0, '1000040701', 1, 'customer 2 fn', 0),
(1089, 445, 'Joti Ent', '0', '2020-08-08', NULL, '1', 2, 0, '1000040701', 1, 'Joti Ent', 0),
(1090, 446, 'Salary Ledger', '0', NULL, '', '1', 1, 0, '30001105011', 1, '', 0),
(1091, 12, 'Bank Name10000406046', '0', '2020-07-29', NULL, '1', 1, 0, '10000406046', 1, '', 0),
(1092, 415, 'rashed salary 001', '0', NULL, '', '1', 1, 0, '3000201', 1, '', 0),
(1093, 415, 'rashed advance', '0', NULL, '', '1', 1, 0, '3000202', 1, '', 0),
(1094, 415, 'rashed loan', '0', NULL, '', '1', 1, 0, '3000203', 1, '', 0),
(1095, 415, 'rashed pf', '0', NULL, '', '1', 1, 0, '3000204', 1, '', 0),
(1100, 415, 'Imtiaz Salary', '0', NULL, '', '1', 1, 0, '3000208', 1, '', 0),
(1101, 415, 'Imtiaz Advance', '0', NULL, '', '1', 1, 0, '3000209', 1, '', 0),
(1102, 415, 'Imtiaz Loan', '0', NULL, '', '1', 1, 0, '30002010', 1, '', 0),
(1103, 415, 'Imtiaz PF', '0', NULL, '', '1', 1, 0, '30002011', 1, '', 0),
(1105, 415, 'Tarek Salary', '0', NULL, '', '1', 1, 0, '30002013', 1, '', 0),
(1106, 415, 'Tarek Advance', '0', NULL, '', '1', 1, 0, '30002014', 1, '', 0),
(1107, 415, 'Tarek Loan', '0', NULL, '', '1', 1, 0, '30002015', 1, '', 0),
(1108, 415, 'Tarel PF', '0', NULL, '', '1', 1, 0, '30002016', 1, '', 0),
(1110, 408, 'XYZ(con-1010)', '0', '2020-08-05', NULL, '1', 1, 0, '100004101', 1, '', 0),
(1111, 458, 'Mizan', '0', '2020-08-10', NULL, '1', 2, 0, '1000040703', 1, 'Mizan', 0),
(1112, 87, 'Mkt Sales Revenue  ', '0', NULL, '', '1', 2, 0, '40000710', 1, '', 0),
(1113, 458, 'Lalkhan Bazar', '0', '2020-08-19', NULL, '127', 2, 0, '1000040703', 1, '', 0),
(1114, 457, 'MKT Customer', '0', '2020-08-20', NULL, '127', 2, 0, '1000040702', 1, '', 0),
(1115, 457, 'MKT Customer 2', '0', '2020-08-20', NULL, '1', 2, 0, '1000040702', 1, '', 0),
(1116, 465, 'Purchase Commission', '0', NULL, '', '1', 2, 0, '400009051', 1, '', 0),
(1117, 457, 'Customer 3', '0', '2020-08-29', NULL, '1', 2, 0, '1000040702', 1, 'Customer 3', 0),
(1118, 457, 'Customer 4', '0', '2020-08-31', NULL, '1', 2, 0, '1000040702', 1, 'Customer 4', 0),
(1119, 467, 'Inventories Stock', '0', NULL, '', '1', 1, 0, '100004121', 1, '', 0),
(1120, 108, 'Damage Stock', '0', NULL, '', '1', 1, 0, '3000151', 1, '', 0),
(1121, 467, 'Sales Return', '0', NULL, '', '1', 1, 0, '100004122', 1, 'Sales Return', 0),
(1122, 18, 'Dealer Damage', '0', NULL, '', '1', 1, 0, '3000121', 1, 'Dealer Damage', 0),
(1123, 458, 'test customer', '0', '2020-09-06', NULL, '1', 2, 0, '1000040703', 1, 'test customer', 0),
(1124, 458, 'Oxygen', '0', '2020-09-06', NULL, '1', 2, 0, '1000040703', 1, '', 0),
(1125, 457, 'MS Jani Ent', '0', '2020-09-06', NULL, '1', 2, 0, '1000040702', 1, '', 0),
(1126, 458, 'Ami', '0', '2020-09-07', NULL, '1', 2, 0, '1000040703', 1, 'ami', 0),
(1127, 458, 'You', '0', '2020-09-07', NULL, '1', 2, 0, '1000040703', 1, 'you', 0),
(1128, 457, 'abc', '0', '2020-09-07', NULL, '1', 2, 0, '1000040702', 1, '', 0),
(1187, 465, 'SP Sales', '0', NULL, '', '1', 2, 0, '400009052', 1, '', 0),
(1188, 465, 'CP Sales', '0', NULL, '', '1', 2, 0, '400009053', 1, '', 0),
(1189, 465, 'Icecream Dept. Sales', '0', NULL, '', '1', 2, 0, '400009054', 1, '', 0),
(1190, 465, 'Fast Food Dept. Sales', '0', NULL, '', '1', 2, 0, '400009055', 1, '', 0),
(1191, 495, 'Tol 110 No Car', '0', NULL, '', '142', 1, 0, '3000211', 1, '', 0),
(1192, 495, 'Tol 39 No car', '0', NULL, '', '142', 1, 0, '3000212', 1, '', 0),
(1193, 496, 'Fuel Exp: 39 No Car', '0', NULL, '', '142', 1, 0, '3000221', 1, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(6, '2014_10_12_000000_create_users_table', 1),
(7, '2014_10_12_100000_create_password_resets_table', 1),
(8, '2019_08_19_000000_create_failed_jobs_table', 1),
(9, '2020_09_15_103734_create_contacts_table', 1),
(10, '2020_09_19_055839_create_ware_house_details_table', 1),
(11, '2020_09_21_092601_create_vendors_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `setting_copy`
--

CREATE TABLE `setting_copy` (
  `id` int(20) NOT NULL,
  `head` varchar(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `foreign_name` varchar(50) NOT NULL,
  `ware` int(11) NOT NULL,
  `by` int(11) NOT NULL,
  `note` varchar(100) NOT NULL,
  `accounts_id` bigint(20) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '1' COMMENT '1=active,2=inactive',
  `trash` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `setting_copy`
--

INSERT INTO `setting_copy` (`id`, `head`, `type`, `name`, `foreign_name`, `ware`, `by`, `note`, `accounts_id`, `status`, `trash`) VALUES
(1, '0', '1', 'Assets', '', 0, 0, '1', 1000, 1, 0),
(2, '0', '1', 'Liablities', '', 0, 0, '2', 2000, 1, 0),
(3, '0', '1', 'Expense', '', 0, 0, '3', 3000, 1, 0),
(4, '0', '1', 'Revenue', '', 0, 0, '4', 4000, 1, 0),
(10, '1', '2', 'Non-Current Assets', '', 0, 1, '0', 100003, 1, 0),
(11, '1', '2', 'Current Assets', '', 0, 1, '0', 100004, 1, 0),
(12, '13', '2', 'Bank Balances', '', 0, 0, '', 1000040604, 1, 0),
(13, '11', '2', 'Cash & Bank Balance', '', 0, 0, '', 10000406, 1, 0),
(15, '3', '2', 'Administrative Expenses', '', 0, 0, '', 300011, 1, 0),
(17, '4', '2', 'Service', '', 0, 0, '0', 400006, 1, 0),
(18, '3', '2', 'Selling & Marketing Expenses', '', 0, 0, '', 300012, 1, 0),
(76, '11', '2', 'Customers', '', 0, 0, '', 10000407, 1, 0),
(77, '92', '2', 'Supplier', '', 0, 0, '', 20000407, 1, 0),
(78, '10', '2', 'Plants,Properity & Equipment', '', 0, 0, '', 10000303, 1, 0),
(83, '11', '1', 'Stock & Stores', '', 0, 17, '', 10000411, 1, 0),
(85, '-1', '2', 'Purchase', '', 0, 0, '', 0, 1, 0),
(86, '172', '2', 'DISCOUNT', '', 0, 0, '', 40000802, 1, 0),
(87, '4', '2', 'SALE', '', 0, 0, '', 400007, 1, 0),
(92, '2', '2', 'Current Liabilities', '', 0, 0, '', 200004, 1, 0),
(93, '2', '2', 'Non-current Liability', '', 0, 0, '', 200005, 1, 0),
(96, '94', '2', 'Share Capital	', '', 0, 0, '', 20000604, 1, 0),
(99, '3', '2', 'Factory Expense', '', 0, 0, '', 300013, 1, 0),
(102, '15', '2', 'Salary & Allowances', '', 0, 0, '', 30001105, 1, 0),
(103, '15', '2', 'Festival Bonus', '', 0, 0, '', 30001106, 1, 0),
(104, '15', '2', 'Stationery Expenses', '', 0, 0, '', 30001107, 1, 0),
(105, '3', '2', 'Financial Expenses', '', 0, 0, '', 300014, 1, 0),
(108, '3', '2', 'Other Expense', '', 0, 0, '', 300015, 1, 0),
(109, '13', '2', 'cash', '', 0, 0, '', 1000040605, 1, 0),
(110, '15', '2', 'Depriciation', '', 0, 0, '', 30001108, 1, 0),
(111, '11', '2', 'Advance Deposits Prepayment', '', 0, 0, '', 10000409, 1, 0),
(112, '10', '2', 'Capital work in progress', '', 0, 0, '', 10000304, 1, 0),
(114, '92', '2', 'Bank Loan Overdraft', '', 0, 0, '', 20000408, 1, 0),
(120, '108', '2', 'Income Tax Paid', '', 0, 0, '', 30001502, 1, 0),
(172, '4', '2', 'Non-Operating', '', 0, 0, '', 400008, 1, 0),
(218, '218', '2', 'rajib', '', 0, 1, '', 40000701, 2, 0),
(378, '92', '2', 'Provident Fund', '', 0, 5, '', 20000409, 1, 0),
(388, '3', '2', 'Petty Cash', '', 0, 17, '', 300016, 1, 0),
(389, '93', '2', 'Investment For Petty Cash', '', 0, 17, '', 20000502, 1, 0),
(390, '13', '2', 'Petty Cash', '', 0, 17, '', 1000040606, 1, 0),
(391, '92', '2', 'Income Tax', '', 0, 17, '', 20000410, 1, 0),
(394, '3', '2', 'Balance Refund', '', 0, 16, '', 300017, 1, 0),
(395, '3', '2', 'COS', '', 0, 1, '', 300018, 2, 0),
(396, '4', '2', 'Revenue', '', 0, 17, '', 400009, 1, 0),
(397, '92', '2', 'Refund', '', 0, 16, '', 20000411, 1, 0),
(398, '396', '2', 'Room Revenue', '', 0, 16, '', 40000903, 1, 0),
(399, '396', '2', 'Room Charge', '', 0, 16, '', 40000904, 1, 0),
(401, '94', '2', 'Capital Fund', '', 0, 17, '', 20000605, 1, 0),
(402, '111', '2', 'Advance for Purchase', '', 0, 17, '', 1000040904, 1, 0),
(403, '4', '2', 'Revenue From Contract', '', 0, 17, '', 400010, 1, 0),
(405, '92', '2', 'Liabilities For Contract', '', 0, 17, '', 20000412, 1, 0),
(406, '3', '2', 'Contract', '', 0, 17, '', 300019, 1, 0),
(408, '11', '2', 'Revenue From Others', '', 0, 17, '', 10000410, 1, 0),
(410, '94', '2', 'Sundry Fund', '', 0, 1, '', 20000606, 1, 0),
(411, '-1', '1', 'Accounts', '', 0, 0, '', 1000, 1, 0),
(414, '111', '2', 'Advance For Employee', '', 0, 1, '', 1000040905, 1, 0),
(415, '3', '2', 'Salary Accounts', '', 0, 1, '', 300020, 1, 0),
(416, '111', '2', 'Loans Accounts', '', 0, 1, '', 1000040906, 1, 0),
(423, '15', '2', 'Commision-3', '', 0, 1, '', 30001109, 1, 0),
(424, '10', '2', 'Intangible Assets', '', 0, 1, '', 10000305, 1, 0),
(429, '77', '2', 'Vendor Payable', '', 0, 1, '', 2000040701, 1, 0),
(430, '78', '1', 'Machinery A/c Testing', '', 0, 1, '', 1000030301, 1, 0),
(444, '10', '2', 'Computer & Accessories', '', 0, 1, '', 10000306, 1, 0),
(445, '76', '2', 'Accounts Customer', '', 0, 1, '', 1000040701, 1, 0),
(446, '102', '2', 'Salary Sub head', '', 0, 1, '', 3000110501, 1, 0),
(465, '396', '2', 'Additional Revenue', '', 0, 1, '', 40000905, 1, 0),
(467, '11', '2', 'Inventories', '', 0, 1, '0', 10000412, 1, 0),
(495, '3', '1', 'Tol  EXP', '', 0, 142, '3', 300021, 1, 0),
(496, '3', '1', 'Fuel Exp', '', 0, 142, '3', 300022, 1, 0),
(497, '496', '1', 'Fuel Exp: 720 No Car', '', 0, 142, '3', 30002201, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `status`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'sudipto kumar shil', 'sudiptoshil@outlook.com', NULL, '$2y$10$Rb7e8G/D/xJN6wWHO5FHzOwcovLzaE/LCK/yaiO8t7ApaMQBQD5ji', 1, NULL, '2020-09-19 02:21:24', '2020-09-19 02:21:24');

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accounts_no` int(10) UNSIGNED NOT NULL,
  `status` tinyint(4) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vendors`
--

INSERT INTO `vendors` (`id`, `name`, `email`, `password`, `accounts_no`, `status`, `created_at`, `updated_at`) VALUES
(1, 'sudipto', 'sudiptoshil@outlook.com', '$2y$10$tQYUPGgEgY2nY1wtSFUuTebJ/Fa/g1gmU/429bqI7SRWDJJCK2/fi', 1234455, 1, '2020-09-21 04:40:38', '2020-09-21 04:40:38');

-- --------------------------------------------------------

--
-- Table structure for table `ware_house_details`
--

CREATE TABLE `ware_house_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `foreign_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `wh_keeper` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telephone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sequence` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `province_no` int(10) UNSIGNED NOT NULL,
  `resign_code` int(10) UNSIGNED NOT NULL,
  `wh_transfer_interface_account` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_activity` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `default_cc_code` int(10) UNSIGNED NOT NULL,
  `account_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `branch` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pricing_level` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `global_location_no` int(10) UNSIGNED NOT NULL,
  `longitude` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `foreign_address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ware_house_details`
--

INSERT INTO `ware_house_details` (`id`, `name`, `foreign_name`, `wh_keeper`, `location`, `telephone`, `sequence`, `province_no`, `resign_code`, `wh_transfer_interface_account`, `item_activity`, `default_cc_code`, `account_name`, `branch`, `pricing_level`, `global_location_no`, `longitude`, `latitude`, `address`, `foreign_address`, `created_at`, `updated_at`) VALUES
(1, 'sudipto kumar shil', 'world', 'ok', 'ctg', '010393', '123', 2344, 1233, '2234', 'defa', 234, 'ali', 'ctg', '123', 123, '22', 'dd', 'dee', 'ee', '2020-09-19 02:22:19', '2020-09-19 02:22:19'),
(2, 'Coursegolang', 'courses', 'ok', 'ctg', '010393', '123', 2344, 1233, '2234', 'defa', 234, 'eee', 'ctg', '5676', 2354, '22', 'ssl http', 'dee', 'ee', '2020-09-21 00:08:24', '2020-09-21 02:32:11'),
(3, 'go lang', 'php', 'ok', 'ctg', '010393', '123', 2344, 1233, '2234', 'defa', 234, 'ali', 'ctg', '123', 2354, '22', '22', 'dee', 'ee', '2020-09-21 00:19:06', '2020-09-21 00:19:06'),
(4, 'python programming', 'python oop', 'ok', 'ctg', '010393', '123', 2344, 1233, '2234', 'defa', 234, 'ali', 'ctg', '123', 1234, '22', 'dd', 'dee', 'ee', '2020-09-21 00:23:10', '2020-09-21 00:23:10'),
(5, 'rust programming', 'rust programming language', 'ok', 'ctg', '010393', '123', 2344, 1233, '2234', 'defa', 234, 'ali', 'ctg', '123', 1234, '22', 'dd', 'dee', 'ee', '2020-09-21 00:24:02', '2020-09-21 00:24:02'),
(6, 'dono .js', 'dono .js', 'dono .js', 'ctg', '010393', '123', 2344, 1233, '2234', 'defa', 234, 'eee', 'ctg', '123', 2354, '22', 'dd', 'ctg', 'uk', '2020-09-21 01:57:27', '2020-09-21 01:57:27'),
(7, 'Course.php2344', 'courses152', 'ok', 'ctg', '010393', '123', 2344, 1233, '2234', 'defa', 234, 'eee', 'ctg', '5676', 2354, '22', 'dd slsl', 'dee', 'ee', '2020-09-21 02:21:31', '2020-09-21 02:21:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ledger_copy`
--
ALTER TABLE `ledger_copy`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `setting_copy`
--
ALTER TABLE `setting_copy`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ware_house_details`
--
ALTER TABLE `ware_house_details`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ledger_copy`
--
ALTER TABLE `ledger_copy`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1230;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `setting_copy`
--
ALTER TABLE `setting_copy`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=498;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ware_house_details`
--
ALTER TABLE `ware_house_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
