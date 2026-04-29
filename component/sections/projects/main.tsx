"use client";

import { useState, useRef, useEffect } from "react";
import Button from "@/component/ui/Button";
import { ChevronDown, ChevronUp, Plus, Table2 } from "lucide-react";

const items = [
  { label: "Pages", active: true },
  { label: "Stack" },
  { label: "Tasks" },
];

export default function Main() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full flex">
      <div className="w-full h-20 flex items-center p-4 gap-4">
        {/* Left Tag */}
        <div className="w-24 flex justify-center items-center px-3 py-3 gap-2 rounded-2xl border border-[#B67DF2]">
          <div className="w-2 h-2 rounded-full bg-[#B67DF2]" />
          <p className="text-sm">Tables</p>
        </div>

        {/* Dropdown */}
        <div ref={dropdownRef} className="relative w-56">
          {/* Trigger */}
          <Button
            variant="secondary"
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between text-sm font-medium px-4 py-3 
                rounded-2xl border border-violet-800/60 bg-[#10091d] text-violet-100 shadow-xl hover:bg-white/5 transition"
          >
            <span>Pages</span>
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>

          {/* Menu */}
          <div
            className={`absolute left-0 top-[110%] z-50 w-full rounded-2xl border border-violet-800/60 bg-[#10091d] text-violet-100 shadow-2xl overflow-hidden transition-all duration-200 origin-top ${
              open
                ? "scale-y-100 opacity-100 visible"
                : "scale-y-95 opacity-0 invisible"
            }`}
          >
            {/* Search */}
            <div className="p-3">
              <input
                placeholder="Find table..."
                className="w-full rounded-xl border border-yellow-500/20 bg-[#2b2b2b] px-4 py-2 text-sm text-zinc-200 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            {/* Items */}
            <div className="px-2 pb-2 space-y-1">
              {items.map((item) => (
                <Button
                  key={item.label}
                  variant="secondary"
                  className={`w-full flex justify-start items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                    item.active
                      ? "bg-violet-900/60 text-violet-200"
                      : "text-violet-300 hover:bg-white/5"
                  }`}
                >
                  <Table2 size={15} />
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-violet-900/60 p-2">
              <button className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-violet-300 hover:bg-white/5 transition">
                <Plus size={15} />
                <span>New table</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
