import { Select, MenuItem } from "@mui/material";

export default function FilterBar({ filter, setFilter }) {
  return (
    <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
      <MenuItem value="All">All</MenuItem>
      <MenuItem value="Placement">Placement</MenuItem>
      <MenuItem value="Result">Result</MenuItem>
      <MenuItem value="Event">Event</MenuItem>
    </Select>
  );
}