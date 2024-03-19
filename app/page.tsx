"use client";
import { getSession, login, logout } from "@/lib";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

if (Cookies.get("loggedIn") == "true") {
} else {
  Cookies.set("loggedIn", "false");
}

export default function Home() {
  const [passcode, setPasscode] = useState();

  async function login() {
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          passcode: passcode,
        }),
      });
      if (res.status == 200) {
        Cookies.set("loggedIn", "true");
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleInputChange = (e: any) => {
    setPasscode(e.target.value);
  };

  async function handleSubmit() {
    login();
  }

  return (
    <>
      <div className="flex w-screen p-0 m-0 h-20 absolute">
        <div className=" flex grow bg-black items-center justify-center">
          <div className="text-white text-[2rem] h-min w-fit">Lockout USA</div>
        </div>
      </div>
      <div className="flex flex-col w-screen p-0 m-0 h-dvh justify-center items-center gap-10">
        <h1 className="text-center text-[3rem]">Enter the passcode</h1>
        <form action={handleSubmit} className="flex flex-col gap-5">
          <input
            onChange={handleInputChange}
            type="password"
            name="passcode"
            id=""
            className="text-center border border-black"
          />
          <input
            type="submit"
            value="Login"
            className="border border-black w-min mx-auto py-1 px-3 rounded-md"
          />
        </form>
      </div>
    </>
  );
}
