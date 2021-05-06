const express = require("express");
const Article = require("./models/article");
const methodOverride = require("method-override");
const articleRouter = require("./routes/article");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/blog", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({
    createdAt: -1,
  });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

app.listen(5000);
