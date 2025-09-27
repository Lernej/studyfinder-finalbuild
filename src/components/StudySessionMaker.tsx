import { useState } from "react";
import type { StudySession } from "../interfaces";
import { db } from "../firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";

interface Props {
  subjects: string[];
}

const StudySessionMaker = ({ subjects }: Props) => {
  const [showWindow, setShowWindow] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [examDate, setExamDate] = useState("");
  const [location, setLocation] = useState(""); // NEW

  function handleFirstClick() {
    setShowWindow(!showWindow);
  }

  function formatTime(time24: string) {
    if (!time24) return "";
    const [hourStr, minute] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "pm" : "am";
    hour = hour % 12 || 12;
    return `${hour}:${minute}${ampm}`;
  }

  function formatDate(dateStr: string) {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-").map(Number);
    const shortYear = year % 100;
    return `${month}/${day}/${shortYear}`;
  }

  const handleCreateSession = async () => {
    const newSessionRef = doc(collection(db, "sessions"));

    const newSession: StudySession = {
      id: newSessionRef.id,
      className: selectedClass,
      date: formatDate(date),
      startTime: formatTime(startTime),
      endTime: formatTime(endTime),
      examDate: formatDate(examDate),
      location, // NEW
      members: [],
    };

    try {
      await setDoc(newSessionRef, newSession);

      // Reset form
      setSelectedClass("");
      setDate("");
      setStartTime("");
      setEndTime("");
      setExamDate("");
      setLocation(""); // NEW
      setShowWindow(false);
    } catch (error) {
      console.error("Error adding session: ", error);
    }
  };

  return (
    <div className="createSessionContainer">
      <button className="createButton" onClick={handleFirstClick}>
        Create a study session
      </button>

      {showWindow && (
        <div className="sessionMaker">
          <div>
            <label>
              Class:
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">--Choose a class--</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label>
              Date:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              Start Time:
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              End Time:
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              Exam Date:
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              Location: {/* NEW */}
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
          </div>

          <button
            onClick={handleCreateSession}
            disabled={
              !selectedClass ||
              !date ||
              !startTime ||
              !endTime ||
              !examDate ||
              !location // UPDATED
            }
          >
            Add Session
          </button>
        </div>
      )}
    </div>
  );
};

export default StudySessionMaker;
