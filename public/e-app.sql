-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2020 at 02:08 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts_inputs`
--

CREATE TABLE `accounts_inputs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `input_type` tinyint(4) NOT NULL COMMENT 'Posting Type =1 Doc Type=2',
  `module_list` int(11) NOT NULL,
  `status` tinyint(4) DEFAULT 1 COMMENT 'active=1 inactive=2',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `accounts_inputs`
--

INSERT INTO `accounts_inputs` (`id`, `name`, `input_type`, `module_list`, `status`, `created_at`, `updated_at`) VALUES
(1, 'sample1', 2, 0, 1, '2020-11-08 00:50:58', '2020-11-08 01:16:30'),
(2, 'sample2', 1, 0, 1, NULL, NULL),
(3, 'sample3', 1, 0, 1, '2020-11-15 03:27:36', '2020-11-15 03:27:36');

-- --------------------------------------------------------

--
-- Table structure for table `bank_details`
--

CREATE TABLE `bank_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `bank_no` int(11) NOT NULL,
  `bank_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_number` int(11) NOT NULL,
  `branch` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'active=1 inactive=2',
  `trash` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'delete=2',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bank_details`
--

INSERT INTO `bank_details` (`id`, `bank_no`, `bank_name`, `account_number`, `branch`, `address`, `account_id`, `status`, `trash`, `created_at`, `updated_at`) VALUES
(1, 23456, 'Ucb', 1234, 'gec', 'ctg', 3000, 1, 0, '2020-11-15 03:25:33', '2020-11-15 03:25:49');

-- --------------------------------------------------------

--
-- Table structure for table `cash_account_details`
--

CREATE TABLE `cash_account_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cash_no` int(11) NOT NULL,
  `cash_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_no` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'active=1 inactive=2',
  `trash` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'delete=2',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cash_account_details`
--

INSERT INTO `cash_account_details` (`id`, `cash_no`, `cash_name`, `remarks`, `account_no`, `status`, `trash`, `created_at`, `updated_at`) VALUES
(1, 2002, 'bkash', 'good day', 2000, 1, 1, '2020-11-15 03:28:28', '2020-11-15 03:28:53');

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

-- --------------------------------------------------------

--
-- Table structure for table `cost_centers`
--

CREATE TABLE `cost_centers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` int(11) NOT NULL,
  `ware_id` int(10) UNSIGNED NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'active=1 inactive=2',
  `trash` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'delete=2 ',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cost_centers`
--

INSERT INTO `cost_centers` (`id`, `name`, `code`, `ware_id`, `status`, `trash`, `created_at`, `updated_at`) VALUES
(1, 'cost2', 200, 1, 1, 1, '2020-11-15 03:30:45', '2020-11-15 03:30:45'),
(2, 'tttt', 201, 1, 1, 1, '2020-12-06 01:20:37', '2020-12-06 01:20:37');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accounts_no` int(10) UNSIGNED NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `type` tinyint(4) NOT NULL DEFAULT 0,
  `ware_id` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_categories`
--

CREATE TABLE `inventory_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `root_id` int(11) UNSIGNED DEFAULT NULL,
  `category_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `short_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `home_page` int(11) DEFAULT 0,
  `ware_id` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `status` int(11) DEFAULT 1 COMMENT 'active = 1 and inactive = 2',
  `category_image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inventory_categories`
--

INSERT INTO `inventory_categories` (`id`, `root_id`, `category_name`, `category_code`, `short_name`, `home_page`, `ware_id`, `status`, `category_image`, `created_at`, `updated_at`) VALUES
(1, 0, 'php', '1234', NULL, 0, 0, 1, NULL, NULL, NULL),
(2, 1, 'laravel', '500', NULL, 0, 0, 1, NULL, '2020-11-15 02:42:57', '2020-11-15 02:42:57');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_products`
--

CREATE TABLE `inventory_products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_code` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pices_of_carton` int(11) DEFAULT 0,
  `category_id` int(10) UNSIGNED DEFAULT NULL,
  `warehouse_id` int(10) UNSIGNED DEFAULT NULL,
  `sorting` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `reorder_level` int(11) DEFAULT NULL,
  `category_autocode` int(11) DEFAULT NULL,
  `unit_id` int(255) UNSIGNED DEFAULT NULL,
  `opening_stock` int(10) UNSIGNED DEFAULT NULL,
  `buy_price` double(8,2) DEFAULT 0.00,
  `cost` double(8,2) DEFAULT 0.00,
  `selling_price` double(8,2) NOT NULL DEFAULT 0.00,
  `price_type` tinyint(4) DEFAULT 0 COMMENT ' Customize Price = 1 Fixed Price =2',
  `product_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'active=1 inactive=2',
  `trash` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'delete=2',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inventory_products`
--

INSERT INTO `inventory_products` (`id`, `product_code`, `product_name`, `pices_of_carton`, `category_id`, `warehouse_id`, `sorting`, `reorder_level`, `category_autocode`, `unit_id`, `opening_stock`, `buy_price`, `cost`, `selling_price`, `price_type`, `product_image`, `status`, `trash`, `created_at`, `updated_at`) VALUES
(1, '12345', 'vue.js', 2, 2, 1, '2', 2, 500, 1, 2, 200.00, 100.00, 400.00, 1, NULL, 1, 1, '2020-11-15 02:48:58', '2020-11-15 02:48:58'),
(2, '1234', 'react', 2, 2, 1, '23', 2, 501, 1, 2, 200.00, 300.00, 500.00, 2, NULL, 1, 1, '2020-11-16 23:26:36', '2020-11-16 23:26:36'),
(3, '777', 'python', 2, 2, 1, '2', 2, 501, 1, 2, 2000.00, 2000.00, 3000.00, 1, NULL, 1, 1, '2020-11-19 00:36:37', '2020-11-19 00:36:37'),
(4, NULL, 'acer asiore 4567', NULL, 2, 0, NULL, NULL, 501, 0, NULL, 0.00, 0.00, 0.00, 0, NULL, 1, 1, '2020-12-01 01:49:41', '2020-12-01 01:49:41'),
(5, NULL, 'hp', NULL, 2, 0, NULL, NULL, 501, 0, NULL, 0.00, 0.00, 0.00, 0, NULL, 1, 1, '2020-12-01 03:02:52', '2020-12-01 03:02:52'),
(6, '5678', 'redmi 6', 2, 2, 1, '2', 2, 502, 1, 2, 2000.00, 2000.00, 3000.00, 1, NULL, 1, 1, '2020-12-05 04:33:41', '2020-12-05 04:33:41'),
(7, '5000', 'microsoft lumia', 2, 2, 1, '2', 2, 503, 1, 2, 2000.00, 2000.00, 3000.00, 1, NULL, 1, 1, '2020-12-05 04:34:07', '2020-12-05 04:34:07'),
(8, '3000', 'walton primo', 2, 2, 1, '2', 2, 504, 1, 2, 2000.00, 2000.00, 3000.00, 1, NULL, 1, 1, '2020-12-05 04:34:27', '2020-12-05 04:34:27'),
(9, '6000', 'macbook pro', 4, 1, 2, '2', 2, 1234, 1, 2, 2000.00, 5000.00, 10000.00, 1, NULL, 1, 1, '2020-12-05 04:35:43', '2020-12-05 04:35:43'),
(10, '8000', 'samsung s5', 4, 1, 2, '2', 2, 1235, 1, 2, 2000.00, 5000.00, 10000.00, 1, NULL, 1, 1, '2020-12-05 04:36:05', '2020-12-05 04:36:05'),
(11, '8000', 'microsoft lumia 532', 4, 1, 2, '2', 2, 1236, 1, 2, 2000.00, 5000.00, 10000.00, 1, NULL, 1, 1, '2020-12-05 04:36:22', '2020-12-05 04:36:22'),
(12, '2300', 'window', 2, 2, 1, '2', 2, 505, 1, 2, 2000.00, 2000.00, 3000.00, 1, '1607230328.png', 1, 1, '2020-12-05 05:21:49', '2020-12-05 22:52:08'),
(13, '5600', 'microsoft lumia 550', 4, 1, 1, '2', 2, 1237, 1, 2, 2000.00, 2000.00, 10000.00, 2, '1607171578.png', 1, 1, '2020-12-05 05:54:10', '2020-12-05 06:33:40'),
(14, '6000', 'react16.2', 2, 1, 2, '2', 2, 1238, 1, 2, 2000.00, 2000.00, 3000.00, 1, '1607171500.png', 1, 1, '2020-12-05 06:29:29', '2020-12-05 06:31:40'),
(15, '2008', 'windows-10', NULL, 2, 0, NULL, NULL, 506, 1, 2, 0.00, NULL, 0.00, 2, '1607230012.png', 1, 1, '2020-12-05 22:46:53', '2020-12-05 23:36:26');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_account_details`
--

CREATE TABLE `invoice_account_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `ware_id` int(11) NOT NULL,
  `invoice_type` int(11) NOT NULL COMMENT 'bank =2 cash=1 ',
  `bank_id` int(11) NOT NULL DEFAULT 0,
  `cash_id` int(11) NOT NULL DEFAULT 0,
  `voucher_no` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `gross_amount` int(11) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `cost_center_id` int(11) NOT NULL,
  `posting_type_id` int(11) NOT NULL,
  `doctype_id` int(11) NOT NULL,
  `ref_no` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `doc_no` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `trash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1' COMMENT 'delete=2',
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1' COMMENT 'active=1,inactive=2',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoice_account_details`
--

INSERT INTO `invoice_account_details` (`id`, `ware_id`, `invoice_type`, `bank_id`, `cash_id`, `voucher_no`, `date`, `gross_amount`, `description`, `cost_center_id`, `posting_type_id`, `doctype_id`, `ref_no`, `doc_no`, `trash`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 0, 2000, '0', '2020-12-07', 15000, 'hello world', 1, 2, 1, '3000', '4000', '1', '2', '2020-12-07 00:17:35', '2020-12-07 05:10:23'),
(2, 1, 2, 0, 2000, '0', '2020-12-07', 1000, 'ffffff', 1, 2, 1, '4000', '4000', '1', '2', '2020-12-07 06:22:35', '2020-12-07 06:22:35'),
(3, 1, 2, 0, 2000, '0', '2020-12-08', 13000, 'done', 1, 2, 1, '4000', '7000', '1', '2', '2020-12-08 02:20:25', '2020-12-08 02:20:25'),
(4, 1, 2, 0, 2000, '0', '2020-12-08', 1000, 'done', 1, 2, 1, '2000', '4000', '1', '2', '2020-12-08 03:29:53', '2020-12-08 03:29:53'),
(5, 2, 1, 3000, 2000, '0', '2020-12-08', 1000, 'eeee', 2, 2, 1, '0', 'qww', '1', '1', '2020-12-08 04:30:09', '2020-12-08 05:07:15');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_account_transec_details`
--

CREATE TABLE `invoice_account_transec_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `debit_id` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `credit_id` int(10) UNSIGNED NOT NULL,
  `group_account_code` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice_acc_details_id` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `ware_id` int(10) UNSIGNED NOT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cost_center_id` int(11) NOT NULL,
  `cheque_number` int(11) NOT NULL,
  `cheque_date` date NOT NULL,
  `trash` int(11) NOT NULL DEFAULT 1 COMMENT 'delete=2',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'active=1,inactive=2',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoice_account_transec_details`
--

INSERT INTO `invoice_account_transec_details` (`id`, `debit_id`, `credit_id`, `group_account_code`, `invoice_acc_details_id`, `date`, `ware_id`, `remarks`, `amount`, `cost_center_id`, `cheque_number`, `cheque_date`, `trash`, `status`, `created_at`, `updated_at`) VALUES
(14, '751', 2000, '3', 1, '2020-12-07', 1, 'done', '5000', 1, 0, '0000-00-00', 1, 1, '2020-12-07 05:21:37', '2020-12-07 05:21:37'),
(15, '751', 2000, '2', 2, '2020-12-07', 1, 'done', '300', 1, 0, '0000-00-00', 1, 1, '2020-12-07 06:22:35', '2020-12-07 06:22:35'),
(16, '751', 2000, '15', 2, '2020-12-07', 1, 'ok', '700', 1, 0, '0000-00-00', 1, 1, '2020-12-07 06:22:35', '2020-12-07 06:22:35'),
(17, '751', 2000, '10', 3, '2020-12-08', 1, 'done', '6000', 1, 0, '0000-00-00', 1, 1, '2020-12-08 02:20:25', '2020-12-08 02:20:25'),
(18, '751', 2000, '111', 3, '2020-12-08', 1, 'done', '7000', 1, 0, '0000-00-00', 1, 1, '2020-12-08 02:20:25', '2020-12-08 02:20:25'),
(21, '751', 2000, '4', 4, '2020-12-08', 1, 'ok', '500', 1, 0, '0000-00-00', 1, 1, '2020-12-08 03:31:50', '2020-12-08 03:31:50'),
(22, '751', 2000, '11', 4, '2020-12-08', 1, 'done', '500', 1, 0, '0000-00-00', 1, 1, '2020-12-08 03:31:50', '2020-12-08 03:31:50'),
(27, '751', 3000, '1', 5, '2020-12-08', 2, 'eee', '500', 2, 5000, '2020-12-09', 1, 1, '2020-12-08 05:07:15', '2020-12-08 05:07:15'),
(28, '751', 3000, '3', 5, '2020-12-08', 2, 'ttttttttttttt', '500', 2, 5000, '2020-12-09', 1, 1, '2020-12-08 05:07:15', '2020-12-08 05:07:15');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_parameters`
--

CREATE TABLE `invoice_parameters` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` tinyint(4) NOT NULL COMMENT 'new purshase =1 ,purshase return = 2, sale return =4 sale = 3\r\nquick Purshase =5\r\nissue = 6\r\nissue return =7\r\npayment Voucher =8',
  `discount_method` tinyint(4) NOT NULL COMMENT 'invoice wise = 1 product wise = 2',
  `invoice_start_no` int(11) NOT NULL,
  `voucher_seq` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_due_allow` tinyint(4) NOT NULL COMMENT 'id due allow = 2 or not allow = 3',
  `ware_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL COMMENT 'active = 1 inactive = 2',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoice_parameters`
--

INSERT INTO `invoice_parameters` (`id`, `type`, `discount_method`, `invoice_start_no`, `voucher_seq`, `is_due_allow`, `ware_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 1000, '0', 2, 1, 1, NULL, '2020-11-15 00:37:56'),
(2, 2, 1, 2000, '0', 2, 1, 1, NULL, NULL),
(3, 3, 2, 3000, '0', 2, 1, 1, NULL, NULL),
(4, 4, 2, 4000, '0', 2, 1, 1, NULL, NULL),
(5, 5, 1, 5000, '0', 0, 0, 1, NULL, NULL),
(6, 6, 2, 6000, '0', 0, 0, 1, NULL, NULL),
(7, 7, 1, 7000, '0', 0, 1, 1, NULL, '2020-11-19 01:21:31'),
(8, 0, 0, 0, '8000', 2, 1, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `invoice_trasections`
--

CREATE TABLE `invoice_trasections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_id` int(10) UNSIGNED NOT NULL,
  `d_id` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `c_id` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `item_id` int(10) UNSIGNED NOT NULL,
  `size_id` int(11) NOT NULL,
  `party_id` int(10) UNSIGNED NOT NULL COMMENT 'vendor id or customer id',
  `date` date NOT NULL,
  `ware_id` int(10) UNSIGNED NOT NULL,
  `salesman_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `store_id` int(10) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `discount_taka` double(8,2) DEFAULT 0.00,
  `discount_percent` double(8,2) DEFAULT 0.00,
  `vat` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `publishing_by` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` int(11) NOT NULL COMMENT 'NEW PURSHASE = 1 , PURSHASE RETURN = 2, SALE =3 ,SALE RETURN = 4\r\nissue =6\r\nissue Return =7',
  `trash` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'delete = 2',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoice_trasections`
--

INSERT INTO `invoice_trasections` (`id`, `invoice_id`, `d_id`, `c_id`, `item_id`, `size_id`, `party_id`, `date`, `ware_id`, `salesman_id`, `status`, `store_id`, `quantity`, `price`, `discount_taka`, `discount_percent`, `vat`, `publishing_by`, `type`, `trash`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 0, 1, 0, 3, '2020-11-30', 1, 0, 1, 1, 300, 300, 0.00, 0.00, 0, '1', 1, 1, '2020-11-30 06:34:56', '2020-11-30 06:34:56'),
(2, 1, 2, 0, 2, 0, 3, '2020-11-30', 1, 0, 1, 1, 300, 300, 0.00, 0.00, 0, '1', 1, 1, '2020-11-30 06:35:12', '2020-11-30 06:35:12'),
(3, 1, 3, 0, 3, 0, 3, '2020-11-30', 1, 0, 1, 1, 400, 300, 0.00, 0.00, 0, '1', 1, 1, '2020-11-30 06:35:24', '2020-11-30 06:35:24'),
(4, 2, 0, 1, 1, 0, 0, '2020-11-30', 1, 0, 1, 1, 2, 400, 0.00, 0.00, 0, '1', 6, 1, '2020-11-30 06:35:43', '2020-11-30 06:35:43'),
(5, 2, 0, 2, 2, 0, 0, '2020-11-30', 1, 0, 1, 1, 3, 500, 0.00, 0.00, 0, '1', 6, 1, '2020-11-30 06:35:52', '2020-11-30 06:35:52'),
(6, 3, 0, 1, 1, 0, 3, '2020-11-30', 1, 0, 1, 1, 1, 0, 0.00, 0.00, 0, '1', 7, 1, '2020-11-30 06:38:14', '2020-11-30 06:38:14'),
(7, 3, 0, 2, 2, 0, 3, '2020-11-30', 1, 0, 1, 1, 3, 0, 0.00, 0.00, 0, '1', 7, 1, '2020-11-30 06:38:14', '2020-11-30 06:38:14'),
(8, 4, 0, 1, 1, 0, 4, '2020-12-01', 2, 0, 1, 2, 1, 400, 0.00, 0.00, 0, '1', 6, 1, '2020-11-30 23:11:19', '2020-11-30 23:11:19'),
(9, 4, 0, 2, 2, 0, 4, '2020-12-01', 2, 0, 1, 2, 1, 500, 0.00, 0.00, 0, '1', 6, 1, '2020-11-30 23:11:27', '2020-11-30 23:11:27'),
(10, 5, 0, 1, 1, 0, 4, '2020-12-01', 2, 0, 1, 2, 1, 0, 0.00, 0.00, 0, '1', 7, 1, '2020-11-30 23:12:05', '2020-11-30 23:12:05'),
(11, 5, 0, 2, 2, 0, 4, '2020-12-01', 2, 0, 1, 2, 1, 0, 0.00, 0.00, 0, '1', 7, 1, '2020-11-30 23:12:05', '2020-11-30 23:12:05'),
(12, 6, 2, 0, 2, 0, 1, '2020-12-01', 1, 0, 1, 1, 1, 500, 0.00, 0.00, 0, '1', 1, 2, '2020-12-01 02:23:35', '2020-12-03 04:07:54'),
(13, 6, 2, 0, 2, 0, 1, '2020-12-01', 1, 0, 1, 1, 1, 500, 0.00, 0.00, 0, '1', 1, 2, '2020-12-01 02:23:50', '2020-12-03 04:07:25'),
(14, 6, 2, 0, 2, 0, 1, '2020-12-01', 1, 0, 1, 1, 1, 500, 0.00, 0.00, 0, '1', 1, 2, '2020-12-01 02:23:56', '2020-12-03 04:05:36'),
(15, 6, 0, 2, 2, 0, 1, '2020-12-01', 1, 0, 1, 1, 1, 500, 0.00, 0.00, 0, '1', 4, 1, '2020-12-01 04:52:33', '2020-12-01 04:52:33'),
(16, 6, 0, 2, 2, 0, 1, '2020-12-01', 2, 0, 1, 2, 1, 500, 0.00, 0.00, 0, '1', 3, 1, '2020-12-01 04:53:05', '2020-12-01 04:53:05'),
(17, 6, 3, 0, 3, 0, 7, '2020-12-01', 1, 0, 1, 1, 4, 3000, 0.00, 0.00, 0, '1', 2, 1, '2020-12-01 07:02:54', '2020-12-08 04:45:46'),
(18, 6, 0, 2, 2, 0, 0, '2020-12-02', 1, 0, 1, 1, 1, 500, 0.00, 0.00, 0, '1', 7, 1, '2020-12-02 00:34:36', '2020-12-02 00:34:36'),
(19, 6, 2, 0, 2, 0, 1, '2020-12-02', 1, 0, 1, 1, 1, 500, 0.00, 0.00, 0, '1', 1, 2, '2020-12-02 00:35:51', '2020-12-03 01:42:25'),
(20, 0, 2, 0, 2, 0, 3, '2020-12-03', 1, 0, 1, 1, 3, 500, 0.00, 0.00, 0, '2', 1, 1, '2020-12-03 03:57:24', '2020-12-03 04:26:51'),
(21, 0, 1, 0, 1, 0, 3, '2020-12-03', 1, 0, 1, 1, 1, 400, 0.00, 0.00, 0, '2', 1, 1, '2020-12-03 04:04:57', '2020-12-03 04:04:57'),
(22, 6, 4, 0, 4, 0, 10, '2020-12-03', 1, 0, 1, 1, 1, 300, 0.00, 0.00, 0, '1', 1, 2, '2020-12-03 04:10:06', '2020-12-03 04:10:24'),
(23, 6, 3, 0, 3, 0, 10, '2020-12-03', 2, 0, 1, 1, 1, 3000, 0.00, 0.00, 0, '1', 1, 2, '2020-12-03 04:10:16', '2020-12-03 04:10:37'),
(24, 6, 5, 0, 5, 0, 10, '2020-12-03', 1, 0, 1, 1, 400, 0, 0.00, 0.00, 0, '1', 1, 2, '2020-12-03 04:10:33', '2020-12-05 00:58:50'),
(25, 0, 2, 0, 2, 0, 9, '2020-12-03', 1, 0, 1, 1, 1, 500, 0.00, 0.00, 0, '2', 2, 1, '2020-12-03 04:51:55', '2020-12-03 04:51:55'),
(26, 0, 3, 0, 3, 0, 9, '2020-12-03', 1, 0, 1, 1, 1, 3000, 0.00, 0.00, 0, '2', 2, 1, '2020-12-03 04:52:15', '2020-12-03 04:52:15'),
(27, 0, 0, 3, 3, 0, 1, '2020-12-03', 1, 0, 1, 1, 1, 3000, 0.00, 0.00, 0, '2', 4, 1, '2020-12-03 05:13:43', '2020-12-03 05:13:43'),
(28, 6, 1, 0, 1, 0, 1, '2020-12-05', 1, 0, 1, 1, 1, 400, 0.00, 0.00, 0, '1', 1, 1, '2020-12-05 00:58:43', '2020-12-05 00:58:43'),
(29, 6, 0, 15, 15, 0, 0, '2020-12-06', 1, 0, 1, 1, 1, 0, 0.00, 0.00, 0, '1', 7, 1, '2020-12-05 23:37:37', '2020-12-05 23:37:37'),
(30, 6, 4, 0, 4, 0, 1, '2020-12-06', 1, 0, 1, 1, 1, 300, 0.00, 0.00, 0, '1', 1, 1, '2020-12-06 02:17:09', '2020-12-06 02:17:09'),
(31, 6, 2, 0, 2, 0, 1, '2020-12-06', 1, 0, 1, 1, 1, 500, 0.00, 0.00, 0, '1', 2, 1, '2020-12-06 04:28:46', '2020-12-06 04:28:46'),
(32, 6, 3, 0, 3, 0, 1, '2020-12-06', 1, 0, 1, 1, 97, 3000, 0.00, 0.00, 0, '1', 1, 1, '2020-12-06 04:38:14', '2020-12-06 04:38:14'),
(33, 6, 3, 0, 3, 0, 1, '2020-12-06', 1, 0, 1, 1, 400, 3000, 0.00, 0.00, 0, '1', 2, 1, '2020-12-06 04:38:42', '2020-12-06 04:38:42'),
(34, 7, 0, 2, 2, 0, 6, '2020-12-06', 2, 0, 1, 2, 3, 500, 0.00, 0.00, 0, '1', 7, 1, '2020-12-06 05:05:52', '2020-12-08 01:38:20'),
(35, 8, 0, 2, 2, 0, 1, '2020-12-07', 1, 0, 1, 1, 1, 500, 0.00, 0.00, 0, '1', 3, 1, '2020-12-07 04:57:27', '2020-12-07 04:57:27'),
(36, 8, 0, 2, 2, 0, 0, '2020-12-08', 1, 0, 1, 1, 1, 500, 0.00, 0.00, 0, '1', 7, 1, '2020-12-08 01:00:51', '2020-12-08 01:00:59'),
(37, 8, 0, 1, 1, 0, 0, '2020-12-08', 1, 0, 1, 1, 1, 400, 0.00, 0.00, 0, '1', 7, 1, '2020-12-08 01:01:14', '2020-12-08 01:01:14'),
(38, 8, 0, 2, 2, 0, 0, '2020-12-08', 1, 0, 1, 1, 3, 500, 0.00, 0.00, 0, '1', 6, 1, '2020-12-08 01:33:40', '2020-12-08 01:34:10'),
(39, 0, 3, 0, 3, 0, 1, '2020-12-08', 1, 0, 1, 1, 10, 3000, 0.00, 0.00, 0, '1', 1, 1, '2020-12-08 01:53:37', '2020-12-08 02:07:04'),
(40, 0, 0, 2, 2, 0, 0, '2020-12-08', 1, 0, 1, 1, 1, 500, 0.00, 0.00, 0, '1', 7, 2, '2020-12-08 01:55:20', '2020-12-08 04:42:19'),
(41, 0, 2, 0, 2, 0, 1, '2020-12-08', 1, 0, 1, 1, 8, 500, 0.00, 0.00, 0, '1', 2, 1, '2020-12-08 02:03:22', '2020-12-08 02:04:26'),
(42, 0, 4, 0, 4, 0, 1, '2020-12-08', 1, 0, 1, 1, 1, 300, 0.00, 0.00, 0, '1', 1, 2, '2020-12-08 02:16:56', '2020-12-08 02:29:40'),
(43, 0, 3, 0, 3, 0, 1, '2020-12-08', 1, 0, 1, 1, 1, 3000, 0.00, 0.00, 0, '1', 1, 2, '2020-12-08 02:29:32', '2020-12-08 02:29:37'),
(44, 0, 0, 3, 3, 0, 1, '2020-12-08', 1, 0, 1, 1, 1, 3000, 0.00, 0.00, 0, '1', 4, 1, '2020-12-08 02:51:32', '2020-12-08 02:51:32'),
(45, 0, 3, 0, 3, 0, 1, '2020-12-08', 1, 0, 1, 1, 1, 3000, 0.00, 0.00, 0, '1', 1, 1, '2020-12-08 02:56:55', '2020-12-08 02:56:55'),
(46, 0, 0, 2, 2, 0, 0, '2020-12-08', 1, 0, 1, 1, 1, 500, 0.00, 0.00, 0, '1', 6, 1, '2020-12-08 03:05:20', '2020-12-08 03:05:20'),
(47, 0, 0, 3, 3, 0, 2, '2020-12-08', 1, 0, 1, 1, 1, 3000, 0.00, 0.00, 0, '1', 6, 1, '2020-12-08 04:04:08', '2020-12-08 04:04:08'),
(48, 0, 0, 3, 3, 0, 1, '2020-12-08', 1, 0, 1, 1, 1, 3000, 0.00, 0.00, 0, '1', 3, 2, '2020-12-08 04:16:58', '2020-12-08 04:35:44'),
(49, 0, 0, 1, 1, 0, 1, '2020-12-08', 1, 0, 1, 1, 1, 400, 0.00, 0.00, 0, '1', 3, 2, '2020-12-08 04:35:38', '2020-12-08 04:35:42'),
(50, 0, 0, 3, 3, 0, 1, '2020-12-08', 2, 0, 1, 2, 1, 3000, 0.00, 0.00, 0, '1', 3, 1, '2020-12-08 04:37:29', '2020-12-08 04:37:29'),
(51, 0, 0, 2, 2, 0, 0, '2020-12-08', 1, 0, 1, 1, 1, 500, 0.00, 0.00, 0, '1', 7, 2, '2020-12-08 04:38:15', '2020-12-08 04:38:23'),
(52, 0, 0, 1, 1, 0, 0, '2020-12-08', 1, 0, 1, 1, 1, 400, 0.00, 0.00, 0, '1', 7, 2, '2020-12-08 04:38:16', '2020-12-08 04:43:06'),
(53, 0, 3, 0, 3, 0, 1, '2020-12-08', 1, 0, 1, 1, 1, 3000, 0.00, 0.00, 0, '1', 1, 2, '2020-12-08 05:16:06', '2020-12-08 05:16:12'),
(54, 0, 4, 0, 4, 0, 1, '2020-12-08', 1, 0, 1, 1, 6, 0, 0.00, 0.00, 0, '1', 1, 1, '2020-12-08 05:16:31', '2020-12-08 05:16:42');

-- --------------------------------------------------------

--
-- Table structure for table `ledgers`
--

CREATE TABLE `ledgers` (
  `id` int(20) NOT NULL,
  `parent_head_id` int(5) NOT NULL,
  `ledger_title` varchar(50) CHARACTER SET utf8 NOT NULL,
  `opening_balance` varchar(20) NOT NULL DEFAULT '0',
  `date` date DEFAULT NULL,
  `remarks` varchar(100) DEFAULT NULL,
  `by` varchar(20) DEFAULT NULL,
  `type` int(20) DEFAULT NULL,
  `ware` int(20) NOT NULL DEFAULT 0,
  `accounts_id` text DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '1=Active; 2 = Inactive',
  `foreign_name` varchar(255) NOT NULL,
  `trash` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ledgers`
--

INSERT INTO `ledgers` (`id`, `parent_head_id`, `ledger_title`, `opening_balance`, `date`, `remarks`, `by`, `type`, `ware`, `accounts_id`, `status`, `foreign_name`, `trash`) VALUES
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
-- Table structure for table `menu_submenu_settings`
--

CREATE TABLE `menu_submenu_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `root_id` int(11) NOT NULL DEFAULT 0,
  `ware_id` int(10) UNSIGNED NOT NULL,
  `sequence_id` int(11) NOT NULL,
  `link_id` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_id` int(10) UNSIGNED NOT NULL DEFAULT 10000,
  `type` int(11) NOT NULL DEFAULT 1 COMMENT 'menu=1,submenu=2,module=3',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'active=1 inactive=2',
  `trash` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'delete=2',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `menu_submenu_settings`
--

INSERT INTO `menu_submenu_settings` (`id`, `name`, `root_id`, `ware_id`, `sequence_id`, `link_id`, `sort_id`, `type`, `status`, `trash`, `created_at`, `updated_at`) VALUES
(1, 'Setup', 0, 0, 0, '', 10000, 1, 1, 1, NULL, NULL),
(2, 'Input', 0, 0, 0, '', 10000, 1, 1, 1, NULL, NULL),
(3, 'Transection', 0, 0, 0, '', 10000, 1, 1, 1, NULL, '2020-11-26 03:46:36'),
(4, 'Manage Invoice Params', 1, 0, 0, 'manage-invoiceparams', 10000, 2, 1, 1, NULL, NULL),
(5, ' Manage WareHouse', 2, 0, 0, 'manage-warehouse', 10000, 2, 1, 1, NULL, NULL),
(6, 'Manage All Vendor', 2, 0, 0, 'manage-vendor', 10000, 2, 1, 1, NULL, NULL),
(7, 'Manage All Customer', 2, 0, 0, 'manage-Customer', 10000, 2, 1, 1, NULL, NULL),
(8, 'Create Inventory Category', 2, 0, 0, 'create-invent-category', 10000, 2, 1, 1, NULL, NULL),
(9, 'Manage Inventory Product', 2, 0, 0, 'manage-product', 10000, 2, 1, 1, NULL, NULL),
(10, 'Manage Store', 2, 0, 0, 'manage-store', 10000, 2, 1, 1, NULL, NULL),
(11, 'Issue', 3, 0, 0, 'issue/6', 10000, 2, 1, 2, NULL, '2020-11-26 03:38:53'),
(12, 'Bank Details', 2, 0, 0, 'manage-bank-details', 10000, 2, 1, 1, NULL, NULL),
(13, 'Manage Store Invoice', 2, 0, 0, 'manage-store-invoice', 10000, 2, 1, 2, NULL, '2020-11-26 04:19:09'),
(14, ' Manage Unit', 2, 0, 0, 'manage-unit', 10000, 2, 1, 1, NULL, NULL),
(15, 'Manage Account Input', 2, 0, 0, 'manage-account-input', 10000, 2, 1, 1, NULL, NULL),
(16, 'New Purshase', 3, 0, 0, 'new-purshase/1', 10000, 2, 1, 1, NULL, '2020-11-26 04:00:28'),
(17, 'Purshase Return', 3, 0, 0, 'purshase-return/2', 10000, 2, 1, 1, NULL, NULL),
(20, 'Quick Purshase', 3, 0, 0, NULL, 10000, 2, 2, 1, NULL, '2020-11-30 00:50:23'),
(21, 'Manage Cash Account', 3, 0, 0, 'manage-cash-account', 10000, 2, 1, 1, NULL, NULL),
(22, 'Manage Cost Center', 3, 0, 0, 'manage-costcenter', 10000, 2, 1, 1, NULL, NULL),
(23, 'Payment Vaucher', 3, 0, 0, NULL, 10000, 2, 2, 1, NULL, '2020-11-29 06:08:19'),
(24, 'Report', 0, 0, 0, '', 10000, 1, 1, 1, NULL, NULL),
(25, 'Stock Report', 24, 0, 0, 'stock-report', 10000, 2, 1, 1, NULL, NULL),
(26, 'Product Report', 24, 0, 0, 'product-report', 10000, 2, 1, 1, NULL, NULL),
(27, 'Issue return', 3, 0, 0, 'issue-return/7', 10000, 2, 1, 1, NULL, NULL),
(28, 'SalesMan', 2, 0, 0, 'manage-salesman', 10000, 0, 1, 1, NULL, NULL),
(29, 'Manage Size', 2, 0, 0, 'manage-size', 10000, 0, 1, 1, NULL, NULL),
(30, 'Sale Return', 3, 0, 0, 'sale-return/4', 10000, 0, 1, 1, NULL, NULL),
(31, 'Sale', 3, 0, 0, 'sale/3', 10000, 0, 1, 1, NULL, NULL),
(32, 'Sales Report', 24, 0, 0, 'sales-report', 10000, 0, 1, 1, NULL, NULL),
(33, 'Manage Module', 2, 0, 0, 'manage-module', 10000, 0, 1, 1, NULL, NULL),
(37, 'test', 24, 0, 0, NULL, 10000, 2, 2, 2, '2020-11-26 02:04:39', '2020-11-30 00:22:25'),
(38, 'test3', 24, 0, 0, 'test2', 10000, 2, 2, 2, '2020-11-26 02:06:39', '2020-11-30 00:22:30'),
(40, 'Manage Setting', 1, 0, 0, NULL, 10000, 0, 2, 1, '2020-11-26 02:09:46', '2020-11-30 00:47:54'),
(41, 'testing', 5, 0, 0, 'testing', 10000, 2, 1, 2, '2020-11-26 03:17:33', '2020-11-26 04:03:12'),
(42, 'done', 0, 0, 0, NULL, 10000, 1, 1, 2, NULL, '2020-11-26 03:59:47'),
(43, 'Menu Submenu', 2, 0, 0, 'menu-submenu', 10000, 2, 1, 1, '2020-11-26 04:12:38', '2020-11-26 04:12:38'),
(44, 'testinglevel', 0, 0, 0, NULL, 10000, 1, 1, 2, '2020-11-26 04:34:40', '2020-11-29 02:39:30'),
(45, 'done', 0, 0, 0, NULL, 10000, 1, 1, 2, '2020-11-26 04:38:55', '2020-11-29 02:39:35'),
(52, 'okdone', 0, 0, 0, NULL, 10000, 1, 1, 2, '2020-11-26 05:48:31', '2020-11-29 02:39:25'),
(54, 'Module', 0, 0, 0, NULL, 10000, 3, 1, 1, '2020-11-26 05:50:32', '2020-11-26 05:50:32'),
(55, 'Accounts', 54, 0, 0, NULL, 10000, 3, 1, 1, '2020-11-26 05:52:58', '2020-11-26 05:52:58'),
(56, 'Accounts Receivable', 55, 0, 0, NULL, 10000, 3, 1, 1, '2020-11-26 05:53:17', '2020-11-26 05:53:17'),
(57, 'Accounts Payable', 55, 0, 0, NULL, 10000, 3, 1, 1, '2020-11-26 05:53:31', '2020-11-26 05:53:31'),
(58, 'Input', 56, 0, 0, NULL, 10000, 3, 1, 1, '2020-11-26 05:53:57', '2020-11-26 05:53:57'),
(59, 'Setup', 56, 0, 0, NULL, 10000, 3, 1, 1, '2020-11-26 05:54:08', '2020-11-26 05:54:08'),
(60, 'Transaction', 56, 0, 0, NULL, 10000, 3, 1, 1, '2020-11-26 05:54:20', '2020-11-26 05:54:20'),
(61, 'Manage Cash Account', 58, 0, 0, 'test', 10000, 2, 1, 1, '2020-11-26 05:54:32', '2020-11-26 05:54:32'),
(62, 'Report', 58, 0, 0, '5555', 10000, 2, 1, 1, '2020-11-26 05:55:21', '2020-11-26 05:55:21'),
(63, 'Manage Payment Voucher', 3, 0, 0, 'manage-paymentvoucher', 10000, 2, 1, 1, '2020-11-29 00:25:37', '2020-11-29 00:25:37');

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
(9, '2020_09_15_103734_create_contacts_table', 1),
(10, '2020_09_19_055839_create_ware_house_details_table', 1),
(15, '2014_10_12_000000_create_users_table', 2),
(16, '2014_10_12_100000_create_password_resets_table', 2),
(17, '2019_08_19_000000_create_failed_jobs_table', 2),
(18, '2020_09_21_092601_create_vendors_table', 2),
(19, '2020_09_23_062754_create_customers_table', 3),
(20, '2020_09_28_124703_create_inventory_products_table', 4),
(23, '2020_10_01_070848_create_stores_table', 5),
(25, '2020_10_01_111954_create_store_invoices_table', 6),
(26, '2020_10_03_123700_create_invoice_trasections_table', 7),
(27, '2020_10_05_100421_create_vats_table', 8),
(29, '2020_10_19_062613_create_bank_details_table', 9),
(30, '2020_10_19_075208_create_cash_account_details_table', 10),
(31, '2020_10_24_062207_create_invoice_parameters_table', 11),
(32, '2020_11_05_105500_create_units_table', 12),
(33, '2020_11_08_053910_create_module_lists_table', 13),
(34, '2020_11_08_054727_create_accounts_inputs_table', 14),
(35, '2020_11_08_055722_create_cost_centers_table', 15),
(36, '2020_11_12_092051_create_invoice_account_details_table', 16),
(37, '2020_11_12_092332_create_invoice_account_transec_details_table', 16),
(38, '2020_11_14_051059_create_menu_submenu_settings_table', 17),
(39, '2020_11_14_080736_create_role_settings_table', 18),
(40, '2020_11_14_081127_create_user_role_details_table', 18),
(41, '2020_11_22_092438_create_sales_men_table', 19),
(42, '2020_11_22_111551_create_sizes_table', 20),
(43, '2020_11_25_050604_create_modules_table', 21);

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

CREATE TABLE `modules` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'active =1 inactive =2',
  `trash` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'delete=2',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `modules`
--

INSERT INTO `modules` (`id`, `name`, `status`, `trash`, `created_at`, `updated_at`) VALUES
(1, 'inventory2', 1, 1, '2020-11-24 23:33:32', '2020-11-24 23:44:18'),
(2, 'pos2', 2, 1, '2020-11-24 23:45:05', '2020-11-24 23:45:15');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role_settings`
--

CREATE TABLE `role_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_type` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'active=1,inactive=2',
  `trash` tinyint(4) NOT NULL COMMENT 'delete=2',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sales_men`
--

CREATE TABLE `sales_men` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ware_id` int(10) UNSIGNED NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'active =1 and inactive = 2',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sales_men`
--

INSERT INTO `sales_men` (`id`, `name`, `ware_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'minhaj23', 1, 1, '2020-11-22 04:26:23', '2020-11-22 05:07:04'),
(2, 'ok2', 0, 1, '2020-11-22 04:34:51', '2020-11-22 05:11:36'),
(3, 'hello', 1, 1, '2020-11-25 23:28:50', '2020-11-25 23:28:50');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(20) NOT NULL,
  `head` varchar(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `foreign_name` varchar(50) NOT NULL,
  `ware` int(11) NOT NULL,
  `by` int(11) NOT NULL,
  `note` varchar(100) NOT NULL,
  `accounts_id` bigint(20) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '1=active,2=inactive',
  `trash` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `head`, `type`, `name`, `foreign_name`, `ware`, `by`, `note`, `accounts_id`, `status`, `trash`) VALUES
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
-- Table structure for table `sizes`
--

CREATE TABLE `sizes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'active = 1 inactive = 2',
  `trash` tinyint(4) NOT NULL COMMENT 'delete=2',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sizes`
--

INSERT INTO `sizes` (`id`, `name`, `status`, `trash`, `created_at`, `updated_at`) VALUES
(1, 'xl', 1, 0, '2020-11-22 06:51:15', '2020-11-22 06:51:15'),
(2, 'm', 1, 0, '2020-11-22 06:57:07', '2020-11-22 06:57:07'),
(3, 'm', 1, 0, '2020-12-06 02:15:17', '2020-12-06 02:16:08'),
(4, 'large', 1, 0, '2020-12-06 02:50:35', '2020-12-06 02:50:35');

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `store_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ware_id` int(10) UNSIGNED NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'active=1 inactive=2',
  `trash` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'delete=2',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`id`, `store_name`, `remarks`, `ware_id`, `status`, `trash`, `created_at`, `updated_at`) VALUES
(1, 'Common', '', 1, 1, 3, NULL, NULL),
(2, 'uncommon', 'LOL', 2, 1, 1, '2020-11-19 00:46:27', '2020-11-19 00:46:27');

-- --------------------------------------------------------

--
-- Table structure for table `store_invoices`
--

CREATE TABLE `store_invoices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_number` int(11) NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vendor_id` int(10) UNSIGNED DEFAULT 0,
  `ware_id` int(10) UNSIGNED DEFAULT 0,
  `date` date DEFAULT NULL,
  `posting_by` int(10) UNSIGNED NOT NULL,
  `store_id` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `gross_amount` double(8,2) DEFAULT NULL,
  `discount_taka` double(8,2) DEFAULT 0.00,
  `discount_percent` double(8,2) DEFAULT 0.00,
  `cash_amount` double(8,2) DEFAULT 0.00,
  `cash_id` int(10) UNSIGNED DEFAULT 0,
  `bank_amount` float DEFAULT 0,
  `bank_id` int(11) DEFAULT 0,
  `salesman_id` int(11) NOT NULL,
  `ref_inv` int(10) UNSIGNED DEFAULT 0,
  `ref_product_id` int(11) NOT NULL DEFAULT 0,
  `return_quantity` int(11) NOT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_quantity` int(11) DEFAULT 0,
  `total_rqty` int(5) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `store_invoices`
--

INSERT INTO `store_invoices` (`id`, `invoice_number`, `type`, `vendor_id`, `ware_id`, `date`, `posting_by`, `store_id`, `gross_amount`, `discount_taka`, `discount_percent`, `cash_amount`, `cash_id`, `bank_amount`, `bank_id`, `salesman_id`, `ref_inv`, `ref_product_id`, `return_quantity`, `remarks`, `total_quantity`, `total_rqty`, `created_at`, `updated_at`) VALUES
(1, 1000, '1', 3, 1, '2020-11-30', 1, 1, 300000.00, 0.00, NULL, 0.00, NULL, 0, NULL, 0, 0, 0, 0, NULL, NULL, 0, '2020-11-30 06:35:29', '2020-11-30 06:35:29'),
(2, 6000, '6', 3, 1, '2020-11-30', 1, 1, NULL, 0.00, NULL, 0.00, NULL, 0, NULL, 0, 0, 0, 0, NULL, 5, 5, '2020-11-30 06:36:02', '2020-11-30 06:36:02'),
(3, 7000, '7', 3, 1, '2020-11-30', 1, 1, NULL, 0.00, NULL, 0.00, NULL, 0, NULL, 0, 2, 0, 0, NULL, NULL, 0, '2020-11-30 06:38:14', '2020-11-30 06:38:14'),
(4, 6001, '6', 4, 2, '2020-12-01', 1, 2, NULL, 0.00, NULL, 0.00, NULL, 0, NULL, 0, 0, 0, 0, NULL, 2, 2, '2020-11-30 23:11:34', '2020-11-30 23:11:34'),
(5, 7001, '7', 4, 2, '2020-12-01', 1, 2, NULL, 0.00, NULL, 0.00, NULL, 0, NULL, 0, 4, 0, 0, NULL, NULL, 0, '2020-11-30 23:12:05', '2020-11-30 23:12:05'),
(6, 2000, '2', 1, 1, '2020-12-06', 1, 1, 999999.99, 0.00, NULL, 0.00, NULL, 0, NULL, 0, 0, 0, 0, NULL, NULL, 0, '2020-12-06 04:38:49', '2020-12-06 04:38:49'),
(7, 7001, '7', 6, 2, '2020-12-06', 1, 2, NULL, 0.00, NULL, 0.00, NULL, 0, NULL, 0, 0, 0, 0, NULL, 1, 0, '2020-12-06 05:06:06', '2020-12-06 05:06:06'),
(8, 6001, '6', 0, 1, '2020-12-08', 1, 1, NULL, 0.00, NULL, 0.00, NULL, 0, NULL, 0, 0, 0, 0, NULL, 3, 0, '2020-12-08 01:34:40', '2020-12-08 01:34:40');

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unit_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit_code` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `unit_name`, `unit_code`, `status`, `created_at`, `updated_at`) VALUES
(1, 'component', 100, 1, '2020-11-15 02:44:17', '2020-11-15 02:44:17'),
(2, 'piece', 101, 1, '2020-12-06 01:31:50', '2020-12-06 01:31:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ware_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 1,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `ware_id`, `role_id`, `status`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'sudipto kumar shil', 'sudiptoshil@outlook.com', NULL, '$2y$10$HgeE3AlnBidwVEN74yKeH.LmG/UvJf2WjzngJi4KOWluXLNhTxwga', 1, 0, 1, NULL, NULL, NULL),
(2, 'sudipto kumar shil', 'sudipto@gmail.com', NULL, '$2y$10$2EMjRm40h8OKg3qQubbVeeyaJSKmFEEOaIDXCDYUSxIk2ZWxo8b.m', 1, 0, 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_role_details`
--

CREATE TABLE `user_role_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `root_id` int(11) NOT NULL,
  `sub_id` int(11) NOT NULL,
  `module_id` int(11) NOT NULL,
  `add_permission` int(11) NOT NULL COMMENT 'permit=1',
  `edit_permission` int(11) NOT NULL COMMENT 'permit=1',
  `delete_permission` int(11) NOT NULL COMMENT 'permit=1',
  `view_permission` int(11) NOT NULL COMMENT 'permit=1',
  `print_permission` int(11) NOT NULL COMMENT 'permit=1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vats`
--

CREATE TABLE `vats` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `vat_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` int(11) NOT NULL,
  `ware_id` int(10) UNSIGNED NOT NULL,
  `status` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accounts_no` int(10) UNSIGNED DEFAULT 0,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'active =1 inactive =2',
  `type` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'vendor=1 customer =2',
  `ware_id` int(3) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vendors`
--

INSERT INTO `vendors` (`id`, `name`, `email`, `address`, `phone`, `remarks`, `accounts_no`, `status`, `type`, `ware_id`, `created_at`, `updated_at`) VALUES
(1, 'vendors', 'vendor@gmail.com', 'ctg', '01624772008', 'good day', 0, 1, 1, 1, '2020-11-15 02:39:28', '2020-11-15 02:39:37'),
(2, 'tester', 'sudipto@outlook.com', 'test', '444', '099', 751, 1, 2, 1, '2020-11-15 07:32:41', '2020-12-05 23:40:10'),
(3, 'vendor1', 'vendor@email.com', 'ctg', '01624772008', 'ok', 192, 1, 1, 1, '2020-11-18 05:45:59', '2020-11-18 05:45:59'),
(4, 'customer', 'customer@gmail.com', 'ctg', '08766', 'LOL customer', 0, 1, 2, 1, '2020-11-18 05:51:18', '2020-11-19 00:35:06'),
(5, 'vendor23', 'lol@gmail.com', 'ctg', '01624772008', '233', 204, 2, 1, 2, '2020-11-19 01:35:35', '2020-11-19 01:35:35'),
(6, 'test2', 'test2@gmail.com', 'ctg', '223', 'good', 203, 1, 2, 1, '2020-11-25 00:43:03', '2020-11-25 00:43:03'),
(7, 'rqwetwer', 'vendor@email.com', 'sadaf', '56575765', 'etrwetwer', 205, 1, 1, 1, '2020-11-25 00:45:56', '2020-11-25 00:45:56'),
(8, 'werqwr', 'admin@admin.com', 'qwerq', '5', '444', 192, 1, 2, 1, '2020-11-25 00:46:28', '2020-11-25 00:46:28'),
(9, 'checkvendor', 'lol@gmail.com', 'ctg', '01624772008', 'done', 203, 1, 1, 2, '2020-11-25 00:54:29', '2020-11-25 00:54:29'),
(10, 'ok2', NULL, NULL, '223', NULL, NULL, 1, 1, 1, '2020-11-25 00:59:44', '2020-11-25 00:59:44');

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
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'active=1 inactive=2',
  `foreign_address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ware_house_details`
--

INSERT INTO `ware_house_details` (`id`, `name`, `foreign_name`, `wh_keeper`, `location`, `telephone`, `sequence`, `province_no`, `resign_code`, `wh_transfer_interface_account`, `item_activity`, `default_cc_code`, `account_name`, `branch`, `pricing_level`, `global_location_no`, `longitude`, `latitude`, `address`, `status`, `foreign_address`, `created_at`, `updated_at`) VALUES
(1, 'E-Store', '', '', '', '', '', 0, 0, '', '', 0, '', '', '', 0, '', '', 'lorem ipsum dolor emit', 1, '', NULL, '2020-11-15 07:28:27'),
(2, 'central office', 'cn', '12', 'ctg', '01624772008', '234', 234, 2345, '3455', '23', 33, 'hello', 'ctg', '23', 3344, '344', '34', 'ctg', 1, 'no', '2020-11-19 00:22:26', '2020-11-19 01:31:36'),
(3, 'LOL Warhouse', 'eee', '12', 'ctg', '2345', '123', 12, 334, '44', '3', 44, '44', '44', '44', 123, '344', '34', 'ctg', 2, 'no', '2020-11-19 01:25:42', '2020-11-19 01:25:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts_inputs`
--
ALTER TABLE `accounts_inputs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bank_details`
--
ALTER TABLE `bank_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cash_account_details`
--
ALTER TABLE `cash_account_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cost_centers`
--
ALTER TABLE `cost_centers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory_categories`
--
ALTER TABLE `inventory_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory_products`
--
ALTER TABLE `inventory_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice_account_details`
--
ALTER TABLE `invoice_account_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice_account_transec_details`
--
ALTER TABLE `invoice_account_transec_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice_parameters`
--
ALTER TABLE `invoice_parameters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice_trasections`
--
ALTER TABLE `invoice_trasections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ledgers`
--
ALTER TABLE `ledgers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_submenu_settings`
--
ALTER TABLE `menu_submenu_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `role_settings`
--
ALTER TABLE `role_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales_men`
--
ALTER TABLE `sales_men`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `store_invoices`
--
ALTER TABLE `store_invoices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_role_details`
--
ALTER TABLE `user_role_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vats`
--
ALTER TABLE `vats`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `accounts_inputs`
--
ALTER TABLE `accounts_inputs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `bank_details`
--
ALTER TABLE `bank_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cash_account_details`
--
ALTER TABLE `cash_account_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cost_centers`
--
ALTER TABLE `cost_centers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory_categories`
--
ALTER TABLE `inventory_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `inventory_products`
--
ALTER TABLE `inventory_products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `invoice_account_details`
--
ALTER TABLE `invoice_account_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `invoice_account_transec_details`
--
ALTER TABLE `invoice_account_transec_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `invoice_parameters`
--
ALTER TABLE `invoice_parameters`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `invoice_trasections`
--
ALTER TABLE `invoice_trasections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `ledgers`
--
ALTER TABLE `ledgers`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1230;

--
-- AUTO_INCREMENT for table `menu_submenu_settings`
--
ALTER TABLE `menu_submenu_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `modules`
--
ALTER TABLE `modules`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `role_settings`
--
ALTER TABLE `role_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sales_men`
--
ALTER TABLE `sales_men`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=498;

--
-- AUTO_INCREMENT for table `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `store_invoices`
--
ALTER TABLE `store_invoices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_role_details`
--
ALTER TABLE `user_role_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vats`
--
ALTER TABLE `vats`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `ware_house_details`
--
ALTER TABLE `ware_house_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
