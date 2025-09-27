import { useState } from "react";
import type { StudySession } from "../interfaces";
import { db } from "../firebaseConfig";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

const subjects = [
  "Honors Symposium",
  "Calc III",
  "Intro to C",
  "American History",
  "Intro to Philosophy",
];

const StudySessionMaker = () => {
  const [showWindow, setShowWindow] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [examDate, setExamDate] = useState("");

  function handleFirstClick() {
    setShowWindow(!showWindow);
  }

  // Convert 24h time to 12h format with am/pm
  function formatTime(time24: string) {
    if (!time24) return "";
    const [hourStr, minute] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "pm" : "am";
    hour = hour % 12 || 12;
    return `${hour}:${minute}${ampm}`;
  }

  // Format date from "YYYY-MM-DD" to "M/D/YY" without timezone issues
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
      members: [],
    };

    try {
      // Add to Firestore
      await setDoc(newSessionRef, newSession);

      // Reset form
      setSelectedClass("");
      setDate("");
      setStartTime("");
      setEndTime("");
      setExamDate("");
      setShowWindow(false);
    } catch (error) {
      console.error("Error adding session: ", error);
    }

    // reset form
    setSelectedClass("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setExamDate("");
    setShowWindow(false);
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

          <button
            onClick={handleCreateSession}
            disabled={
              !selectedClass || !date || !startTime || !endTime || !examDate
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
