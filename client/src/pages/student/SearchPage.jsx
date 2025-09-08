import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  Filter as FilterIcon,
  Search as SearchIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CourseCard from "./CourseCard";

const CATEGORIES = [
  "Frontend Development",
  "Backend Development",
  "Data Structures & Algorithms",
  "Java Developer",
  "Artificial Intelligence",
  "Data Analytics",
  "Cyber Security",
  "MERN FullStack Development",
];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  const initCategory = searchParams.get("category") || "";
  const initPrice = searchParams.get("maxPrice") || "";

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [category, setCategory] = useState(initCategory);
  const [maxPrice, setMaxPrice] = useState(initPrice);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch courses
  useEffect(() => {
    const q = searchParams.get("query") || "";
    const cat = searchParams.get("category") || "";
    const price = searchParams.get("maxPrice") || "";

    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        setError("");

        const params = {};
        if (q) params.query = q;
        if (cat) params.categories = JSON.stringify([cat]);
        if (price) params.maxPrice = price;

        const res = await axiosInstance.get(
          Object.keys(params).length > 0
            ? "/course/search"
            : "/course/publishedCourses",
          { params }
        );

        setCourses(res.data.courses || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to fetch courses");
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [searchParams]);

  const onSubmitSearch = (e) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set("query", searchTerm);
    if (category) params.set("category", category);
    if (maxPrice) params.set("maxPrice", maxPrice);
    setSearchParams(params, { replace: true });
  };

  const clearAll = () => {
    setSearchTerm("");
    setCategory("");
    setMaxPrice("");
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const isEmpty = !isLoading && !error && courses.length === 0;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold">
              Search Results
              {searchParams.get("query") && (
                <span className="text-blue-400">
                  "{searchParams.get("query")}"
                </span>
              )}
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              {isLoading ? "Searching..." : `${courses.length} course(s) found`}
            </p>
          </div>

          <form
            onSubmit={onSubmitSearch}
            className="flex gap-2 w-full lg:w-[640px]"
          >
            <div className="flex items-center flex-1 bg-gray-900 border border-gray-800 rounded-md overflow-hidden">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search courses..."
                className="w-full px-4 py-3 bg-transparent placeholder:text-gray-500 text-gray-100 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 transition flex items-center gap-2"
              >
                <SearchIcon size={16} /> Search
              </button>
            </div>

            {/* Mobile Filter */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="bg-gray-900 border border-gray-800 px-3 py-2">
                    <FilterIcon />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="bg-gray-900 text-gray-100 border-l border-gray-800"
                >
                  <SheetHeader>
                    <SheetTitle>Filter</SheetTitle>
                  </SheetHeader>
                  <FilterSection
                    category={category}
                    setCategory={setCategory}
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                    onSubmitSearch={onSubmitSearch}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </form>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          {(category || maxPrice) && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAll}
              className="bg-red-500 hover:bg-red-600 border-gray-700 text-gray-300"
            >
              Clear all
            </Button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filter */}
          <div className="hidden md:block w-72 flex-shrink-0">
            <Card className="bg-gray-900 border border-gray-800 sticky top-24 shadow-md p-4">
              <FilterSection
                category={category}
                setCategory={setCategory}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                onSubmitSearch={onSubmitSearch}
              />
            </Card>
          </div>

          {/* Course Results */}
          <div className="flex-1">
            {error && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-200 flex items-center gap-3">
                <AlertCircle />
                <span>{error}</span>
              </div>
            )}

            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <CourseSkeleton key={idx} />
                ))}
              </div>
            ) : isEmpty ? (
              <CourseNotFound />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

//filters
const FilterSection = ({
  category,
  setCategory,
  maxPrice,
  setMaxPrice,
  onSubmitSearch,
}) => (
  <div className="flex flex-col gap-4">
    <div>
      <label className="text-sm text-gray-300 mb-2 block">Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full bg-gray-900 border border-gray-800 px-3 py-2 rounded-md text-gray-100"
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="text-sm text-gray-300 mb-2 block">Max Price</label>
      <input
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="Enter max price"
        className="w-full bg-gray-900 border border-gray-800 px-3 py-2 rounded-md text-gray-100"
      />
    </div>

    <Button
      onClick={onSubmitSearch}
      className="w-full bg-blue-600 hover:bg-blue-500"
    >
      Apply
    </Button>
  </div>
);

const CourseNotFound = () => (
  <div className="flex flex-col items-center justify-center text-center py-16 bg-gray-900 border border-gray-800 rounded-lg shadow-md">
    <AlertCircle className="text-red-500 h-12 w-12 mb-4" />
    <h1 className="font-bold text-2xl text-gray-100 mb-2">Course Not Found</h1>
    <p className="text-gray-400 mb-6">
      Sorry, we couldn’t find any courses for your search.
    </p>
    <Button
      variant="outline"
      className=" bg-gray-700 hover:bg-gray-600 border-gray-700 text-gray-300 "
    >
      Browse All Courses
    </Button>
  </div>
);

const CourseSkeleton = () => (
  <Card className="bg-gray-900 border border-gray-800">
    <div className="p-4 flex flex-col gap-4">
      <Skeleton className="h-32 w-full rounded bg-gray-800" />
      <Skeleton className="h-6 w-2/3 bg-gray-800" />
      <Skeleton className="h-4 w-1/2 bg-gray-800" />
      <Skeleton className="h-6 w-20 bg-gray-800" />
    </div>
  </Card>
);
