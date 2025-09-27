import type { StudySession } from "../interfaces";

interface Props {
  joinedStudySessions: StudySession[];
  setJoinedStudySessions: (joinedStudySessions: StudySession[]) => void;
}

const JoinedStudySessions = ({
  joinedStudySessions,
  setJoinedStudySessions,
}: Props) => {
  function handleLeave(sessionId: string) {
    setJoinedStudySessions(
      joinedStudySessions.filter((session) => session.id !== sessionId)
    );
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
              <button onClick={() => handleLeave(session.id)}>Leave</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JoinedStudySessions;
