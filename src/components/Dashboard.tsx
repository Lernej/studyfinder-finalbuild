import { useState } from "react";
import ClassInput from "./ClassInput";
import StudySessionMaker from "./StudySessionMaker";
import StudySessions from "./StudySessions";
import JoinedStudySessions from "./JoinedStudySessions";
import type { StudySession } from "../interfaces";

const sampleStudySessionsList: StudySession[] = [
  {
    id: 0,
    className: "Honors Symposium",
    date: "9/12/25",
    startTime: "9:00am",
    endTime: "10:00am",
    examDate: "9/28/25",
  },
  {
    id: 1,
    className: "Calc III",
    date: "9/12/25",
    startTime: "10:00am",
    endTime: "11:00am",
    examDate: "9/28/25",
  },
  {
    id: 2,
    className: "Intro to C",
    date: "9/13/25",
    startTime: "10:00am",
    endTime: "11:00am",
    examDate: "9/26/25",
  },
  {
    id: 3,
    className: "American History",
    date: "9/13/25",
    startTime: "2:00pm",
    endTime: "3:00pm",
    examDate: "10/1/25",
  },
  {
    id: 4,
    className: "Intro to Philosophy",
    date: "9/14/25",
    startTime: "1:00pm",
    endTime: "2:00pm",
    examDate: "10/3/25",
  },
  {
    id: 5,
    className: "Calc III",
    date: "9/14/25",
    startTime: "10:00am",
    endTime: "11:00am",
    examDate: "9/28/25",
  },
  {
    id: 6,
    className: "Honors Symposium",
    date: "9/15/25",
    startTime: "9:00am",
    endTime: "10:00am",
    examDate: "9/28/25",
  },
  {
    id: 7,
    className: "Intro to C",
    date: "9/15/25",
    startTime: "11:00am",
    endTime: "12:00pm",
    examDate: "9/26/25",
  },
  {
    id: 8,
    className: "American History",
    date: "9/16/25",
    startTime: "2:00pm",
    endTime: "3:00pm",
    examDate: "10/1/25",
  },
  {
    id: 9,
    className: "Intro to Philosophy",
    date: "9/16/25",
    startTime: "1:00pm",
    endTime: "2:00pm",
    examDate: "10/3/25",
  },
  {
    id: 10,
    className: "Calc III",
    date: "9/17/25",
    startTime: "10:00am",
    endTime: "11:00am",
    examDate: "9/28/25",
  },
  {
    id: 11,
    className: "Honors Symposium",
    date: "9/17/25",
    startTime: "9:00am",
    endTime: "10:00am",
    examDate: "9/28/25",
  },
  {
    id: 12,
    className: "Intro to C",
    date: "9/18/25",
    startTime: "11:00am",
    endTime: "12:00pm",
    examDate: "9/26/25",
  },
  {
    id: 13,
    className: "American History",
    date: "9/18/25",
    startTime: "2:00pm",
    endTime: "3:00pm",
    examDate: "10/1/25",
  },
  {
    id: 14,
    className: "Intro to Philosophy",
    date: "9/19/25",
    startTime: "1:00pm",
    endTime: "2:00pm",
    examDate: "10/3/25",
  },
];

const subjects = [
  "Honors Symposium",
  "Calc III",
  "Intro to C",
  "American History",
  "Intro to Philosophy",
];

const Dashboard = () => {
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [showSessions, setShowSessions] = useState(false);
  const [studySessionList, setStudySessionList] = useState<StudySession[]>(
    sampleStudySessionsList
  );
  const [joinedStudySessions, setJoinedStudySessions] = useState<
    StudySession[]
  >([]);

  return (
    <>
      <div className="welcomeContainer">
        <div className="welcomeMessage">Welcome, Noah!</div>
      </div>

      <div className="welcomeContainer">
        <div className="subjectInputContainer">
          <div>Please select a class you'd like to study for.</div>
          <div className="welcomeContainer">
            <ClassInput
              subjects={subjects}
              setSelectedClass={setSelectedClass}
              setShowSessions={setShowSessions}
            />
          </div>
        </div>
      </div>
      <div className="welcomeContainer">
        <StudySessionMaker
          studySessionList={studySessionList}
          setStudySessionList={setStudySessionList}
        />
      </div>
      <div className="welcomeContainer">
        {showSessions && (
          <div className="sessionList">
            <StudySessions
              selectedClass={selectedClass}
              showSessions={showSessions}
              studySessionList={studySessionList}
              setJoinedStudySessions={setJoinedStudySessions}
            />
          </div>
        )}
      </div>

      <div className="welcomeContainer">
        {" "}
        <JoinedStudySessions
          joinedStudySessions={joinedStudySessions}
          setJoinedStudySessions={setJoinedStudySessions}
        />
      </div>
    </>
  );
};

export default Dashboard;
