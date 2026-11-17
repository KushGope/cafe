import loginimg from "../../assets/images/loginimg.jpeg";

function AuthLayout({ title, subtitle, imageText, children }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl bg-surface shadow-2xl">
        {/* LEFT SIDE IMAGE & BRANDING */}
        <div className="relative hidden md:block min-h-150">
          <img
            src={loginimg}
            alt="Flora Cafe"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/65"></div>
          <div className="relative z-10 flex h-full flex-col justify-end p-10 text-white">
            <p className="mb-4 text-sm uppercase tracking-[4px] text-primary">
              {imageText.badge}
            </p>
            <h1 className="text-5xl font-bold">Flora Cafe</h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/80">
              {imageText.description}
            </p>
            <p className="mt-8 text-sm italic text-primary">
              Coffee. Comfort. Calm.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE FORM CONTAINER */}
        <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-14">
          <div className="mb-8 text-center md:text-left">
            <h2 className="mt-4 text-3xl font-bold text-foreground">{title}</h2>
            <p className="mt-3 text-sm text-text-muted">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
