"use client";
import React from "react";
import Link from "next/link"; // Import Link from next/link
import { HoveredLink, Menu, MenuItem, ProductItem } from "../../components/ui/navbar-menu";
import { cn } from "../../components/utils";
import { useState } from "react";

function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center ">
      <Navbar className="top-4" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 ", className)}>
      <Menu setActive={setActive}>
        <Link href="/prizes">
          <MenuItem setActive={setActive} active={active} item="Prizes"></MenuItem>
        </Link>
        <Link href="/vaults">
          <MenuItem setActive={setActive} active={active} item="Vaults">
            <div className="text-sm grid grid-cols-2 gap-10 p-4"></div>
          </MenuItem>
        </Link>
        <Link href="/accounts">
          <MenuItem setActive={setActive} active={active} item="Accounts">
            <div className="flex flex-col space-y-4 text-sm"></div>
          </MenuItem>
        </Link>
      </Menu>
    </div>
  );
}

const page = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center pt-24"> {/* pt-24 adds padding for navbar */}
      <NavbarDemo />

      <div>
        <h1 className="text-white text-center text-3xl mt-6">
          Connect your <span className="font-bold text-orange-500">Wallet</span> to view{" "}
          <span className="font-bold text-orange-500">Account</span> status
        </h1>
      </div>
      <div className="text-white flex flex-row gap-x-12 mt-[100px]">
        <div className="bg-black p-14 w-[300px] h-[300px] flex flex-col border-white justify-between items-center border-2 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-700 border rounded-md">
          <button className="bg-black font-medium text-white py-2 px-4 rounded border-white border">Mina</button>
          <div className="flex flex-col items-center space-y-4 mt-2">
            <h5 className="text-xl font-medium">Grand Prize</h5>
            <div className="flex flex-col items-center space-y-1">
              <h1 className="text-4xl font-bold">$1374</h1>
              <h6 className="text-xl font-medium">~0.57WETH</h6>
            </div>
          </div>
        </div>

        <div className="bg-black p-14 w-[300px] h-[300px] flex flex-col justify-between border-4 items-center bg-gradient-to-r from-green-500 via-green-700 to-green-900 border rounded-md  ">
          <button className="bg-black font-medium text-white py-2 px-4 rounded border-white border">FLOW</button>
          <div className="flex flex-col items-center space-y-4 mt-[5px]">
            <h5 className="text-xl font-medium">Grand Prize</h5>
            <div className="flex flex-col items-center space-y-1">
              <h1 className="text-4xl font-bold">$1374</h1>
              <h6 className="text-xl font-medium">~0.57WETH</h6>
            </div>
          </div>
        </div>

        {/* New Div for Polygon */}
        <div className="bg-black p-14 w-[300px] h-[300px] flex flex-col justify-between items-center bg-gradient-to-r from-orange-700 via-orange-500 to-orange-600 border-white border-2 border rounded-md">
          <button className="bg-black font-medium text-white py-2 px-4 rounded border-white border">USDC</button>
          <div className="flex flex-col items-center space-y-4 mt-[5px]">
            <h5 className="text-xl font-medium">Grand Prize</h5>
            <div className="flex flex-col items-center space-y-1">
              <h1 className="text-4xl font-bold">$1374</h1>
              <h6 className="text-xl font-medium">~0.57WETH</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
