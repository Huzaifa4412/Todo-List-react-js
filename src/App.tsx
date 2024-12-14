import { useState } from "react";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

const App = () => {
  const [data, setData] = useState<
    { value: string; id: string; complete: boolean }[]
  >(JSON.parse(localStorage.getItem("todoList") ?? "[]"));
  const [editValue, setEditValue] = useState<string>();
  const [editId, setEditId] = useState<string>();

  // ! Local Storage
  // // ? Local Storage Set

  // // ? Local Storage Get
  // useEffect(() => {
  //   const localData = localStorage.getItem("react-todo");
  //   if (localData) {
  //     setData(JSON.parse(localData));
  //   }
  // }, []);

  //? Set Data
  function Data(value: string) {
    setData([...data, { value, id: Date.now().toString(), complete: false }]);
  }

  //? Delete Handler
  function delHandler(id: string) {
    setData(
      data.filter((item) => {
        return item.id !== id;
      })
    );
  }

  // ? Edit Handler
  function editHandler(value: string, id: string) {
    setEditValue(value);
    setEditId(id);
  }

  // ? Completed Handler
  function completedData(value: string, id: string, complete: boolean) {
    setData(
      data.map((item) => {
        if (item.id === id) {
          return { ...item, value, complete: !complete };
        }
        return item;
      })
    );
  }

  // ? Edit Value Handler
  function editValueHandler(value: string) {
    setData(
      data.map((item) => {
        if (item.id === editId) {
          return { ...item, value, id: Date.now().toString() };
        }
        return item;
      })
    );
    setEditValue(undefined);
    setEditId(undefined);
  }

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
        getData={Data}
        editValue={editValue ?? ""}
        editData={editValueHandler}
      />
      <TodoList
        data={data}
        delHandler={delHandler}
        editHandler={editHandler}
        completedData={completedData}
      />
    </div>
  );
};

export default App;
