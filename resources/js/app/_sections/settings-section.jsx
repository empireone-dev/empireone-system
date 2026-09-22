import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Input from "@/app/_components/input";
import Button from "@/app/_components/button";
import SwalAlert from "@/app/_components/swal";
import store from "@/app/store/store";
import {
    update_profile_thunk,
} from "@/app/redux/account-thunk";
import { update_password_service } from "@/app/services/accounts-service";

function PasswordToggleIcon({ visible, onClick }) {
    const Icon = visible ? EyeSlashIcon : EyeIcon;
    return (
        <button
            type="button"
            tabIndex={-1}
            onClick={onClick}
            className="pointer-events-auto"
        >
            <Icon className="h-5 w-5" />
        </button>
    );
}

export default function SettingsSection() {
    const { user } = useSelector((state) => state.accounts);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register: registerProfile,
        handleSubmit: handleProfileSubmit,
        reset: resetProfile,
        setError: setProfileError,
        clearErrors: clearProfileErrors,
        formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
    } = useForm({
        defaultValues: { name: "", email: "" },
    });

    const {
        register: registerPassword,
        handleSubmit: handlePasswordSubmit,
        reset: resetPassword,
        setError: setPasswordError,
        clearErrors: clearPasswordErrors,
        formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    } = useForm({
        defaultValues: {
            current_password: "",
            password: "",
            password_confirmation: "",
        },
    });

    useEffect(() => {
        if (user) {
            resetProfile({ name: user.name ?? "", email: user.email ?? "" });
        }
    }, [user]);

    async function submit_profile(data) {
        clearProfileErrors();
        try {
            await store.dispatch(update_profile_thunk(data));
            await SwalAlert({ type: "success", title: "Profile updated" });
        } catch (err) {
            const errors = err?.response?.data?.data;
            if (errors) {
                Object.entries(errors).forEach(([field, messages]) => {
                    setProfileError(field, { message: messages[0] });
                });
            } else {
                await SwalAlert({ type: "error", title: "Failed to update profile" });
            }
        }
    }

    async function submit_password(data) {
        clearPasswordErrors();
        try {
            await update_password_service(data);
            resetPassword();
            await SwalAlert({ type: "success", title: "Password updated" });
        } catch (err) {
            const errors = err?.response?.data?.data;
            if (errors) {
                Object.entries(errors).forEach(([field, messages]) => {
                    setPasswordError(field, { message: messages[0] });
                });
            } else {
                await SwalAlert({ type: "error", title: "Failed to update password" });
            }
        }
    }

    return (
        <div className="flex flex-col gap-y-6">
            <form
                onSubmit={handleProfileSubmit(submit_profile)}
                className="bg-white rounded-lg shadow p-6 flex flex-col gap-y-4"
            >
                <h2 className="text-lg font-semibold text-gray-900">
                    Profile Information
                </h2>
                <Input
                    label="Name"
                    name="name"
                    register={registerProfile("name")}
                    error={profileErrors.name?.message}
                />
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    register={registerProfile("email")}
                    error={profileErrors.email?.message}
                />
                <div>
                    <Button type="submit" loading={isProfileSubmitting}>
                        Save Profile
                    </Button>
                </div>
            </form>

            <form
                onSubmit={handlePasswordSubmit(submit_password)}
                className="bg-white rounded-lg shadow p-6 flex flex-col gap-y-4"
            >
                <h2 className="text-lg font-semibold text-gray-900">
                    Update Password
                </h2>
                <Input
                    label="Current Password"
                    name="current_password"
                    type={showCurrentPassword ? "text" : "password"}
                    register={registerPassword("current_password")}
                    error={passwordErrors.current_password?.message}
                    iconRight={
                        <PasswordToggleIcon
                            visible={showCurrentPassword}
                            onClick={() => setShowCurrentPassword((v) => !v)}
                        />
                    }
                />
                <Input
                    label="New Password"
                    name="password"
                    type={showNewPassword ? "text" : "password"}
                    register={registerPassword("password")}
                    error={passwordErrors.password?.message}
                    iconRight={
                        <PasswordToggleIcon
                            visible={showNewPassword}
                            onClick={() => setShowNewPassword((v) => !v)}
                        />
                    }
                />
                <Input
                    label="Confirm New Password"
                    name="password_confirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    register={registerPassword("password_confirmation")}
                    error={passwordErrors.password_confirmation?.message}
                    iconRight={
                        <PasswordToggleIcon
                            visible={showConfirmPassword}
                            onClick={() => setShowConfirmPassword((v) => !v)}
                        />
                    }
                />
                <div>
                    <Button type="submit" loading={isPasswordSubmitting}>
                        Update Password
                    </Button>
                </div>
            </form>
        </div>
    );
}
