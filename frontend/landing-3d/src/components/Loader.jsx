import { useProgress } from '@react-three/drei';

export default function Loader() {
  const { progress } = useProgress();

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-carbon text-white">
      <div className="w-[min(22rem,calc(100vw-3rem))]">
        <p className="mb-5 text-xs font-black uppercase tracking-[0.42em] text-blood">
          Moto Co
        </p>
        <div className="h-px overflow-hidden bg-white/12">
          <div
            className="h-full bg-blood shadow-[0_0_32px_rgba(225,6,0,.8)] transition-[width] duration-300"
            style={{ width: `${Math.round(progress)}%` }}
          />
        </div>
        <p className="mt-4 text-[0.65rem] uppercase tracking-[0.28em] text-white/44">
          Loading showroom
        </p>
      </div>
    </div>
  );
}
