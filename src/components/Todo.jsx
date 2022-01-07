import { useState, useEffect } from "react";
import axios from "axios";
import TodoInput from "./TodoInput";
import { ArrowClockwise } from "react-bootstrap-icons";

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

const patchTodo = (title, id, status) => {
  const payLoad1 = {
    title,
    status: !status,
  };
  const config = {
    url: `http://localhost:3001/data/${id}`,
    method: "PATCH",
    data: payLoad1,
  };
  return axios(config);
};

const deleteTodo = (id) => {
  const config = {
    url: `http://localhost:3001/data/${id}`,
    method: "DELETE",
  };
  return axios(config);
};

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const getTodo = (page = 1, perPage = 2) => {
    const config = {
      url: `http://localhost:3001/data?_page=${page}&_limit=${perPage}`,
      method: "GET",
    };
    return axios(config);
  };

  useEffect(() => {
    handleGetTodo();
  }, [page]);

  const handleGetTodo = () => {
    return getTodo(page)
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

  const handleToggle = async (title, id, status) => {
    try {
      setLoading(true);
      await patchTodo(title, id, status);
      await handleGetTodo();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteTodo(id);
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
      <h1>TODOS</h1>
      <TodoInput submit={handleSubmit}></TodoInput>
      <br />
      <div>
        <button
          onClick={() => {
            if (page === 1) {
              setPage(1);
            } else setPage(page - 1);
          }}
        >
          Prev
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
      <div>
        {todos.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid black",
              padding: "20px",
              width: "20%",
              margin: "10px auto",
            }}
          >
            <div>
              {item.title} : {item.status ? "Completed" : "Not Completed"}
            </div>
            <button
              onClick={() => handleToggle(item.title, item.id, item.status)}
              style={{ marginRight: "10px" }}
            >
              {!item.status ? "Mark Complete" : "Mark Uncomplete"}
            </button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
