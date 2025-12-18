export function Card({ characterData = { id: "", image: "", name: "" } }) {
  return (
    <div className="card">
      {characterData.name}
      <img src={characterData.image} alt="" />
    </div>
  );
}
