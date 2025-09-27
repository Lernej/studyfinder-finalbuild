import { useState } from "react";

interface Props {
  subjects: string[];
  setSelectedClass: (selectedClass: string) => void;
  setShowSessions: (showSessions: boolean) => void;
}

const ClassInput = ({ subjects, setSelectedClass, setShowSessions }: Props) => {
  function handleSelect() {
    setSelectedClass(inputValue);
    setShowSessions(true);
  }

  const [inputValue, setInputValue] = useState<string>("");

  return (
    <div>
      <select
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      >
        <option value="">--Choose a subject--</option>
        {subjects.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </select>
      <button onClick={handleSelect} disabled={!inputValue}>
        Select
      </button>
    </div>
  );
};

export default ClassInput;
