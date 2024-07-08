"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";
import Avatar from "react-avatar";

function Header() {
  return (
    <header>
      <div className="flex flex-col md:flex-row p-5 items-center bg-gray-500/10 rounded-b-2xl">
        <div className="absolute top-0 left-0 bg-gradient-to-br from-pink-400 to-[#0055d1] w-full h-96 blur-3xl filter opacity-50 -z-50 rounded-md"></div>
        <Image
          src="https://links.papareact.com/c2cdd5"
          alt="Trello Logo"
          width={300}
          height={200}
          className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
        />

        <div className="flex space-x-4 w-full flex-1 justify-end">
          <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="text-gray-400 h-6 w-6" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none"
            ></input>
            <button type="submit" hidden>
              search
            </button>
          </form>

          <Avatar
            name="Dhananjaya Madhusankha"
            round
            color="#0055d1"
            size="50"
          />
        </div>
      </div>

      <div className="flex items-center px-5 py-2 md:py-5 justify-center">
        <p className="text-[#0055d1] italic  shadow-xl text-sm font-light p-5 pr-5 bg-white rounded-xl w-fit max-w-3xl">
          <UserCircleIcon
            fill="#0055d1"
            className="w-10 h-10 mr-1 inline-block text-white"
          />
          GPT summersizing your task...
        </p>
      </div>
    </header>
  );
}

export default Header;
