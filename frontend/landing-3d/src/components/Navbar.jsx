import { motion } from 'framer-motion';

const links = ['About', 'Events', 'Builds', 'Shop', 'Contact'];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="glass-nav fixed left-1/2 top-4 z-40 flex w-[min(1160px,calc(100%-24px))] -translate-x-1/2 items-center justify-between rounded-full border border-white/10 px-4 py-3 text-[0.66rem] font-black uppercase tracking-[0.24em] text-white/76 backdrop-blur-2xl md:top-5 md:px-6"
    >
      <a href="#hero" className="text-white transition-colors hover:text-blood">
        Moto Co
      </a>

      <div className="hidden items-center gap-8 md:flex">
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="transition-colors duration-300 hover:text-blood"
          >
            {link}
          </a>
        ))}
      </div>

      <a
        href="#contact"
        className="rounded-full bg-blood px-5 py-2.5 text-white shadow-[0_0_32px_rgba(225,6,0,.34)] transition duration-300 hover:bg-crimson hover:shadow-[0_0_48px_rgba(225,6,0,.55)]"
      >
        Login
      </a>
    </motion.nav>
  );
}
