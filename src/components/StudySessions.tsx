import type { StudySession } from "../interfaces";
import { doc, setDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface Props {
  selectedClass: string;
  showSessions: boolean;
  studySessionList: StudySession[];

  user: any;
}

const StudySessions = ({
  selectedClass,
  showSessions,
  studySessionList,
  user,
}: Props) => {
  const filteredList = studySessionList.filter(
    (studySession) => studySession.className === selectedClass
  );

  async function handleJoin(session: StudySession) {
    const globalSessionRef = doc(db, "sessions", session.id);
    const userSessionRef = doc(
      db,
      "users",
      user.uid,
      "joinedSessions",
      session.id
    );

    try {
      // Now update the members array
      await updateDoc(globalSessionRef, {
        members: arrayUnion(user.email),
      });

      // Add to user's joinedSessions
      await setDoc(userSessionRef, session);
    } catch (error) {
      console.error("Error joining session: ", error);
    }
  }

  const defaultMessage = "Currently empty";

  return (
    <div>
      <div>
        {showSessions && (
          <div>
            {filteredList.length === 0 ? (
              <div>No study sessions available for {selectedClass}</div>
            ) : (
              filteredList.map((studySession) => (
                <div key={studySession.id} style={{ marginBottom: "8px" }}>
                  <span>
                    {studySession.className}, {studySession.date},{" "}
                    {studySession.startTime}-{studySession.endTime}, Exam date
                    is {studySession.examDate}. Location:{" "}
                    {studySession.location}.<div>Members:</div>
                    {studySession.members.length > 0 ? (
                      studySession.members.map((member) => (
                        <div key={member}>{member}</div>
                      ))
                    ) : (
                      <div>{defaultMessage}</div>
                    )}
                  </span>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleJoin(studySession)}
                  >
                    Join
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudySessions;
