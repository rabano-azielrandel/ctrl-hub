"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Plus, Table2 } from "lucide-react";
import { projectDropDownItems } from "@/lib/data/projects";
import { mapToTableFormat } from "@/lib/mappers/projectMappers";
import { FieldDefinition } from "@/types/TableFields";
import Button from "@/component/ui/Button";
import DataTable from "@/component/ui/DataTable";
import NewTableModal from "@/component/forms/CreateTableForm";

interface Props {
  getProjectsRows: () => Promise<Record<string, any>[]>;
  getProjectsCardRows: () => Promise<Record<string, any>[]>;
  createTable: (
    tableName: string,
    fields: FieldDefinition[],
  ) => Promise<{ success: true } | { success: false; error: string }>;
}
export default function Main({
  getProjectsRows,
  getProjectsCardRows,
  createTable,
}: Props) {
  // DropDown State
  const [open, setOpen] = useState(false);
  const [activeDropDown, setActiveDropDown] = useState(
    projectDropDownItems[1].label,
  );
  const [columns, setColumns] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Modal State
  const [modalState, setModalState] = useState(false);

  // load initial data on mount
  useEffect(() => {
    handleChange(projectDropDownItems[0].label);
  }, []);

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

  const handleChange = async (activeLabel: string) => {
    if (activeLabel === activeDropDown && columns.length > 0) return; // already active

    // await the correct action
    const raw = await (activeLabel === "Projects"
      ? getProjectsRows()
      : getProjectsCardRows());

    const { columns: newColumns, rows: newRows } = mapToTableFormat(raw);

    setColumns(newColumns);
    setRows(newRows);
    setActiveDropDown(activeLabel);
    setOpen(false);
  };

  return (
    <div className="relative w-full flex flex-col items-center gap-2 bg-[#140C2A]">
      <div className="w-full h-20 flex justify-between items-center p-4">
        {/* Tag and Dropdown */}
        <div className="flex gap-4">
          {/* Left Tag */}
          <div className="w-24 flex justify-center items-center px-3 py-3 gap-2 rounded-2xl border border-[#B67DF2]">
            <div className="w-2 h-2 rounded-full bg-[#B67DF2]" />
            <p className="text-sm">Projects</p>
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
              <span>Tables</span>
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
                {projectDropDownItems.map((item) => (
                  <Button
                    key={item.label}
                    variant="secondary"
                    onClick={() => handleChange(item.label)}
                    className={`w-full flex justify-start items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                      activeDropDown == item.label
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
                <Button
                  onClick={() => setModalState((prev) => !prev)}
                  className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-violet-300 hover:bg-white/5 transition"
                >
                  <Plus size={15} />
                  <span>New table</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Add Row */}
        <div className="w-60 flex justify-center items-center px-10 rounded-2xl">
          <Button
            variant="secondary"
            className="flex gap-2 py-2.5 border border-violet-800/60 bg-[#10091d]"
          >
            <Plus size={16} />
            <p className="text-sm font-semibold">Add new row</p>
          </Button>
        </div>
      </div>
      <div className="p-4 max-w-[1480px]">
        <DataTable title={activeDropDown} columns={columns} rows={rows} />
      </div>

      {modalState && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-900/80 z-2">
          <div className="max-h-170 flex flex-col items-center gap-4 px-4 py-8 rounded-xl bg-[#10091D] overflow-y-hidden">
            <div className="w-full flex justify-end">
              <Button
                onClick={() => setModalState((prev) => !prev)}
                variant="secondary"
                size="sm"
                className="w-10 rounded-full border border-white"
              >
                X
              </Button>
            </div>
            <NewTableModal createTable={createTable} />
          </div>
        </div>
      )}
    </div>
  );
}
