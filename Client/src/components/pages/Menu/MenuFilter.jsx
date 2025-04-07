"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import "@/app/globals.css";

export default function MenuFilter() {
  const router = useRouter();
	const searchParams = useSearchParams();

  const filters = ["All", "Breakfast", "Main Dishes", "Drinks", "Desserts"];
  const [activeFilter, setActiveFilter] = useState(searchParams.get("category") || "All");

  useEffect(() => {
    const url = new URL(window.location.href);
    if (activeFilter === "All") {
      url.searchParams.delete("category");
    } 
		else {
      url.searchParams.set("category", activeFilter);
    }
    router.push(url.toString(), { scroll: false });
  }, [activeFilter, router]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 mt-10">
      <div className="flex flex-wrap justify-center gap-4">
        {filters.map((filter) => (
          <Button
            key={filter}
            title={filter}
            onClick={() => setActiveFilter(filter)}
            variant={activeFilter === filter ? "default" : "outline"}
            className={`
              rounded-full px-6 py-2 text-sm font-medium transition-colors
							w-28 h-12 activeButtonStyle
              ${activeFilter === filter 
                ? "bg-primary text-white" 
                : "bg-background text-muted-foreground hover:bg-muted/10"}
            `}
          >
            {filter}
          </Button>
        ))}
      </div>
    </div>
  );
}