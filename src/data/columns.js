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
    color: "#f59e0b",
    bg: "#fff7ed",
  },
  {
    id: "applied",
    title: "Applied",
    icon: Send,
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    id: "interview",
    title: "Interview",
    icon: MessagesSquare,
    color: "#9333ea",
    bg: "#f5f3ff",
  },
  {
    id: "offer",
    title: "Offer",
    icon: Award,
    color: "#16a34a",
    bg: "#ecfdf5",
  },
  {
    id: "rejected",
    title: "Rejected",
    icon: XCircle,
    color: "#dc2626",
    bg: "#fef2f2",
  },
];
