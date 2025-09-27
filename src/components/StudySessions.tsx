import type { StudySession } from "../interfaces";

interface Props {
  selectedClass: string;
  showSessions: boolean;
  studySessionList: StudySession[];
}

const StudySessions = ({
  selectedClass,
  showSessions,
  studySessionList,
}: Props) => {
  const filteredList = studySessionList.filter(
    (studySession) => studySession.className === selectedClass
  );

  return (
    <div>
      <div>
        {showSessions && (
          <div>
            {filteredList.length === 0 ? (
              <div>No study sessions available for {selectedClass}</div>
            ) : (
              filteredList.map((studySession) => (
                <div key={studySession.id}>
                  <div>
                    {studySession.className}, {studySession.date},{" "}
                    {studySession.startTime}-{studySession.endTime}, Exam date
                    is {studySession.examDate}
                  </div>
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
