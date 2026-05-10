"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import googleLogo from "@/public/google.png";
import githubLogo from "@/public/github.png";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignInModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

   const handleClickGitHub = () => {
    signIn("github");
  };

   const handleClickGoogle = () => {
    signIn("google");
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px] text-center">
        <h2 className="text-2xl font-semibold mb-4">Welcome</h2>

       <button
      onClick={handleClickGoogle}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl  transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
      <span className="ml-4">Continue with Google</span>
    </button>
     <button
      onClick={handleClickGitHub}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      <Image src={githubLogo} alt="Github Logo" width={20} height={20} />
      <span className="ml-4">Continue with Github</span>
    </button>

        <button
          onClick={onClose}
          className="text-gray-500 mt-2"
        >
          Close
        </button>
      </div>
    </div>
  );
}