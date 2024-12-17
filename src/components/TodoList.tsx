import { Edit, Trash } from "lucide-react";
export default function TodoList({
  data,
  delHandler,
  editHandler,
  completeHandler,
}: {
  data: { content: string; id: string; complete: boolean }[];
  delHandler: (id: string) => void;
  editHandler: (value: string, id: string) => void;
  completeHandler: (id: string) => void;
}) {
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
          {data.map((item) => {
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
                  onChange={() => completeHandler(item.id)}
                />
                <div className={`content ${item.complete && "complete"}`}>
                  {item.content}
                </div>
                <div className="act-icons flex items-center gap-2">
                  <Trash
                    size={16}
                    className="duration-500 font-extrabold hover:text-red-500"
                    onClick={() => delHandler(item.id)}
                  />
                  <Edit
                    size={16}
                    className="duration-500 font-extrabold hover:text-green-500"
                    onClick={() => editHandler(item.content, item.id)}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
