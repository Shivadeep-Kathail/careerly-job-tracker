import {
  Star,
  Send,
  MessagesSquare,
  Award,
  XCircle,
} from "lucide-react";

export const COLUMNS = [
  {
    id: "wishlist",
    title: "Wishlist",
    icon: Star,
    color: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.12)",
  },
  {
    id: "applied",
    title: "Applied",
    icon: Send,
    color: "#2563EB",
    bg: "rgba(37, 99, 235, 0.12)",
  },
  {
    id: "interview",
    title: "Interview",
    icon: MessagesSquare,
    color: "#A855F7",
    bg: "rgba(168, 85, 247, 0.12)",
  },
  {
    id: "offer",
    title: "Offer",
    icon: Award,
    color: "#22C55E",
    bg: "rgba(34, 197, 94, 0.12)",
  },
  {
    id: "rejected",
    title: "Rejected",
    icon: XCircle,
    color: "#EF4444",
    bg: "rgba(239, 68, 68, 0.12)",
  },
];
