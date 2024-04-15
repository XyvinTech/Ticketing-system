import React, { useState } from "react";
import StyledInput from "../../ui/StyledInput";
import { useForm, Controller } from "react-hook-form";
import { ReactComponent as PersonIcon } from "../../assets/icons/PersonIcon.svg";
import { ReactComponent as PhoneIcon } from "../../assets/icons/PhoneIcon.svg";
import { ReactComponent as EnvelopeIcon } from "../../assets/icons/EnvelopeIcon.svg";
import StyledButton from "../../ui/StyledButton";

const ClientProfile = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setValue("profilePicture", file);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-6 sm:p-6 lg:pb-8">
        <h1 className="mb-6 text-xl font-semibold">Profile</h1>
        <div className="flex flex-col items-center gap-12 sm:flex-row">
          <div className="w-full flex-1 space-y-6">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  type="text"
                  label="Name"
                  placeholder="Name"
                  Icon={PersonIcon}
                />
              )}
            />
            {errors.name && (
              <span className="text-sm text-red-600">
                {errors.name.message}
              </span>
            )}
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  type="tel"
                  label="Phone Number"
                  placeholder="Phone Number"
                  Icon={PhoneIcon}
                />
              )}
              rules={{
                pattern: {
                  value: /^\d{10}$/,
                  message: "Invalid phone number format",
                },
              }}
            />
            {errors.phoneNumber && (
              <span className="text-sm text-red-600">
                {errors.phoneNumber.message}
              </span>
            )}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  type="email"
                  label="Email"
                  placeholder="email@example.com"
                  Icon={EnvelopeIcon}
                />
              )}
              rules={{
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              }}
            />
            {errors.email && (
              <span className="text-sm text-red-600">
                {errors.email.message}
              </span>
            )}
            <Controller
              name="profilePicture"
              control={control}
              render={({ field }) => (
                <div className="sm:hidden">
                  <h1>Picture</h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <img
                      src={selectedImage}
                      alt="Person"
                      className="relative h-32 w-32 rounded-full border object-cover"
                    />
                    <div>
                      <label
                        htmlFor="pictureInput"
                        className="rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 cursor-pointer"
                      >
                        Change
                      </label>
                      <input
                        type="file"
                        id="pictureInput"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </div>
              )}
            />

            {errors.profilePicture && (
              <span className="text-sm text-red-600">
                {errors.profilePicture.message}
              </span>
            )}
          </div>
          <div className="hidden sm:block">
            <h1>picture</h1>
            <div className="relative overflow-hidden rounded-full">
              <img
                src={selectedImage}
                alt="Person"
                className="relative h-40 w-40 rounded-full border object-cover"
              />
              <h1 className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100">
                <span>Change</span>
                <span className="sr-only">user photo</span>
                <input
                  type="file"
                  className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                  onChange={handleImageChange}
                />
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end bg-gray-50 pb-4 sm:px-6 border-t">
        <StyledButton text="Update" type="submit" />
      </div>
    </form>
  );
};

export default ClientProfile;
