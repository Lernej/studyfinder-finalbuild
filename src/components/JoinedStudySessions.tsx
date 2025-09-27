import type { StudySession } from "../interfaces";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface Props {
  joinedStudySessions: StudySession[];
  setJoinedStudySessions: (joinedStudySessions: StudySession[]) => void;
  user: any;
}

const JoinedStudySessions = ({
  joinedStudySessions,
  setJoinedStudySessions,
  user,
}: Props) => {
  async function handleLeave(session: StudySession) {
    try {
      const sessionRef = doc(
        collection(db, "users", user.uid, "joinedSessions"),
        session.id
      );
      await deleteDoc(sessionRef);
    } catch (error) {
      console.error("Error leaving session: ", error);
    }
  }

  return (
    <div>
      <div className="welcomeContainer">
        {" "}
        <div>Your Joined Study Sessions</div>
      </div>

      {joinedStudySessions.length === 0 ? (
        <div>You haven't joined any sessions yet.</div>
      ) : (
        <ul>
          {joinedStudySessions.map((session) => (
            <li key={session.id}>
              {session.className}, {session.date}, {session.startTime}-
              {session.endTime}, Exam date is {session.examDate}
              <button onClick={() => handleLeave(session)}>Leave</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JoinedStudySessions;
