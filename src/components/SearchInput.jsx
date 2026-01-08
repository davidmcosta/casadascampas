'use client';
import { Search } from "lucide-react";

export default function SearchInput({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative w-full lg:w-80">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        placeholder="Pesquisar artigos..." // or switch using `navigator.language`
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-blackVar placeholder-blackVar focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
      />
    </div>
  );
}
