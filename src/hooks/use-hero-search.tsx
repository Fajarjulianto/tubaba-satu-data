import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useHeroSearch() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/dataset?search=${encodeURIComponent(query)}`);
    }
  };

  return { query, setQuery, handleSearch };
}
