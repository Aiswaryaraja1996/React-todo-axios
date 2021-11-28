import { useState, useEffect } from "react";
import axios from "axios";
import TodoInput from "./TodoInput";
import { ArrowClockwise } from "react-bootstrap-icons";

const getTodo = () => {
  const config = {
    url: "http://localhost:3001/data",
    method: "GET",
  };
  return axios(config);
};

const createTodo = (title) => {
  const payLoad = {
    title,
    status: false,
  };
  const config = {
    url: "http://localhost:3001/data",
    method: "POST",
    data: payLoad,
  };
  return axios(config);
};

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    handleGetTodo();
  }, []);

  const handleGetTodo = () => {
    return getTodo()
      .then((res) => {
        setTodos(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = async (title) => {
    try {
      setLoading(true);
      await createTodo(title);
      await handleGetTodo();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div>
        <ArrowClockwise></ArrowClockwise>
      </div>
    );
  }

  return (
    <div>
      <TodoInput submit={handleSubmit}></TodoInput>
      <br/>
      <div>
        {todos.map((item) => (
          <div key={item.id}>
            <div>{item.title} : {item.status? "Completed" : "Not Completed"}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
