import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState<
    { content: string; id: string; complete: boolean }[]
  >(JSON.parse(localStorage.getItem("react-todo") ?? "[]"));
  const [editValue, setEditValue] = useState<string>();
  const [editId, setEditId] = useState<string>();

  //! Local Storage.
  useEffect(() => {
    localStorage.setItem("react-todo", JSON.stringify(data));
  }, [data]);

  // ? Getting Data from Input
  function getData(value: string) {
    setData([
      ...data,
      { content: value, id: Date.now().toString(), complete: false },
    ]);
  }

  //? Delete Handler
  const delHandler = (id: string) => {
    setData(data.filter((data) => data.id !== id));
  };

  //? Edit handler
  const editHandler = (value: string, id: string) => {
    setEditValue(value);
    setEditId(id);
  };

  //? Edit Value
  const editedValue = (value: string) => {
    setData(
      data.map((item) => {
        if (item.id === editId) {
          return { content: value, id: editId, complete: false };
        }
        return item;
      })
    );
    setEditId(undefined);
    setEditValue(undefined);
  };

  //? Complete Handler
  const completeHandler = (id: string) => {
    setData(
      data.map((item) => {
        if (item.id == id) {
          return { ...item, complete: !item.complete };
        }
        return item;
      })
    );
  };

  return (
    <div
      className="w-full h-screen"
      style={{
        backgroundColor: "var(--bg-color)",
        transition: "0.3s all ease-in-out",
      }}
    >
      <Header />
      <TodoInput
        sendInput={getData}
        editValue={editValue ?? ""}
        sendEditValue={editedValue}
      />
      <TodoList
        data={data}
        delHandler={delHandler}
        editHandler={editHandler}
        completeHandler={completeHandler}
      />
    </div>
  );
};

export default App;
