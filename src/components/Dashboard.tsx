import { useState, useEffect } from "react";
import ClassInput from "./ClassInput";
import StudySessionMaker from "./StudySessionMaker";
import StudySessions from "./StudySessions";
import JoinedStudySessions from "./JoinedStudySessions";
import type { StudySession } from "../interfaces";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

const subjects = [
  "Honors Symposium",
  "Calc III",
  "Intro to C",
  "American History",
  "Intro to Philosophy",
];

interface Props {
  user: any;
}

const Dashboard = ({ user }: Props) => {
  const studySessionsRef = collection(db, "sessions");

  const [selectedClass, setSelectedClass] = useState<string>("");
  const [showSessions, setShowSessions] = useState(false);
  const [studySessionList, setStudySessionList] = useState<StudySession[]>([]);
  const [joinedStudySessions, setJoinedStudySessions] = useState<
    StudySession[]
  >([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(studySessionsRef, (snapshot) => {
      const sessions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<StudySession, "id">),
      }));
      setStudySessionList(sessions);
    });

    return () => unsubscribe(); // cleanup subscription on unmount
  }, []);

  return (
    <>
      <div className="welcomeContainer">
        <div className="welcomeMessage">Welcome, {user.displayName}</div>
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
        <StudySessionMaker />
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
