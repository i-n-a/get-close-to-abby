export const fallbackUsers = [
  {
    id: "support-agent",
    data: { name: "John (Support Agent)", custom: { initials: "SA", avatar: "#9fa7df" } },
  },
  {
    id: "supported-user",
    data: { name: "Mary Watson", custom: { initials: "MW", avatar: "#ffab91" } },
  },
];

export function getRandomFallbackUser() {
  const users = [...fallbackUsers];
  return Math.random() < 0.5 ? users[0] : users.reverse()[0];
}
