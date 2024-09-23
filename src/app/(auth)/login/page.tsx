import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

function LoginPage() {
  return (
    <div className="min-h-screen bg-secondary py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white dark:bg-background shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Login</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-6 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <Label htmlFor="username" className="dark:text-gray-200">
                    Username
                  </Label>
                  <Input
                    autoComplete="off"
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Username"
                  />
                </div>
                <div className="relative">
                  <Label htmlFor="password" className="dark:text-gray-200">
                    Password
                  </Label>
                  <Input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div className="relative mt-4">
                  <button className="bg-cyan-500 text-white rounded-md px-2 py-1 w-full">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
