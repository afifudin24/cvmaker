-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 23 Sep 2024 pada 23.22
-- Versi server: 10.4.11-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cvmaker`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `cvs`
--

CREATE TABLE `cvs` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `skills` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`skills`)),
  `education` longtext DEFAULT NULL,
  `experience` longtext DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `cvs`
--

INSERT INTO `cvs` (`id`, `userId`, `name`, `description`, `skills`, `education`, `experience`, `createdAt`, `updatedAt`) VALUES
(20, 5, 'Afif Waliyudin', 'I just one person', '[{\"skillName\":\"Coding\",\"skillDescription\":\"This Is Description\"},{\"skillName\":\"Teaching\",\"skillDescription\":\"This Is Description\"}]', '[{\"skillName\":\"Coding\",\"skillDescription\":\"This Is Description\"},{\"skillName\":\"Teaching\",\"skillDescription\":\"This Is Description\"}]', '[{\"skillName\":\"Coding\",\"skillDescription\":\"This Is Description\"},{\"skillName\":\"Teaching\",\"skillDescription\":\"This Is Description\"}]', '2024-09-23 15:45:45', '2024-09-23 15:45:45');

-- --------------------------------------------------------

--
-- Struktur dari tabel `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '2024-09-23 09:07:18', '2024-09-23 09:07:18'),
(2, 'user', '2024-09-23 09:07:18', '2024-09-23 09:07:18');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20240923074205-create-role.js'),
('20240923074310-create-user.js'),
('20240923074504-create-user-roles.js'),
('20240923081602-create-cv.js'),
('20240923085657-create-user-info.js');

-- --------------------------------------------------------

--
-- Struktur dari tabel `userinfos`
--

CREATE TABLE `userinfos` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `bornDate` datetime DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `hobby` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `userinfos`
--

INSERT INTO `userinfos` (`id`, `userId`, `name`, `age`, `bornDate`, `address`, `hobby`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'John Doe', 30, '1993-05-15 00:00:00', '123 Main St, Springfield', 'Fishing', '2024-09-23 09:11:52', '2024-09-23 09:11:52'),
(3, 5, 'Apip Wali', 21, '2003-01-24 00:00:00', 'Surusunda Karangpucung', 'Ngoding', '2024-09-23 13:44:00', '2024-09-23 13:49:59');

-- --------------------------------------------------------

--
-- Struktur dari tabel `userroles`
--

CREATE TABLE `userroles` (
  `userId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `userroles`
--

INSERT INTO `userroles` (`userId`, `roleId`, `createdAt`, `updatedAt`) VALUES
(1, 2, '2024-09-23 16:08:10', '2024-09-23 16:08:10'),
(5, 2, '2024-09-23 12:54:09', '2024-09-23 12:54:09');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'john_doe', 'john@example.com', '$2a$10$UUFqHi40tUpsRlbpRxXa3uHitY.wXfICu.Ixgm2Grnx4cwzAqsrQ6', '2024-09-23 09:07:18', '2024-09-23 09:07:18'),
(5, 'afif', 'afifrider507@gmail.com', '$2a$10$0vgklpsIK8JwhgYSGzpzbOe.xNE7c.01GxJkBsA2uSRLWli2rY9lK', '2024-09-23 12:54:09', '2024-09-23 12:54:09');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `cvs`
--
ALTER TABLE `cvs`
  ADD PRIMARY KEY (`id`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Indeks untuk tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `userinfos`
--
ALTER TABLE `userinfos`
  ADD PRIMARY KEY (`id`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Indeks untuk tabel `userroles`
--
ALTER TABLE `userroles`
  ADD PRIMARY KEY (`userId`,`roleId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `cvs`
--
ALTER TABLE `cvs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT untuk tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `userinfos`
--
ALTER TABLE `userinfos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `cvs`
--
ALTER TABLE `cvs`
  ADD CONSTRAINT `cvs_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `userinfos`
--
ALTER TABLE `userinfos`
  ADD CONSTRAINT `userinfos_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `userroles`
--
ALTER TABLE `userroles`
  ADD CONSTRAINT `userroles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `userroles_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
