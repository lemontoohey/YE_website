"use client";

import Image, { ImageProps } from "next/image";
import { motion } from "framer-motion";

export function LuxeImage({ className, ...props }: ImageProps) {
  return (
    <motion.div
      className="relative h-full w-full overflow-hidden"
      initial={{ scale: 1.1, filter: "blur(20px)", opacity: 0 }}
      whileInView={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <Image {...props} className={className ?? "object-cover"} />
    </motion.div>
  );
}
