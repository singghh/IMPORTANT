import { useEffect, useState } from "react";
import API from "../api/axios";
import SweetCard from "../components/SweetCard";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);

  const [totalPages, setTotalPages] = useState(1); // ✅ ADD THIS

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);
  const limit = 5;

  const fetchSweets = async () => {
    const params = new URLSearchParams();

    if (name) params.append("name", name);
    if (category) params.append("category", category);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (sort) params.append("sort", sort);

    params.append("page", page);
    params.append("limit", limit);

    const res = await API.get(`/sweets/search?${params.toString()}`);

    // ✅ IMPORTANT FIX
    setSweets(res.data.data); // array
    setTotalPages(res.data.totalPages); // number
  };

  useEffect(() => {
    const timer = setTimeout(fetchSweets, 500);
    return () => clearTimeout(timer);
  }, [name, category, minPrice, maxPrice, sort, page]);

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard-title">🍩 Explore Sweets</div>

        {/* Filters */}
        <div className="filter-card">
          <input
            placeholder="Search name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Indian">Indian</option>
            <option value="Chocolate">Chocolate</option>
            <option value="Bakery">Bakery</option>
          </select>
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
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort</option>
            <option value="price_asc">Price ↑</option>
            <option value="price_desc">Price ↓</option>
          </select>
        </div>

        {/* Sweets */}
        {sweets.length === 0 && <p>No sweets found</p>}

        <div className="sweets-grid">
          {sweets.map((s) => (
            <SweetCard key={s._id} sweet={s} refresh={fetchSweets} />
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
