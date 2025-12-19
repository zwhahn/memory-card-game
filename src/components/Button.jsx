export function Button({ difficulty, selected = false, onClick }) {
  const className = "difficulty-btn " + (selected ? "selected" : "");
  return (
    <button className={className} onClick={onClick}>
      {difficulty}
    </button>
  );
}
