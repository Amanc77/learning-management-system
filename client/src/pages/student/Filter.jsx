import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  "Frontend Development",
  "Backend Development",
  "Data Structures & Algorithms",
  "Java Developer",
  "Artificial Intelligence",
  "Data Analytics",
  "Cyber Security",
  "MERN FullStack Development",
  "Mobile App Development",
  "Cloud Computing",
  "DevOps",
  "UI/UX Design",
  "Game Development",
];

const Filter = ({ selectedCategories = [], sortByPrice = "", onApply }) => {
  const [localCategories, setLocalCategories] = useState(
    selectedCategories || []
  );
  const [localSort, setLocalSort] = useState(sortByPrice || "");

  useEffect(
    () => setLocalCategories(selectedCategories || []),
    [selectedCategories]
  );
  useEffect(() => setLocalSort(sortByPrice || ""), [sortByPrice]);

  const toggleCategory = (cat) => {
    setLocalCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const apply = () => onApply?.(localCategories, localSort);
  const reset = () => {
    setLocalCategories([]);
    setLocalSort("");
    onApply?.([], "");
  };

  return (
    <aside className="w-full md:w-64 bg-gray-900 p-4 rounded-xl shadow-md border border-gray-700">
      <h2 className="font-bold text-lg mb-3 text-gray-100">Filters</h2>

      <div className="mb-4">
        <p className="text-sm text-gray-300 mb-2">Category</p>
        <div className="max-h-64 overflow-auto pr-2">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 mb-2 text-gray-200"
            >
              <input
                type="checkbox"
                checked={localCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="accent-blue-500"
              />
              <span className="text-sm">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-300 mb-2">Sort by Price</p>
        <select
          value={localSort}
          onChange={(e) => setLocalSort(e.target.value)}
          className="w-full bg-gray-800 text-gray-100 p-2 rounded-md border border-gray-600"
        >
          <option value="">None</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      <div className="flex gap-2">
        <Button onClick={apply} className="flex-1">
          Apply
        </Button>
        <Button variant="outline" onClick={reset} className="flex-1">
          Reset
        </Button>
      </div>
    </aside>
  );
};

export default Filter;
