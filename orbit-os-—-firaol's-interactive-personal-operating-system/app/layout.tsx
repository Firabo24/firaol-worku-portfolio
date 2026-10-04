import React from 'react';
import './globals.css';

export const metadata = {
  title: "ORBIT OS — Firaol's Interactive Personal Operating System",
  description: "An interactive personal operating system and technical portfolio featuring a central orbital core, live nodes, HUD telemetry, and archival window applications."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#05070c] text-zinc-100 overflow-hidden antialiased select-none">
        {children}
      </body>
    </html>
  );
}
