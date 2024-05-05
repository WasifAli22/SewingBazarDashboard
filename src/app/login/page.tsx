/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LoginUserInput, LoginUserSchema } from "@/lib/validations/user.schema";

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginUserInput>({
        resolver: zodResolver(LoginUserSchema),
    });
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<LoginUserInput> = async (data) => {
        const toastId = toast.loading("Trying to validate");

        try {
            setLoading(true);
            const res = await fetch("/api/login", {
                method: "POST",
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                toast.error("Username or password invalid");
            } else {
                const responseData = await res.json();
                toast.success(responseData.status as string);
                reset();
                router.push("/");
            }
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
            toast.dismiss(toastId);
        }
    };

    return (
        <div className="flex flex-col gap-8 justify-center items-center w-full h-screen">
            <h1 className="text-4xl text-buttonColor font-bold ">Sign In</h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full lg:max-w-md md:max-w-xl max-w-max p-2 bg-white/90 rounded-md shadow-lg shadow-gray-400 md:p-4 "
            >
                <div className="  min-w-3xl flex flex-col gap-6 w-full  mb-6 ">
                    {/* Username */}
                    <div className="w-full min-w-[100%] ">
                        <label className="label w-full block">Email: </label>
                        <input
                            type="email"
                            {...register("email")}
                            placeholder="abc@gmail.com"
                            className="form w-full border-gray-400 border pl-2 mt-2 rounded-md text-sm h-[30px]"
                        />
                        <p className="error text-red-500">{errors.email?.message}</p>
                    </div>
                    {/* Password */}
                    <div className="w-full min-w-[100%] ">
                        <label className="label w-full block">Password</label>
                        <input
                            type="password"
                            {...register("password")}
                            placeholder="Password"
                            className="form w-full border-gray-400 border pl-2 mt-2 rounded-md text-sm h-[30px]"
                        />
                        <p className="error text-red-500">{errors.password?.message}</p>
                    </div>
                </div>
                <div className="w-full text-center">
                    <button type="submit" className="bg-buttonColor hover:bg-red-600 text-white px-4 rounded font-semibold py-2 text-center">
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    );
}
