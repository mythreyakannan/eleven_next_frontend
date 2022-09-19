import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

function SignUpPage() {
  const router = useRouter()
  const toast = useToast()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfPassword] = useState("");
  const baseURL = "http://54.219.3.107/api/"

  const submit = async (e = new SyntheticEvent()) => {
    e.preventDefault();
      if (cnfpassword == password) {
        await fetch(baseURL+"register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "name": name,
            "email": email,
            "password": password,
          }),
        });
        router.push('/auth/sign-in')
        toast({
          title: 'Account Succesfully created',
          description: "Login with your credentials",
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      }
      else{
        console.log("Password doesn't match")
        toast({
          title: 'Password does not match',
          description: "Check your password",
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }
  };

  return (
    <>
      {}
      <div className="bg-gradient-to-r from-gray-300 via-blue-50 to-gray-300 block h-screen items-center justify-center p-4 md:flex">
        <div className="bg-cover bg-black flex flex-col items-center max-w-screen-lg overflow-hidden rounded-lg shadow-lg w-full md:flex-row h-4/5">
          <div className="backdrop-blur-sm backdrop-filter flex flex-col items-center p-4 w-full md:w-1/2 text-white">
            <h1 className="font-medium text-5xl">eleven. Grocery</h1>
          </div>
          <div className="bg-white flex flex-col justify-center items-center px-4 py-24 space-y-8 w-full md:w-1/2 h-full">
            <div className="flex flex-col items-center text-black">
              <h1 className="font-medium text-black text-2xl">
                Create an account
              </h1>
            </div>
            <form className="flex flex-col items-center space-y-4" onSubmit={submit}>
              <div className="relative">
                <span className="absolute flex inset-y-0 items-center pl-4 text-black">
                  <FaUser />
                </span>
                <input
                  className="border border-gray-400 bg-white text-black outline-none pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-black"
                  placeholder="Name"
                  type="text"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="relative">
                <span className="absolute flex inset-y-0 items-center pl-4 text-black">
                  <FaEnvelope />
                </span>
                <input
                  className="border border-gray-400 bg-white text-black outline-none pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-black"
                  placeholder="Email"
                  type="text"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <span className="absolute flex inset-y-0 items-center pl-4 text-black">
                  <FaLock />
                </span>
                <input
                  className="border border-gray-400 bg-white text-black outline-none pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-black"
                  placeholder="Password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="relative">
                <span className="absolute flex inset-y-0 items-center pl-4 text-black">
                  <FaLock />
                </span>
                <input
                  className="border border-gray-400 bg-white text-black outline-none pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-black"
                  placeholder="Confirm Password"
                  type="password"
                  required
                  onChange={(e) => setCnfPassword(e.target.value)}
                />
              </div>
              <button
                className="bg-black font-semibold  inline-flex items-center px-24 py-1 rounded-md shadow-md text-white transition hover:bg-gray-800 w-full"
                type="submit"
              >
                Sign Up
              </button>
            </form>
            <div className="flex flex-row items-center text-black text-sm">
              <p className="italic">Already having an account? </p>
              <Link href="/auth/sign-in">
                <p className="font-semibold hover:underline cursor-pointer ml-2">
                  Sign In
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
