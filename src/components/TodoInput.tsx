import { useEffect, useState } from "react";

export default function TodoInput({
  sendInput,
  editValue,
  sendEditValue,
}: {
  sendInput: (value: string) => void;
  editValue: string;
  sendEditValue: (value: string) => void;
}) {
  const [input, setInput] = useState<string>();

  function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input) {
      input.trim();
      if (editValue) {
        sendEditValue(input ?? "");
      } else {
        sendInput(input ?? "");
      }
    }
    setInput("");
  }

  useEffect(() => {
    setInput(editValue);
  }, [editValue]);

  return (
    <div className="container">
      <form onSubmit={(e) => HandleSubmit(e)}>
        <div className="form-container flex justify-center w-full">
          <input
            id="input"
            type="text"
            autoFocus
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className="lg:ml-[10%] rounded-md rounded-r-none text-xl outline-none px-5 py-3 w-[100%] max-w-[700px]"
            style={{
              backgroundColor: "var(--input-color)",
              color: "var(--bg-color)",
            }}
          />
          <input
            type="submit"
            value="Submit"
            className="px-3 rounded-r-md font-semibold min-w-[100px] text-xl"
            style={{
              backgroundColor: "var(--accent-color)",
              color: "var(--bg-color)",
            }}
          />
        </div>
      </form>
    </div>
  );
}
