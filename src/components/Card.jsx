export function Card({
  characterData = { id: "", image: "", name: "" },
  handleClick,
  repeatCardID = "",
}) {
  return (
    <button
      className={"card " + (repeatCardID === characterData.id ? "repeat" : "")}
      onClick={handleClick}
    >
      {characterData.name}
      <img src={characterData.image} alt="" />
    </button>
  );
}
