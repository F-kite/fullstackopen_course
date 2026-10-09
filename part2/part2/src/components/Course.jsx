const Course = ({ course }) => {
    let initValue = 0
    const totalExercises = course.parts.reduce((acc, curV) => acc + curV.exercises, initValue,);
    return (
        <div>
            <h2>{course.name}</h2>
            {course.parts.map(part =>
                <p key={part.id}>{part.name} {part.exercises}</p>
            )}
            <b>total of {totalExercises} exercises</b>
        </div>
    )
}

export default Course