import type { StudySession } from "../interfaces";
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface Props {
  selectedClass: string;
  showSessions: boolean;
  studySessionList: StudySession[];
  setJoinedStudySessions: (
    joinedStudySessions:
      | StudySession[]
      | ((prev: StudySession[]) => StudySession[])
  ) => void;
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
    const sessionRef = doc(
      collection(db, "users", user.uid, "joinedSessions"),
      session.id
    );

    try {
      await setDoc(sessionRef, session);
    } catch (error) {
      console.error("Error joining session: ", error);
    }
  }

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
                    is {studySession.examDate}
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
