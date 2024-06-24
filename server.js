const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

//Middleware
app.use(bodyParser.json()); //parse req.body into JSON

//Storage
todos = [];

//Routes

//GET
app.get("/todos", (req, res) => {
  let result = todos.map((todo) => todo.content);
  return res.json(result);
});

//GET BY NAME
app.get("/todos/:name", (req, res) => {
  let result = todos.find((todo) => todo.name === req.params.name);
  if (result) {
    return res.json(result.content);
  } else {
    return res.status(404).json({ error: "Todo not found" });
  }
});

//POST
app.post("/todos", (req, res) => {
  const newTodo = req.body;
  // Gathering the content value
  const content = newTodo.content;
  const formattedContent = content.replace(/\s/g, "-");
  newTodo.content = formattedContent;``
  todos.push(newTodo);
  res.status(201).send(newTodo);
});

//PUT
app.put("/todos/:name", (req, res) => {
  const name = req.params.name;
  const updatedTodo = req.body;
  const index = todos.findIndex((todo) => todo.content === name);
  if (index === -1) {
    res.status(404).json({ message: "Todo not found" });
  } else {
    todos[index] = updatedTodo;
    res.json(updatedTodo);
  }
});

//DELETE
app.delete("/todos/:name", (req, res) => {
  const name = req.params.name;
  const index = todos.findIndex((todo) => todo.content === name);
  if (index === -1) {
    res.status(404).json({ message: "Todo not found" });
  } else {
    todos.splice(index, 1);
    res.json({ message: "Todo deleted" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
