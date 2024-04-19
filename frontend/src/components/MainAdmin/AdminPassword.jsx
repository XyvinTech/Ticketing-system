import React from "react";
import StyledInput from "../../ui/StyledInput";
import { useForm, Controller } from "react-hook-form";
import { ReactComponent as LockClosedIcon } from "../../assets/icons/LockClosedIcon.svg";
import StyledButton from "../../ui/StyledButton";

const AdminPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const onSubmit = (data) => {
    console.log(data); 
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-4 py-6 sm:p-6 lg:pb-8">
          <h1 className="mb-6 text-xl font-semibold">Password</h1>
          <div className="flex flex-col gap-12 sm:flex-row sm:items-center">
            <div className="w-full space-y-6">
              <Controller
                name="currentPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <StyledInput
                    {...field}
                    type="password"
                    label="Current Password"
                    placeholder="Current Password"
                    Icon={LockClosedIcon}
                  />
                )}
                rules={{ required: "Current Password is required" }}
              />
              {errors.currentPassword && (
                <span className="text-sm text-red-600">
                  {errors.currentPassword.message}
                </span>
              )}
              <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <StyledInput
                    {...field}
                    type="password"
                    label="New Password"
                    placeholder="New Password"
                    Icon={LockClosedIcon}
                  />
                )}
                rules={{
                  required: "New Password is required",
                  pattern: {
                    value: passwordRegex,
                    message:
                      "Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one number, and one special character.",
                  },
                }}
              />
              {errors.newPassword && (
                <span className="text-sm text-red-600">
                  {errors.newPassword.message}
                </span>
              )}
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <StyledInput
                    {...field}
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    Icon={LockClosedIcon}
                  />
                )}
                rules={{
                  required: "Confirm Password is required",
                }}
              />
              {errors.confirmPassword && (
                <span className="text-sm text-red-600">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div className="h-fit w-full max-w-fit rounded-lg border border-amber-400 bg-amber-50 p-6 shadow">
              <h1 className="mb-5 text-xl font-semibold">
                Password Guidelines
              </h1>
              <ul className="list-inside list-disc space-y-1 text-gray-700">
                <li>Contains at least 8 characters long</li>
                <li>Includes at least one uppercase letter</li>
                <li>Includes at least one lowercase letter</li>
                <li>Includes at least one number</li>
                <li>Includes at least one special character</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-end bg-gray-50 pb-4 sm:px-6 border-t">
          <StyledButton text="Update" type="submit" />
        </div>
      </form>
    </>
  );
};

export default AdminPassword;
