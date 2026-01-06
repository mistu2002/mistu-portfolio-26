"use client";

import Image from "next/image";

export function PaperBackground() {
  return (
    <div className="fixed inset-0 -z-[100] w-full h-full pointer-events-none">
      <Image
        src="/paper-bg.jpeg"
        alt="Paper Texture Background"
        fill
        priority
        className="object-cover opacity-15"
      />
    </div>
  );
}

