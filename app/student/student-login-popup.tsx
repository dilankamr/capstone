
"use client";
import React, { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@nextui-org/shared-icons";
import { Input } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import NewStudAccCreatedPopup from "../student/stud-acc-successfully-created-popup";
import { signIn } from "next-auth/react";

export default function LoginStudentForm ({ onCloseModal }) {

  const { onClose } = useDisclosure();
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [error, setError] = useState<string | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);


  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length > 6;
  };



  const onSubmit = async () => {

  if (!email .trim() || !password .trim()) {
    setError("Please fill out all fields.");
    return;
  }
  setError(null);
  if (!validateEmail(email )) {
    setError("Invalide email address!");
    return;
  }

  if (!validatePassword(password )) {
    setError("Password must be more than 6 characters!");
    return;
  }
  try {

    const res = await  signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.status===401) {
       setError("Invalied Credentials")
    }
    else{

      clearForm();
      onClose();
      setIsSuccessOpen(true);
    }
  } catch (err: any) {
    if (err.message === "Invalid email or password") {
      setError("Invalid email or password. Please try again.");
    } else if (err.message === "Unauthorized") {
      setError("Unauthorized access. Please check your credentials.");
    } else {
      setError("Invalied Email or Password!");
    }
    console.error("Login failed:", err);
  }
};




  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  return (

    <>

      <div className={"w-full flex items-center justify-center flex-col gap-4"}>
        <Input

            label="Email"
            className="max-w-sm w-full"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail( e.target.value)}
            variant={"bordered"}
        />

        <Input
          className="max-w-sm w-full"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          label="Password"
          placeholder="Enter your password"
          type={isVisible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="bordered"
        />

         <div className="  h-10 flex items-center justify-center">
           {error && (
               <p className="text-red-400 rounded-lg p-1  text-xs max-w-80 h-8 flex items-center justify-center">
           {error}
               </p>
           )}
        </div>
        <div className={"flex flex-row justify-end p- pb-5"}>
         <div>
          <Button color="primary" type="submit" onPress={onSubmit} className="mt-">
          Login
        </Button></div>
        </div>
         </div>
         <NewStudAccCreatedPopup isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} />
    </>

  );
  }
