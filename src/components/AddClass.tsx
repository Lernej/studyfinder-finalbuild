import { useState } from "react";
import { db } from "../firebaseConfig";
import { doc, setDoc, arrayUnion } from "firebase/firestore";

interface Props {
  user: any;
}

const AddClass = ({ user }: Props) => {
  const [input, setInput] = useState("");

  const handleClick = async () => {
    if (!input) return;

    try {
      const userDocRef = doc(db, "users", user.uid);

      // Add the class to the "classes" array in Firestore
      await setDoc(userDocRef, { classes: arrayUnion(input) }, { merge: true });

      setInput(""); // clear input
    } catch (error) {
      console.error("Error adding class: ", error);
    }
  };

  return (
    <div>
      <input
        placeholder="Class"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleClick}>Add Class</button>
    </div>
  );
};

export default AddClass;
