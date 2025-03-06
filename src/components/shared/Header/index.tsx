"use client";

import { usePathname, useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { memo } from "react";

function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isRoot = pathname === "/";

  function handleHistoryBack() {
    router.back();

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100); // Small delay to allow navigation
  }

  return (
    <div className="flex items-center mt-[70px]">
      <button
        onClick={handleHistoryBack}
        className={`cursor-pointer ${isRoot ? "invisible" : ""} `}
      >
        <svg
          width="15"
          height="14"
          viewBox="0 0 15 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5 7H1M1 7L7 1M1 7L7 13"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <h1 className="font-bold text-header-1 mx-auto text-center leading-6 tracking-[2%]">
        Maintenance Request
      </h1>
    </div>
  );
}

export default memo(Header);
