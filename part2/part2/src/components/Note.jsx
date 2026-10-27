const Note = ({ note, toggleImportance }) => {
  let labelImportance = note.important ? "make not important" : "make important"

  return <li>
    <p>
      {note.content}
    </p>
    <button onClick={toggleImportance}>{labelImportance}</button>
  </li>
}

export default Note