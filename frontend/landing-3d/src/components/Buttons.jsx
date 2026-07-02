import { motion } from 'framer-motion';

export default function Buttons() {
  return (
    <div className="hero-ctas mt-8 flex flex-wrap justify-center gap-4 opacity-0">
      <motion.a
        whileHover={{ y: -4, scale: 1.025 }}
        whileTap={{ scale: 0.98 }}
        href="#events"
        className="rounded-full bg-blood px-7 py-4 text-xs font-black uppercase tracking-[0.24em] text-white shadow-[0_0_52px_rgba(225,6,0,.42)] transition duration-300 hover:bg-crimson"
      >
        Upcoming Meets
      </motion.a>

      <motion.a
        whileHover={{ y: -4, scale: 1.025 }}
        whileTap={{ scale: 0.98 }}
        href="#builds"
        className="rounded-full border border-white/24 bg-black/28 px-7 py-4 text-xs font-black uppercase tracking-[0.24em] text-white backdrop-blur-xl transition duration-300 hover:border-blood hover:text-blood"
      >
        View Builds
      </motion.a>
    </div>
  );
}
