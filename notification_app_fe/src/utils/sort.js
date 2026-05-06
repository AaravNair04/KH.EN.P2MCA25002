export function sortNotifications(data) {
  const typeWeights = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  return data
    .slice()
    .sort((a, b) => {
      const timeA = new Date(a.Timestamp).getTime();
      const timeB = new Date(b.Timestamp).getTime();

      if (timeB !== timeA) return timeB - timeA;

      return (typeWeights[b.Type] || 0) - (typeWeights[a.Type] || 0);
    });
}