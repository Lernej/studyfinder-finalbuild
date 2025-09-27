import type { StudySession } from "../interfaces";

interface Props {
  selectedClass: string;
  showSessions: boolean;
  studySessionList: StudySession[];
  setJoinedStudySessions: (
    joinedStudySessions:
      | StudySession[]
      | ((prev: StudySession[]) => StudySession[])
  ) => void;
}

const StudySessions = ({
  selectedClass,
  showSessions,
  studySessionList,
  setJoinedStudySessions,
}: Props) => {
  const filteredList = studySessionList.filter(
    (studySession) => studySession.className === selectedClass
  );

  function handleJoin(studySession: StudySession) {
    setJoinedStudySessions((prev) => {
      // prevent duplicate joins
      if (prev.find((s) => s.id === studySession.id)) return prev;
      return [...prev, studySession];
    });
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
