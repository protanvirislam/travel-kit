import "../index.css";

export default function Banner() {
  return (
    <div className="banner">
      <div className="col-50 banner-image">
        <img src="assets/images/banner.png" alt="banner" />
      </div>

      <div className="col-50 text-content">
        <h1>Travel Kits</h1>
        <h2> 👜 Make Ready Your Backpack ⋆｡˚ ✈︎ ✈️ ⋆</h2>
      </div>
    </div>
  );
}
