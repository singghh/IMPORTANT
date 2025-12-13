import { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/admin.css";

export default function AdminDashboard() {
  const [sweets, setSweets] = useState([]);

  // Form
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [editId, setEditId] = useState(null);

  // Search filters
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Fetch sweets
  const fetchSweets = async () => {
    const params = new URLSearchParams();

    if (searchName) params.append("name", searchName);
    if (searchCategory) params.append("category", searchCategory);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);

    const res = await API.get(`/sweets/search?${params.toString()}`);

    setSweets(res.data.data); // ✅ IMPORTANT FIX
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  // Auto search
  useEffect(() => {
    const timer = setTimeout(fetchSweets, 400);
    return () => clearTimeout(timer);
  }, [searchName, searchCategory, minPrice, maxPrice]);

  // ADD or UPDATE
  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
    };

    if (editId) {
      await API.put(`/sweets/${editId}`, payload);
      setEditId(null);
    } else {
      await API.post("/sweets", payload);
    }

    setForm({ name: "", category: "", price: "", quantity: "" });
    fetchSweets();
  };

  // Edit
  const editSweet = (sweet) => {
    setEditId(sweet._id);
    setForm({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
    });
  };

  // Delete
  const deleteSweet = async (id) => {
    await API.delete(`/sweets/${id}`);
    fetchSweets();
  };

  return (
    <div className="admin-container">
      <div className="admin-title">🛠 Admin Panel</div>

      <div className="admin-layout">
        {/* FORM */}
        <form className="admin-form" onSubmit={submit}>
          <h3>{editId ? "Update Sweet" : "Add Sweet"}</h3>

          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />

          <button>{editId ? "Update Sweet" : "Add Sweet"}</button>
        </form>

        {/* LIST + SEARCH */}
        <div>
          <div className="admin-filters">
            <input
              placeholder="Search name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <input
              placeholder="Category"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
            />
            <input
              type="number"
              placeholder="Min ₹"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max ₹"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          {sweets.map((s) => (
            <div key={s._id} className="admin-sweet-card">
              <div>
                <h4>{s.name}</h4>
                <p>
                  {s.category} | ₹{s.price} | Qty: {s.quantity}
                </p>
              </div>

              <div className="admin-actions">
                <button className="edit-btn" onClick={() => editSweet(s)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteSweet(s._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
