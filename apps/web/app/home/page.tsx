"use client";
import React from "react";
import Image from "next/image";
import { BackgroundBeams } from "../../components/ui/background-beams";
import { CardSpotlight } from "../../components/ui/card-spotlight";
import { Button } from "../../components/ui/moving-border";
import Link from "next/link";

function MovingBorderDemo() {
  return (
    <div className="mt-[20px]">
      <Link href="/accounts">
        <button className="text-white">Home</button>
      </Link>
    </div>
  );
}

function CardSpotlightDemo() {
  return (
    <CardSpotlight className="h-96 w-96 ">
      <p className="text-xl font-bold relative z-20 mt-2 text-white">
        Steps to be a part of lottery
      </p>
      <div className="text-neutral-200 mt-4 relative z-20">
        <ul className="list-none  mt-2">
          <Step title="Connect Wallet" />
          <Step title="Stake Mina/FLOW/USDC" />
          <Step title="Win Lottery" />
          <Step title="Withdraw amount" />
        </ul>
      </div>
      <p className="text-neutral-300 mt-4 relative z-20 text-sm">
        Ensuring your account is properly secured helps protect your personal
        information and data.
      </p>
      {/* <MovingBorderDemo/> */}
    </CardSpotlight>
  );
}

const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2 items-start">
      <CheckIcon />
      <p className="text-white">{title}</p>
    </li>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};

function BackgroundBeamsDemo() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased min-h-screen">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-5xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          The #1 <span className="font-bold text-orange-500">Protocol </span> on{" "}
          <span className="font-bold text-orange-500"></span> for
          <br /> no loss lottery
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Secure your account to participate in our no-loss lottery protocol,
          powered by Aave, where your funds are always safe while earning
          interest—play, win, and grow your assets risk-free.
        </p>

        <div className="mt-[30px] ml-[60px]">
          <CardSpotlightDemo />
        </div>
      </div>
      <BackgroundBeams />

      {/* Explore Button */}
      <div className="absolute top-2 right-2 m-4">
        <Link href="/vaults">
          <button className="px-4 py-2 bg-orange-700 text-white text-semibold  rounded-md shadow-lg border border-2 border-white transition duration-300">
            Explore
          </button>
        </Link>
      </div>
    </div>
  );
}

const page = () => {
  return (
    <div className="flex items-center justify-center flex-col space-y-12">
      <BackgroundBeamsDemo />
    </div>
  );
};

export default page;
