import { useEffect, useState } from "react";
import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import { useForm } from "@inertiajs/react";

export default function LoginFormSection() {
    const { data, setData, post, processing } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [bgLoaded, setBgLoaded] = useState(false);
    const [loadingPercentage, setLoadingPercentage] = useState(0);

    // Preload background image with percentage
    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingPercentage((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setBgLoaded(true), 500); // Small delay after 100% for better UX
                    return 100;
                }
                const newPercentage = prev + Math.random() * 15 + 5; // Random increment between 5-20%
                return Math.min(newPercentage, 100); // Ensure it never exceeds 100%
            });
        }, 300);

        // Fallback timeout to ensure loading completes
        setTimeout(() => {
            clearInterval(interval);
            setLoadingPercentage(100);
            setTimeout(() => setBgLoaded(true), 500);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("auth.login"));
    };

    return (
        <>
            {!bgLoaded && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
                    <div className="text-center">
                        <div className="mb-6">
                            <div className="animate-pulse text-lg">
                                Welcome to <b>E</b>mpire<b>O</b>ne! Please Wait!
                            </div>
                        </div>

                        {/* Percentage Display */}
                        <div className="mb-4">
                            <div className="text-xl font-bold">
                                {Math.round(loadingPercentage)}%
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-64 mx-auto">
                            <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                                <div
                                    className="bg-white h-full rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${loadingPercentage}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Loading dots animation */}
                        <div className="mt-4 flex justify-center space-x-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                            <div
                                className="w-2 h-2 bg-white rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                                className="w-2 h-2 bg-white rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                            ></div>
                            <div
                                className="w-2 h-2 bg-white rounded-full animate-bounce"
                                style={{ animationDelay: "0.3s" }}
                            ></div>
                            <div
                                className="w-2 h-2 bg-white rounded-full animate-bounce"
                                style={{ animationDelay: "0.4s" }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}

            <div
                className={`flex h-screen flex-1 transition-opacity duration-500 ${
                    bgLoaded ? "opacity-100" : "opacity-0"
                }`}
                style={{
                    backgroundImage: `url('/images/login_background.gif')`,
                    backgroundSize: "cover",
                    backgroundPosition: "left",
                }}
            >
                <div className="flex flex-1 border-2 shadow-2xl bg-white/10 border-white my-3 rounded-lg m-5 p-2 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <div className="text-2xl font-black border-4 p-2 px-10 rounded-tr-3xl rounded-bl-3xl">
                                <img
                                    alt="Your Company"
                                    src="/images/logo.png"
                                    className="h-18 w-auto"
                                />
                            </div>
                            <h2 className="mt-8 text-2xl/9 text-center font-bold tracking-tight text-white">
                                Sign in to your account
                            </h2>
                        </div>

                        <div className="mt-10">
                            <form onSubmit={submit} className="space-y-6">
                                <Input
                                    name="email"
                                    label="Email"
                                    type="email"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <Input
                                    name="password"
                                    label="Password"
                                    type="password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />

                                <div className="flex items-center justify-between">
                                    <div className="flex gap-3">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                        />
                                        <label
                                            htmlFor="remember-me"
                                            className="text-sm text-white"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="text-sm">
                                        <a
                                            href="#"
                                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                                        >
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>

                                <Button
                                    loading={processing}
                                    type="submit"
                                    className="w-full py-2"
                                >
                                    SIGN IN
                                </Button>
                            </form>

                            <div className="mt-10">
                                <div className="relative">
                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-0 flex items-center"
                                    >
                                        <div className="w-full border-t border-gray-200" />
                                    </div>
                                    <div className="relative flex justify-center text-sm/6 font-medium">
                                        <span className="bg-white px-6 text-gray-900">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-1 gap-4">
                                    <a
                                        href="#"
                                        className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                                    >
                                        {/* Google Icon */}
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                                                fill="#EA4335"
                                            />
                                            <path
                                                d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                                                fill="#4285F4"
                                            />
                                            <path
                                                d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                                                fill="#FBBC05"
                                            />
                                            <path
                                                d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                                                fill="#34A853"
                                            />
                                        </svg>
                                        <span>Google</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
