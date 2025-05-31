"use client";
import SidebarUI from "@/components/Sidebar";

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className="dashboard-layout">
            {/* Columna izquierda (10vh) */}
            <div className="dashboard-sidebar">
                <SidebarUI/>
            </div>

            {/* Columna derecha (espacio restante) */}
            <div className="dashboard-main">
                {children}
            </div>
        </div>
   );
}
