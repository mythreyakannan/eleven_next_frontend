import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useToast } from '@chakra-ui/react'

function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast()
  const baseURL = "https://eleven.ikadai.co/api/"

  const submit = async (e = new SyntheticEvent()) => { 
    e.preventDefault();
    const Response =  await fetch(baseURL+"login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if(Response.ok){
        let responseJ = await Response.json();
        router.push('/main/inventory');
        localStorage.setItem("jwt", responseJ.JWT);
        console.log(responseJ)
        toast({
          title: 'Signed In',
          description: "You have successfully signed in",
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      }else{
        toast({
          title: 'Invalid credentials',
          description: "Check your credentials and retry",
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
          <div className="bg-white flex flex-col items-center justify-center px-4 py-24 space-y-8 w-full md:w-1/2 h-full">
            <div className="flex flex-col items-center text-black">
              <h1 className="font-medium text-black text-2xl">Welcome back!</h1>
              <p>Login with your credentials</p>
            </div>
            <form
              className="flex flex-col items-center space-y-4"
              onSubmit={submit}
            >
              <div className="relative">
                <span className="absolute flex inset-y-0 items-center pl-4 text-black">
                  <FaEnvelope />
                </span>
                <input
                  className="border border-gray-400 bg-white text-black outline-none pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-black"
                  placeholder="Email"
                  required
                  type="text"
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
                <button
                  className="bg-black font-semibold  inline-flex items-center px-20 py-1 rounded-md shadow-md text-white transition hover:bg-gray-800 w-full"
                  type="submit"
                >
                  Sign In
                  <FaArrowRight className="ml-2" />
                </button>
            </form>
            <div className="text-right flex flex-row justify-end items-end text-black text-sm">
              <p className="italic font-semibold hover:underline cursor-pointer">
                Forgot Password?
              </p>
            </div>
            <div className="flex flex-row items-center text-black text-sm">
              <p className="italic">Don't have an account?</p>
              <Link href="/auth/sign-up">
                <p className="font-semibold hover:underline cursor-pointer ml-2">
                  Sign Up
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
