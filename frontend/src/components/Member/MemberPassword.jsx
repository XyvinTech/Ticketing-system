import React from "react";
import StyledInput from "../../ui/StyledInput";

import { ReactComponent as LockClosedIcon } from "../../assets/icons/LockClosedIcon.svg";
import StyledButton from "../../ui/StyledButton";
const MemberPassword = () => {
  return (
    <>
      <div className="px-4 py-6 sm:p-6 lg:pb-8">
        <h1 className="mb-6 text-xl font-semibold">Password</h1>
        <div className="flex flex-col gap-12 sm:flex-row sm:items-center">
          <div className="w-full space-y-6">
            <StyledInput
              type="password"
              label="Current Password"
              placeholder="Current Password"
              Icon={LockClosedIcon}
            />
             <StyledInput
              type="password"
              label="New Password"
              placeholder="New Password"
              Icon={LockClosedIcon}
            />
             <StyledInput
              type="password"
              label="Confirm Password"
              placeholder="Confirm Password"
              Icon={LockClosedIcon}
            />
          </div>
          <div className="h-fit w-full max-w-fit rounded-lg border border-amber-400 bg-amber-50 p-6 shadow">
          <h1 className="mb-5 text-xl font-semibold">Password Guidelines</h1>
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
<StyledButton text="Update"/>
      </div>
    </>
  );
};

export default MemberPassword;
