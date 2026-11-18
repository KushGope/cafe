import { Link } from "react-router-dom";
import {
  FaCoffee,
  FaLeaf,
  FaHeart,
  FaCalendarAlt,
  FaSeedling,
  FaClock,
} from "react-icons/fa";

function ShopClosed() {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-12 text-foreground">
      {/* ANIMATIONS */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(-5deg);
          }
          50% {
            transform: translateY(-18px) rotate(8deg);
          }
        }

        @keyframes steam {
          0% {
            transform: translateY(10px) scale(0.7);
            opacity: 0;
          }
          40% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-35px) scale(1.2);
            opacity: 0;
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 10px 35px rgba(53,37,29,0.05);
          }
          50% {
            box-shadow: 0 15px 45px rgba(139,63,66,0.12);
          }
        }

        @keyframes sway {
          0%, 100% {
            transform: rotate(-10deg);
          }
          50% {
            transform: rotate(10deg);
          }
        }

        .float-animation {
          animation: float 6s ease-in-out infinite;
        }

        .float-delay {
          animation: float 7s ease-in-out 1.5s infinite;
        }

        .steam-line {
          animation: steam 2.5s ease-in-out infinite;
        }

        .steam-two {
          animation-delay: 0.8s;
        }

        .steam-three {
          animation-delay: 1.5s;
        }

        .fade-up {
          animation: fadeUp 0.9s ease-out both;
        }

        .fade-delay {
          animation-delay: 0.2s;
        }

        .closed-glow {
          animation: glow 4s ease-in-out infinite;
        }

        .leaf-sway {
          animation: sway 4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .float-animation,
          .float-delay,
          .steam-line,
          .fade-up,
          .closed-glow,
          .leaf-sway {
            animation: none;
          }
        }
      `}</style>

      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute -left-40 -top-32 h-[450px] w-[450px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-32 h-[450px] w-[450px] rounded-full bg-[#c8d7bd]/30 blur-[120px]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ead8c8]/30 blur-[100px]" />

      {/* FLOATING LEAVES */}
      <FaLeaf className="float-animation pointer-events-none absolute left-[7%] top-[12%] rotate-[-30deg] text-4xl text-[#79956d]/30 sm:text-6xl" />

      <FaLeaf className="float-delay pointer-events-none absolute bottom-[12%] right-[7%] rotate-45 text-5xl text-primary/20 sm:text-7xl" />

      <FaSeedling className="leaf-sway pointer-events-none absolute right-[12%] top-[15%] text-4xl text-[#79956d]/30 sm:text-5xl" />

      <FaLeaf className="pointer-events-none absolute bottom-[25%] left-[12%] rotate-45 text-3xl text-primary/15" />

      {/* MAIN CONTENT */}
      <div className="relative z-10 mx-auto w-full max-w-4xl">
        {/* BRAND HEADER */}
        <header className="fade-up mb-9 text-center">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-white shadow-sm">
              <FaLeaf className="text-xl text-primary" />
            </div>

            <span className="font-homemade-apple text-3xl text-primary sm:text-4xl">
              Flora Cafe
            </span>
          </Link>

          <p className="mt-4 text-[10px] font-semibold tracking-[5px] text-text-muted sm:text-xs">
            COFFEE. COMFORT. CALM.
          </p>

          <div className="mx-auto mt-5 h-px w-24 bg-primary/30" />
        </header>

        {/* CLOSED CARD */}
        <section className="closed-glow fade-up fade-delay relative overflow-hidden rounded-[2rem] border border-border bg-surface/95 shadow-card backdrop-blur-xl sm:rounded-[2.5rem]">
          {/* TOP DECORATIVE ACCENT */}
          <div className="h-1.5 w-full bg-linear-to-r from-primary/30 via-primary to-primary/30" />

          <div className="relative px-6 py-12 text-center sm:px-12 sm:py-16">
            {/* DECORATIVE BACKGROUND */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#c8d7bd]/20 blur-3xl" />

            <div className="relative z-10">
              {/* STATUS BADGE
              <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(139,63,66,0.5)]" />
                Currently Unavailable
              </div> */}

              {/* COFFEE ILLUSTRATION */}
              <div className="relative mx-auto mb-10 flex h-36 w-36 items-center justify-center rounded-full border border-primary/10 bg-linear-to-br from-primary-soft to-cream shadow-[0_10px_35px_rgba(139,63,66,0.10)] sm:h-40 sm:w-40">
                {/* STEAM */}
                <div className="absolute -top-1 flex gap-3">
                  <span className="steam-line h-7 w-1.5 rounded-full bg-primary/40 blur-[2px]" />

                  <span className="steam-line steam-two h-9 w-1.5 rounded-full bg-primary/40 blur-[2px]" />

                  <span className="steam-line steam-three h-7 w-1.5 rounded-full bg-primary/40 blur-[2px]" />
                </div>

                <FaCoffee className="float-animation text-6xl text-primary drop-shadow-[0_5px_10px_rgba(139,63,66,0.2)] sm:text-7xl" />

                <FaHeart className="absolute -right-1 top-5 animate-pulse text-xl text-primary/70" />

                <FaLeaf className="absolute -bottom-1 -left-1 rotate-[-30deg] text-2xl text-[#79956d]" />
              </div>

              {/* SMALL HEADING */}
              <p className="mb-4 text-xs font-bold uppercase tracking-[4px] text-text-muted sm:text-sm">
                A Little Pause Today
              </p>

              {/* MAIN HEADING */}
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
                We're Taking
                <span className="mt-2 block font-homemade-apple text-primary">
                  A Little Break.
                </span>
              </h1>

              {/* DESCRIPTION */}
              <p className="mx-auto mt-8 max-w-xl text-sm leading-8 text-text-muted sm:text-base sm:leading-9">
                Every beautiful moment deserves a little pause. Our cafe is
                currently taking some time off. We're sorry we can't serve you
                right now, but we can't wait to welcome you back with freshly
                brewed coffee and warm smiles.
              </p>

              {/* DATE INFORMATION */}
              <div className="mx-auto mt-9 flex max-w-md flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-background p-5 sm:flex-row sm:gap-5 sm:p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-soft">
                  <FaCalendarAlt className="text-xl text-primary" />
                </div>

                <div className="text-center sm:text-left">
                  <p className="text-[10px] font-bold uppercase tracking-[2px] text-text-muted">
                    Today's Date
                  </p>

                  <p className="mt-1 text-sm font-semibold text-foreground sm:text-base">
                    {formattedDate}
                  </p>
                </div>
              </div>

              {/* INFORMATION MESSAGE */}
              {/* <div className="mx-auto mt-8 flex max-w-md items-start gap-3 rounded-xl bg-cream p-4 text-left">
                <FaClock className="mt-1 shrink-0 text-primary" />

                <p className="text-xs leading-6 text-text-muted sm:text-sm">
                  Please check back with us soon for updates. We look forward to
                  serving you again!
                </p>
              </div> */}

              {/* BACK HOME BUTTON */}
              <div className="mt-10">
                <Link
                  to="/"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-primary px-9 py-4 text-sm font-bold text-white shadow-lg shadow-primary/20 transition duration-300 hover:-translate-y-1 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  <FaCoffee className="transition-transform duration-300 group-hover:rotate-12" />
                  Visit Us Again Soon
                </Link>
              </div>

              {/* FOOTER */}
              <footer className="mt-14">
                <div className="mx-auto mb-7 h-px max-w-xs bg-linear-to-r from-transparent via-border to-transparent" />

                <p className="flex items-center justify-center gap-2 text-sm text-text-muted">
                  Made with
                  {/* <FaHeart className="animate-pulse text-primary" /> */}
                  <Link
                    to="/adminlogin"
                    className="inline-flex cursor-pointer"
                    aria-label="Admin login"
                    // title="Admin login"
                  >
                    <FaHeart className="animate-pulse text-primary transition-transform duration-300 hover:scale-125" />
                  </Link>
                  and coffee.
                </p>

                <p className="mt-3 text-[10px] font-semibold tracking-[3px] text-text-muted/70">
                  THANK YOU FOR YOUR LOVE & SUPPORT
                </p>

                <p className="mt-6 text-[10px] text-text-muted/50">
                  © {today.getFullYear()} Flora Cafe. All rights reserved.
                </p>
              </footer>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ShopClosed;
