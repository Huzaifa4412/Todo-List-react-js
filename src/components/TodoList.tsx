import { Edit, Trash } from "lucide-react";
import { useEffect } from "react";

export default function TodoList({
  data,
  delHandler,
  editHandler,
  completedData,
}: {
  data: { value: string; id: string; complete: boolean }[];
  delHandler: (id: string) => void;
  editHandler: (value: string, id: string) => void;
  completedData: (value: string, id: string, complete: boolean) => void;
}) {
  function completeHandler(
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    const checked = (event.target as HTMLInputElement).checked;
    data = data.map((item) => {
      if (item.id === id) {
        return { ...item, complete: checked };
      }
      return item;
    });
    console.log(data);
  }

  useEffect(() => {
    const lsData = localStorage.getItem("todoList");
    data = JSON.parse(lsData ?? "[]");
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(data));
  }, [data]);

  return (
    <div className="container">
      <h2
        className="text-center text-3xl"
        style={{ color: "var(--text-color)" }}
      >
        Todo List
      </h2>
      <div className="todos-container ">
        <ul className="grid items-center justify-center mt-8">
          {data.map(
            (item: { value: string; id: string; complete: boolean }) => {
              return (
                <li
                  id={item.id}
                  key={item.id}
                  style={{
                    color: "var(--text-color)",
                    fontSize: "24px",
                    borderBottom: "1px solid var(--border-color)",
                  }}
                  className="flex items-center justify-between gap-8 px-5 py-2 "
                >
                  <input
                    type="checkbox"
                    name="complete"
                    id="complete"
                    checked={item.complete}
                    onChange={(e) => {
                      completeHandler(e, item.id);
                      completedData(item.value, item.id, item.complete);
                    }}
                  />
                  <div className={`content ${item.complete && `complete`}`}>
                    {item.value}
                  </div>
                  <div className="act-icons flex items-center gap-2">
                    <Trash
                      size={16}
                      className="duration-500 font-extrabold hover:text-red-500"
                      onClick={() => {
                        delHandler(item.id);
                      }}
                    />
                    <Edit
                      size={16}
                      className="duration-500 font-extrabold hover:text-green-500"
                      onClick={() => {
                        editHandler(item.value, item.id);
                      }}
                    />
                  </div>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
}
