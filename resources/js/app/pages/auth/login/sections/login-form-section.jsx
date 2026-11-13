import { useEffect, useState } from "react";
import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import { Link, useForm } from "@inertiajs/react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginFormSection() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [bgLoaded, setBgLoaded] = useState(false);
    const [loadingPercentage, setLoadingPercentage] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    // Smooth, real-time preload for background GIF
    useEffect(() => {
        let isMounted = true;
        const img = new Image();
        img.src = "/images/login_background.gif";

        const interval = setInterval(() => {
            setLoadingPercentage((prev) => (prev < 90 ? prev + 10 : prev));
        }, 100);

        const finishLoading = () => {
            if (!isMounted) return;
            clearInterval(interval);
            setLoadingPercentage(100);
            setTimeout(() => {
                if (isMounted) setBgLoaded(true);
            }, 300);
        };

        img.onload = finishLoading;
        img.onerror = finishLoading;

        const fallback = setTimeout(finishLoading, 3000);

        return () => {
            isMounted = false;
            clearInterval(interval);
            clearTimeout(fallback);
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("auth.login"));
    };

    return (
        <>
            {/* Preloader Screen */}
            {!bgLoaded && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030914]">
                    <div className="flex w-full max-w-[260px] flex-col items-center px-6">
                        {/* Spinner */}
                        <div className="relative mb-7 h-[72px] w-[72px]">
                            <div className="absolute inset-0 rounded-full border-2 border-blue-500/10" />
                            <div className="absolute inset-0 animate-[spin_1.6s_linear_infinite] rounded-full border-2 border-transparent border-t-blue-500 border-r-cyan-400" />
                            <div className="absolute inset-[8px] animate-[spin_2.4s_linear_infinite_reverse] rounded-full border border-transparent border-b-indigo-400/50 border-l-indigo-400/30" />
                            <div className="absolute inset-[18px] flex items-center justify-center rounded-full border border-blue-500/15 bg-blue-500/8">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                                        stroke="#60a5fa"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Title */}
                        <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[.12em] text-blue-400/50">
                            Welcome to
                        </p>
                        <p className="mb-1 text-base font-semibold text-white">
                            EmpireOneCX
                        </p>
                        <p className="mb-8 text-xs tracking-wide text-slate-400/60">
                            Ticketing System
                        </p>

                        {/* Progress */}
                        <div className="w-full">
                            <div className="mb-2 flex items-baseline justify-between">
                                <span className="text-[11px] tracking-wide text-slate-500/70">
                                    Loading assets
                                </span>
                                <span className="text-[13px] font-semibold text-blue-400">
                                    {Math.round(loadingPercentage)}%
                                </span>
                            </div>
                            <div className="h-[3px] w-full overflow-hidden rounded-full bg-slate-800/80">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_8px_rgba(59,130,246,0.4)] transition-all duration-200 ease-out"
                                    style={{ width: `${loadingPercentage}%` }}
                                />
                            </div>
                        </div>

                        {/* Pulsing dots */}
                        <div className="mt-5 flex gap-1.5">
                            <span className="h-1 w-1 animate-[pulse_1.4s_ease_infinite] rounded-full bg-blue-500" />
                            <span className="h-1 w-1 animate-[pulse_1.4s_ease_.2s_infinite] rounded-full bg-cyan-400" />
                            <span className="h-1 w-1 animate-[pulse_1.4s_ease_.4s_infinite] rounded-full bg-indigo-400" />
                        </div>
                    </div>
                </div>
            )}

            {/* Main Background Container */}
            <div
                className={`flex min-h-screen w-full items-center bg-[#030914] px-4 py-12 transition-opacity duration-500 sm:px-8 lg:px-24 ${
                    bgLoaded ? "opacity-100" : "opacity-0"
                }`}
                style={{
                    backgroundImage: `url('/images/login_background.gif')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Compact on mobile (max-w-md, p-8), Large on desktop (lg:max-w-xl, lg:p-14) */}
                <div className="mx-auto w-full max-w-md rounded-3xl border border-blue-400/20 bg-slate-950/65 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-10 lg:mx-0 lg:max-w-xl lg:p-14 lg:shadow-[0_25px_60px_rgba(0,0,0,0.65)]">
                    {/* Brand Header */}
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 shadow-inner lg:px-8 lg:py-5">
                            <img
                                alt="EmpireOneCX"
                                src="/images/E1CXlogo.png"
                                className="h-12 w-auto object-contain lg:h-16"
                            />
                            <span className="mt-2 text-xs font-semibold tracking-wider text-blue-300 uppercase lg:mt-2.5 lg:text-sm">
                                Unified Ticketing System
                            </span>
                        </div>

                        <h2 className="mt-7 text-2xl font-bold tracking-tight text-white lg:mt-8 lg:text-3xl">
                            Sign in to your account
                        </h2>
                        <p className="mt-1 text-sm text-slate-300 lg:mt-2 lg:text-base">
                            Enter your credentials to access your workspace
                        </p>
                    </div>

                    {/* Responsive Form */}
                    <form
                        onSubmit={submit}
                        className="mt-8 space-y-5 lg:mt-10 lg:space-y-6 [&_input]:rounded-xl lg:[&_input]:py-3.5 lg:[&_input]:text-base [&_label]:mb-1.5 [&_label]:text-sm [&_label]:text-slate-900"
                    >
                        <Input
                            name="email"
                            label="Email Address"
                            type="email"
                            placeholder="name@company.com"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            error={errors.email}
                        />

                        {/* Password Input with React Icons Toggle */}

                        <Input
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            error={errors.password}
                            iconRight={
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                    className="mr-1.5 flex h-6 w-6 items-center justify-center rounded-full text-slate-900 transition-colors hover:text-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    aria-pressed={showPassword}
                                >
                                    {showPassword ? (
                                        <FiEyeOff className="h-5 w-5" />
                                    ) : (
                                        <FiEye className="h-5 w-5" />
                                    )}
                                </button>
                            }
                        />

                        {/* Links Row */}
                        <div className="flex items-center justify-between pt-1 text-sm lg:text-base">
                            <Link
                                href="/auth/register2"
                                className="font-medium text-blue-300 transition hover:text-blue-200 hover:underline"
                            >
                                Create an account
                            </Link>

                            <Link
                                href="#"
                                className="font-medium text-slate-300 transition hover:text-white"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2 lg:pt-3">
                            <Button
                                loading={processing}
                                type="submit"
                                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-2.5 text-sm font-semibold tracking-wider text-white shadow-lg shadow-blue-600/30 transition-all hover:from-blue-500 hover:to-cyan-500 lg:py-3.5 lg:text-base"
                            >
                                SIGN IN
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
