/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50730
 Source Host           : localhost:3306
 Source Schema         : sekolah

 Target Server Type    : MySQL
 Target Server Version : 50730
 File Encoding         : 65001

 Date: 10/02/2021 12:24:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for kelas
-- ----------------------------
DROP TABLE IF EXISTS `kelas`;
CREATE TABLE `kelas`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of kelas
-- ----------------------------
INSERT INTO `kelas` VALUES (1, 'Kelas A');
INSERT INTO `kelas` VALUES (2, 'Kelas B');
INSERT INTO `kelas` VALUES (3, 'Kelas C');
INSERT INTO `kelas` VALUES (4, 'Kelas D');

-- ----------------------------
-- Table structure for siswa
-- ----------------------------
DROP TABLE IF EXISTS `siswa`;
CREATE TABLE `siswa`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_kelas` int(11) NULL DEFAULT NULL,
  `nama` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `tgl_lahir` date NULL DEFAULT NULL,
  `tgl_insert` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `last_update` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of siswa
-- ----------------------------
INSERT INTO `siswa` VALUES (1, 1, 'Adi', '1999-01-07', '2021-01-30 09:15:05', '2021-01-30 09:15:05');
INSERT INTO `siswa` VALUES (2, 2, 'Adam', '1998-06-23', '2021-01-30 09:15:10', '2021-01-30 09:16:10');
INSERT INTO `siswa` VALUES (3, 1, 'Bram', '1997-08-31', '2021-01-30 09:15:12', '2021-01-30 09:16:31');
INSERT INTO `siswa` VALUES (4, 3, 'Kharis', '1999-01-07', '2021-01-30 09:15:20', '2021-01-30 09:16:41');
INSERT INTO `siswa` VALUES (5, 3, 'Siti', '1998-06-23', '2021-01-30 09:15:32', '2021-01-30 09:16:41');
INSERT INTO `siswa` VALUES (6, 1, 'Orin', '1997-08-31', '2021-01-30 09:15:38', '2021-01-30 09:16:41');
INSERT INTO `siswa` VALUES (7, 2, 'Doni', '1999-01-07', '2021-01-30 09:15:41', '2021-01-30 09:16:42');
INSERT INTO `siswa` VALUES (8, 3, 'Joko', '1998-06-23', '2021-01-30 09:15:43', '2021-01-30 09:16:42');
INSERT INTO `siswa` VALUES (9, 1, 'Tama', '1997-08-31', '2021-01-30 09:15:46', '2021-01-30 09:16:42');
INSERT INTO `siswa` VALUES (10, 2, 'Ali', '1999-01-07', '2021-01-30 09:15:52', '2021-01-30 09:16:43');

-- ----------------------------
-- Table structure for sys_application
-- ----------------------------
DROP TABLE IF EXISTS `sys_application`;
CREATE TABLE `sys_application`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `app_key` varchar(40) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `app_secret` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `status` tinyint(4) NULL DEFAULT 0 COMMENT '0=Not Active, 1=Active',
  `tgl_insert` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `last_update` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `app_key`(`app_key`) USING BTREE,
  UNIQUE INDEX `app_secret`(`app_secret`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_application
-- ----------------------------
INSERT INTO `sys_application` VALUES (1, 'Application 1', '4ec090bf-8c5b-423b-81a6-c29c3c0cd5f8', 'gpEOcnBdKp3eFDsQpa5C', 1, '2021-02-09 13:24:37', '2021-02-10 08:24:21');
INSERT INTO `sys_application` VALUES (2, 'Application 2', '8065da68-5ef0-46c3-8dcf-44aad5fed555', '9ivarZPlZZHNDAOrHXD4', 1, '2021-02-10 08:24:27', '2021-02-10 08:28:07');

SET FOREIGN_KEY_CHECKS = 1;
