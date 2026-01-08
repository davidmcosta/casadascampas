import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-[180px] h-[80px]">
        <Image
          src="/images/logo.png"
          alt="Logo da Casa das Campas"
          fill
          priority
          sizes="(max-width: 768px) 180px, 180px"
          className="object-contain"
        />

      </div>
    </div>
  );
};

export default Logo;
