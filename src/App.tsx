import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify, AuthModeStrategyType, DataStore } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { CreateNoteInput } from "./API";
import "./App.css";
import awsmobile from "./aws-exports";
import { Note } from "./models";

Amplify.configure({
  ...awsmobile,
  DataStore: { authModeStrategyType: AuthModeStrategyType.MULTI_AUTH },
});

function AddNote({ addNote }: { addNote: (note: CreateNoteInput) => void }) {
  const [note, setNote] = useState<CreateNoteInput>({ text: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote({ text: event.target.value });
  };

  const handleClick = () => {
    addNote(note);
    setNote({ text: "" });
  };

  return (
    <div style={styles.form}>
      <input
        value={note.text}
        onChange={handleChange}
        placeholder="New Note"
        style={styles.input}
      />
      <button onClick={handleClick} style={styles.addButton}>
        Add Note
      </button>
    </div>
  );
}

function NoteItem({
  note,
  deleteNote,
}: {
  note: Note | null;
  deleteNote: (note: Note) => void;
}) {
  return (
    <div>
      {note ? (
        <div key={note.id} style={styles.note}>
          <p>{note.text}</p>
          <button
            onClick={() => {
              deleteNote(note);
            }}
            style={styles.deleteButton}
          >
            x
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function init() {
      const result = await DataStore.query(Note);
      setNotes(result);
    }
    init();
  }, []);

  const handleDeleteNote = async (note: Note) => {
    const toDelete = await DataStore.query(Note, note.id);
    if (toDelete) {
      const result = await DataStore.delete(toDelete);
      setNotes(notes.filter((item) => item?.id !== result.id));
    }
  };

  const addNote = async (note: CreateNoteInput) => {
    const result = await DataStore.save(new Note(note));
    if (result) {
      setNotes([...notes, result]);
    }
  };

  console.log("notes", notes);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="App">
          <div style={styles.container}>
            <h1>Notes App</h1>
            <AddNote addNote={addNote} />
            <section id="notes">
              {notes.map((note) => (
                <NoteItem
                  note={note}
                  key={note.id}
                  deleteNote={handleDeleteNote}
                ></NoteItem>
              ))}
            </section>
          </div>
          <button onClick={signOut}>Sign Out</button>
        </div>
      )}
    </Authenticator>
  );
}

const styles = {
  container: { width: 480, margin: "0 auto", padding: 20 },
  form: { display: "flex", marginBottom: 15 },
  input: {
    flexGrow: 2,
    border: "none",
    backgroundColor: "#ddd",
    padding: 12,
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "black",
    color: "white",
    outline: "none",
    padding: 12,
    fontSize: 18,
  },
  note: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 22,
    marginBottom: 15,
  },
  deleteButton: { fontSize: 18, fontWeight: "bold" },
};
