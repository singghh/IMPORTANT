import API from "../api/axios";
import "../styles/sweetcard.css";

export default function SweetCard({ sweet, refresh }) {
  const buy = async () => {
    try {
      await API.post(`/sweets/${sweet._id}/purchase`);
      refresh();
    } catch {
      alert("Purchase failed");
    }
  };

  return (
    <div className="sweet-card">
      <div>
        <div className="sweet-title">{sweet.name}</div>
        <div className="sweet-category">{sweet.category}</div>

        <div className="sweet-price">₹{sweet.price}</div>

        <div
          className={`sweet-stock ${
            sweet.quantity > 0 ? "in-stock" : "out-stock"
          }`}
        >
          {sweet.quantity > 0 ? `In Stock: ${sweet.quantity}` : "Out of Stock"}
        </div>
      </div>

      <button className="buy-btn" disabled={sweet.quantity === 0} onClick={buy}>
        {sweet.quantity === 0 ? "Out of Stock" : "Purchase"}
      </button>
    </div>
  );
}
