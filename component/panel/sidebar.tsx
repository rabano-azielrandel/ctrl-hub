import Image from "next/image";
import Button from "../ui/Button";
import { logout } from "@/app/actions/auth";
import { LogOut } from "lucide-react";

export function Sidebar() {
  return (
    <div className="flex flex-col min-w-lg max-w-lg">
      {/* Header */}
      <div className="w-full flex">
        <div className="w-20 p-2">
          <Image
            src={"/icons/admin.png"}
            alt="admin"
            width={100}
            height={100}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h3>Admin</h3>
          <p>V1.0.0</p>
        </div>
      </div>

      {/* Nav Items */}
      <div className="w-full flex flex-col border-y border-white/40"></div>

      {/* Logout */}
      <div className="w-full flex">
        <Button variant="secondary" onClick={() => logout}>
          <LogOut />
          Logout
        </Button>
      </div>
    </div>
  );
}
