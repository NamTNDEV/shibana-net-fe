import { AuthHeroImage } from "@/assets";
import Logo from "@/components/shared/logo";

export default function AuthSidebar() {
  return (
    <section className="relative h-full hidden lg:flex flex-col justify-between bg-primary-foreground text-white px-10 py-8 overflow-hidden">
      {/* Optional subtle pattern / noise */}
      <div className="pointer-events-none absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_top,white_0,transparent_60%)]" />

      {/* Content */}
      <div className="relative flex flex-col justify-between h-full">
        {/* Top: Logo */}
        <div className="text-white">
          <Logo isLink={false} iconSize="size-12" fontSize="text-3xl" />
        </div>

        {/* Center: hero image + text */}
        <div className="flex flex-col items-center text-center gap-16">
          {/* Hero image container with glow */}
          <div className="size-40 lg:size-60 rounded-full bg-primary-foreground/10 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-3 drop-shadow-[0_0_50px_rgba(255,193,94,0.3)]">
            {/* Placeholder image / mascot */}
            {/* <div className="w-24 h-24 rounded-full bg-yellow-400/80" /> */}
            <AuthHeroImage className="size-full object-cover" />
          </div>

          {/* Title & subtitle */}
          <div className="space-y-5 flex flex-col items-center w-full max-w-md px-4">
            <h1 className="text-3xl font-bold text-white">
              ShibaNa <span className="text-primary">Net</span>
            </h1>
            <p className="text-xl text-gray-300 text-center">
              Kết nối, chia sẻ và khám phá cộng đồng ShibaNa một cách an toàn và
              thú vị.
            </p>
          </div>
        </div>

        {/* Bottom spacer to keep content centered overall */}
        <div />
      </div>
    </section>
  );
}


