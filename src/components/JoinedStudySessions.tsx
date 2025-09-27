import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { StudySession } from "../interfaces";

interface Props {
  user: any;
}

const JoinedStudySessions = ({ user }: Props) => {
  const [joinedSessions, setJoinedSessions] = useState<StudySession[]>([]);

  useEffect(() => {
    if (!user?.email) return;

    const sessionsRef = collection(db, "sessions");

    // Listen for real-time updates
    const unsubscribe = onSnapshot(sessionsRef, (snapshot) => {
      const allSessions = snapshot.docs.map(
        (doc) => doc.data() as StudySession
      );
      // Filter only sessions where this user is a member
      const filtered = allSessions.filter((session) =>
        session.members?.includes(user.email)
      );
      setJoinedSessions(filtered);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLeave = async (session: StudySession) => {
    try {
      const sessionRef = doc(db, "sessions", session.id);
      await updateDoc(sessionRef, {
        members: arrayRemove(user.email),
      });
    } catch (error) {
      console.error("Error leaving session:", error);
    }
  };

  const defaultMessage = "Currently empty";

  return (
    <div>
      <div className="welcomeContainer">
        <div>Your Joined Study Sessions</div>
      </div>

      {joinedSessions.length === 0 ? (
        <div>You haven't joined any sessions yet.</div>
      ) : (
        <ul>
          {joinedSessions.map((session) => (
            <li key={session.id}>
              {session.className}, {session.date}, {session.startTime}-
              {session.endTime}, Exam date is {session.examDate}. Location:{" "}
              {session.location}.
              <div>
                Members:
                {session.members?.length > 0 ? (
                  session.members.map((member) => (
                    <div key={member}>{member}</div>
                  ))
                ) : (
                  <div>{defaultMessage}</div>
                )}
              </div>
              <button onClick={() => handleLeave(session)}>Leave</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JoinedStudySessions;
