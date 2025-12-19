export function Card({
  characterData = { id: "", image: "", name: "" },
  handleClick,
  repeatCardID = "",
}) {
  console.log("repeatCardID: ", repeatCardID);
  return (
    <button
      className={"card " + (repeatCardID === characterData.id ? "repeat" : "")}
      onClick={handleClick}
    >
      <img src={characterData.image} alt="" />
      <div className="char-name">{characterData.name}</div>
    </button>
  );
}
