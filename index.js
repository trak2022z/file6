"use strict";

const SEARCHABLE_BLOG_POST_FIELDS = ['title', 'body', 'author'];

const express = require('express');
const multer = require('multer');
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());

app.get('/search', async function (req, res) {
  let author = req.query['author'];

  try {
    let searchResult = await getPostsFromDb({author: '%' + author + '%'});
    res.json( {"posts": searchResult} );
  } catch (err) {
    res.status(500).type('text').send("Error fetching from DB: " + err);
  }
});

app.get('/posts', async function(req, res) {
  let returnPosts = await allPosts();
  res.json(returnPosts);
});

app.post('/newpost', async function(req, res) {
  // validate: title, body, author needed at minimum
  let requiredFields = ['title', 'body', 'author'];
  let missingFields = [];
  requiredFields.forEach((field) => {
    if (req.body[field] === undefined) {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    res.status(400).type('text').send("Missing parameters: " + missingFields);
  }

  try {
    await writePost(req.body);
    res.status(200).type('text').send("OK");
  } catch (err) {
    res.status(500).type('text').send("Error writing post: " + err);
  }
});

async function allPosts() {
  let returnPosts = {
    "posts": []
  };

  let posts;
  try {
    posts = await getPostsFromDb();
  } catch (err) {
    console.log(err);
  }

  for (let i = 0; i < posts.length; i++) {
    let post = {
      "title": posts[i]['title'],
      "body": posts[i]['body'],
      "author": posts[i]['author'],
      "time": posts[i]['timestamp']
    };
    returnPosts["posts"].push(post);
  }

  return returnPosts;
}

/**
 * Retrieve posts from the database.
 * @param {JSON} searchParams JSON object containing the fields to search for.
 * Unknown fields will be ignored.
 */
async function getPostsFromDb(searchParams) {
  let statement = "SELECT * FROM posts";
  let placeholders = [];
  if (searchParams) {
    statement += " WHERE ";
    for (let field of SEARCHABLE_BLOG_POST_FIELDS) {
      if (searchParams[field]) {
        statement += field + ' LIKE ? AND ';
        placeholders.push(searchParams[field]);
      }
    }
    statement += '1=1'; // Fencepost
  }

  statement += " ORDER BY timestamp";

  // eslint-disable-next-line no-console
  console.log(statement);
  const db = await getDBConnection();
  let rows = await db.all(statement, placeholders);
  await db.close();

  return rows;
}

async function writePost(post) {
  let title = post.title;
  let body = post.body;
  let author = post.author;
  let statement = 'INSERT INTO posts (title, author, body) VALUES (?,?,?)'; 
  const db = await getDBConnection();
  let rows = await db.run(statement, [title, author, body]);
  await db.close();
  console.log(rows);
}

/**
 * Establishes a database connection to the database and returns the database object.
 * Any errors that occur should be caught in the function that calls this one.
 * @returns {Object} - The database object for the connection.
 */
async function getDBConnection() {
  const db = await sqlite.open({
    filename: 'blog.db',
    driver: sqlite3.Database
  });

  return db;
}

app.use(express.static("public"));
const PORT = process.env.PORT || 3000;
app.listen(PORT);
