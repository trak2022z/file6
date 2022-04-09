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
	(1,'2020-11-22 12:03:02','Fitz','Cats like to play!','They often chase each other around the house. Orange often starts the fights, but often loses to Juice.'),
	(2,'2020-12-02 15:08:39','Fitz','Node Post','Node testing!'),
	(3,'2020-12-02 15:16:33','Fitz','Java Post','Java testing.'),
	(4,'2020-12-06 15:15:05','Fitz','Go Post','Go Fish.'),
	(5,'2020-12-12 13:57:31','Fitz','Another test','This is a text blog post to see if I can actually input things.'),
	(6,'2020-12-12 14:41:33','Fitz','This is a PHP Text','Testing the new php endpoint');