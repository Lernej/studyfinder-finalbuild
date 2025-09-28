import { useState, useEffect } from "react";
import ClassInput from "./ClassInput";
import StudySessionMaker from "./StudySessionMaker";
import StudySessions from "./StudySessions";
import JoinedStudySessions from "./JoinedStudySessions";
import type { StudySession } from "../interfaces";
import { collection, onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import AddClass from "./AddClass";
import Sidebar from "./Sidebar";

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

  console.log(joinedStudySessions);
  const [subjects, setSubjects] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;

    const userDocRef = doc(db, "users", user.uid);

    // Subscribe to live updates
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSubjects(data.classes || []); // fallback to empty array
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [user]);

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

  useEffect(() => {
    const joinedSessionsRef = collection(
      db,
      "users",
      user.uid,
      "joinedSessions"
    );

    const unsubscribe = onSnapshot(joinedSessionsRef, (snapshot) => {
      const sessions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as StudySession[];
      setJoinedStudySessions(sessions);

      return unsubscribe();
    });
  });

  return (
    <div className="dashboard">
      <div className="welcomeContainer header">
        <div className="innerHeader">
          <div className="welcomeMessage">Welcome, {user.displayName}! 🎓</div>
        </div>
      </div>
      <div className="welcomeContainer addClassContainer">
        <AddClass user={user} />
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
        <StudySessionMaker subjects={subjects} />
      </div>
      <div className="welcomeContainer">
        {showSessions && (
          <div className="sessionList">
            {user && (
              <StudySessions
                selectedClass={selectedClass}
                showSessions={showSessions}
                studySessionList={studySessionList}
                user={user}
              />
            )}
          </div>
        )}
      </div>
      <div className="welcomeContainer">
        {user && <JoinedStudySessions user={user} />}
      </div>
      <Sidebar studySessionList={studySessionList} />
    </div>
  );
};

export default Dashboard;
