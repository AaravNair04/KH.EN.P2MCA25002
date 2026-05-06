import { Card, CardContent, Typography } from "@mui/material";

export default function NotificationCard({ item, isRead, onClick }) {
  return (
    <Card
      onClick={onClick}
      sx={{
        mt: 2,
        cursor: "pointer",
        backgroundColor: isRead ? "#111827" : "#1c3b6e",
      color: "#e2e8f0",
      }}
    >
      <CardContent>
        <Typography variant="h6">{item.Type}</Typography>
        <Typography>{item.Message}</Typography>
        <Typography variant="caption">{item.Timestamp}</Typography>
      </CardContent>
    </Card>
  );
}