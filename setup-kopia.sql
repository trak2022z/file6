--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  `author` TEXT DEFAULT 'Fitz',
  `title` TEXT DEFAULT NULL,
  `body` TEXT
);

INSERT INTO `posts` (`id`, `timestamp`, `author`, `title`, `body`)
VALUES
	(1,'2022-01-22 13:04:02','User1','Python post!','Python was created in the early 1990s by Guido van Rossum.'),
	(2,'2022-02-02 16:05:49','User1','Node post!','Node.js is an open-source, cross-platform, back-end JavaScript runtime environment.'),
	(3,'2022-02-02 17:15:23','User1','Java post!','Java testing.'),
	(4,'2022-02-06 18:35:25','User2','Python test','Go python.'),
	(5,'2022-02-12 16:47:51','User2','Java test1','This page includes java programs on various java topics such as control statements, loops, classes & objects, functions, arrays etc.'),
	(6,'2022-02-13 16:45:51','User2','Java test2','All the programs are tested.'),
	(7,'2022-02-13 17:51:13','User3','PHP info','Testing the new php endpoint. This is a text blog post to see if I can actually input things.');