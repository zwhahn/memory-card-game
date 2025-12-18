export function Card({ characterData = { image: "", name: "" } }) {
  return (
    <div className="card">
      {characterData.name}
      <img src={characterData.image} alt="" />
    </div>
  );
}
