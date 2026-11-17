"use client";
import { motion } from "framer-motion";

export default function SkillBar({ level }: { level: number }) {
  return (
    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-line">
      <motion.div
        className="h-1.5 rounded-full bg-accent"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}