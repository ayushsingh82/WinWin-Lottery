"use client";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../../components/ui/navbar-menu";
import { cn } from "../../components/utils";
import { useState } from "react";
import Link from "next/link"; // Import Link from next/link

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
    <div className={cn("fixed top-0 inset-x-0 max-w-2xl mx-auto z-50 ", className)}>
      <Menu setActive={setActive}>
      <Link href='/prizes'>
        <MenuItem setActive={setActive} active={active} item="Prizes">
          {/* Content for Prizes menu item */}
        </MenuItem>
        </Link>
        <Link href="/vaults">
          <MenuItem  setActive={setActive} active={active} item="Vaults">
            <div className="text-sm grid grid-cols-2 gap-10 p-4">
              {/* Vault items */}
            </div>
          </MenuItem>
        </Link>
        <Link href='/accounts'>
        <MenuItem setActive={setActive} active={active} item="Accounts">
          {/* Content for Accounts menu item */}
        </MenuItem>
        </Link>
      </Menu>
    </div>
  );
}

const Page = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center pt-24"> {/* pt-24 adds padding for navbar */}
      <NavbarDemo />

      <div>
      <h1 className="text-white text-center text-3xl mt-6">
        Deposit tokens, <span className="font-bold text-orange-500">win prizes.</span> Withdraw anytime, <span className="font-bold text-orange-500">no loss</span>
      </h1>
      </div>

      <div className="text-white mt-[80px] gap-y-4 flex flex-col border border-orange-700 border-4 py-[25px] px-[30px] rounded-md ">
        <div className=" flex flex-row gap-x-[160px] text-orange-500 font-medium text-xl ">
            <h3>Prize Vault</h3>
            <h3>Prizes</h3>
            <h3>Win chances</h3>
            <h3>Total Deposit</h3>
            <h3>Manage</h3>
        </div>

        <div className="flex flex-row gap-x-[160px] border border-white py-[15px] px-[25px] rounded-md  bg-black">
            <div className="border border-2 border-orange-500 px-[10px] py-[5px] rounded-md bg-orange-700">
            <h3>Prize MINA</h3>
            </div>
            <h3>Upto $51020</h3>
            <h3>46%</h3>
            <h3>$1.63M</h3>
            <button className="border border-2 border-white bg-orange-600 font-semibold px-[15px] py-[5px] text-lg rounded-md">Deposit</button>
        </div>

        <div className="flex flex-row gap-x-[160px] border border-green-700 py-[15px] px-[25px] rounded-md   bg-black">
            <div className="border border-2 border-green-700 px-[10px] py-[5px] rounded-md bg-green-900">
            <h3 className="">Prize FLOW</h3>
            </div>
            <h3>Upto $48020</h3>
            <h3>41%</h3>
            <h3>$1.83M</h3>
            <button className="border border-2 border-green-700 bg-green-900 font-semibold px-[15px] py-[5px] text-lg rounded-md">Deposit</button>
        </div>

        <div className="flex flex-row gap-x-[160px] border border-white py-[15px] px-[25px] rounded-md bg-black">
            <div className="border border-2 border-white px-[10px] py-[5px] rounded-md">
            <h3>Prize USDC</h3>
            </div>
            <h3>Upto $88990</h3>
            <h3>29%</h3>
            <h3>$3.33M</h3>
            <button className="border border-2 border-white bg-orange-600 font-semibold px-[15px] py-[5px] text-lg rounded-md">Deposit</button>
        </div>

    </div>

    

    </div>
  );
};

export default Page;
