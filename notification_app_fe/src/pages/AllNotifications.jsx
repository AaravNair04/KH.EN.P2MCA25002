import { useEffect, useState } from "react";
import api from "../services/api";
import NotificationCard from "../components/NotificationCard";
import FilterBar from "../components/FilterBar";
import { sortNotifications } from "../utils/sort";
import { Box } from "@mui/material";

export default function AllNotifications() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [readIds, setReadIds] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/");
        setData(res.data.notifications);
      } catch (err) {
        console.error(err);
      }
    }

    const stored = JSON.parse(localStorage.getItem("read") || "[]");
    setReadIds(stored);

    fetchData();
  }, []);

  function markAsRead(id) {
    if (!readIds.includes(id)) {
      const updated = [...readIds, id];
      setReadIds(updated);
      localStorage.setItem("read", JSON.stringify(updated));
    }
  }

  const filtered =
    filter === "All"
      ? data
      : data.filter((n) => n.Type === filter);

  const sorted = sortNotifications(filtered);

  return (
    <Box
    sx={{
      minHeight: "100vh",
      backgroundColor: "#ffffff",
      padding: 4,
    }}
  >
    <div>
      <h2>All Notifications</h2>

      <FilterBar filter={filter} setFilter={setFilter} />

      {sorted.map((n) => (
        <NotificationCard
          key={n.ID}
          item={n}
          isRead={readIds.includes(n.ID)}
          onClick={() => markAsRead(n.ID)}
        />
      ))}
    </div>
    </Box>
  );
}