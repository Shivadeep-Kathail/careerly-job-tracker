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
    color: "#b45309",
    bg: "#ffedd5",
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
    color: "#9333EA",
    bg: "#F3E8FF",
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
    bg: "#fee2e2",
  },
];
