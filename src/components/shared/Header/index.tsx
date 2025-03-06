"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { memo } from "react";
import clsx from "clsx";

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
        className={clsx("cursor-pointer", isRoot && "invisible")}
      >
        <Image src="/icons/arrow-left.svg" alt="Back" width={24} height={24} />
      </button>

      <h1 className="font-bold text-header-1 mx-auto text-center leading-6 tracking-[2%]">
        Maintenance Request
      </h1>
    </div>
  );
}

export default memo(Header);
