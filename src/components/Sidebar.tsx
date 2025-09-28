import { useState } from "react";
import type { StudySession } from "../interfaces";

interface Props {
  studySessionList: StudySession[];
}

const Sidebar = ({ studySessionList }: Props) => {
  const [showList, setShowList] = useState(false);

  const defaultMessage = "Currently Empty";
  return (
    <>
      <div className="sidebar">
        <div onClick={() => setShowList(!showList)}>
          {showList ? (
            <div>Hide All Sessions</div>
          ) : (
            <div>Show All Sessions</div>
          )}
        </div>
      </div>

      {showList && (
        <div className="completeList">
          {showList &&
            (studySessionList.length !== 0 ? (
              studySessionList.map((studySession) => (
                <div key={studySession.id}>
                  {studySession.className}, {studySession.date},{" "}
                  {studySession.startTime}-{studySession.endTime}, Exam date is{" "}
                  {studySession.examDate}. Location: {studySession.location}.
                  <div>Members:</div>
                  {studySession.members.length > 0 ? (
                    studySession.members.map((member) => (
                      <div key={member}>{member}</div>
                    ))
                  ) : (
                    <div>{defaultMessage}</div>
                  )}
                </div>
              ))
            ) : (
              <div>No study sessions are posted!</div>
            ))}
        </div>
      )}
    </>
  );
};

export default Sidebar;
