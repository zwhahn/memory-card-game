export function Card({
  characterData = { id: "", image: "", name: "" },
  handleClick,
}) {
  return (
    <button className="card" onClick={handleClick}>
      {characterData.name}
      <img src={characterData.image} alt="" />
    </button>
  );
}
