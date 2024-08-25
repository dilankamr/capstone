"use client";
import React, { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@nextui-org/shared-icons";
import { Input } from "@nextui-org/input";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { FaTimes } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function GuideLoginPopup({ onSave }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "", general: "" });
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const onSubmit = async () => {
    setError({ email: "", password: "", general: "" });

    if (!email) {
      setError((prev) => ({ ...prev, email: "Email cannot be empty." }));
      return;
    }

    if (!password) {
      setError((prev) => ({ ...prev, password: "Password cannot be empty." }));
      return;
    }

    if (!validateEmail(email)) {
      setError((prev) => ({ ...prev, email: "Please enter a valid email address." }));
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        userType: "guide",
      });

      if (res?.status === 401) {
        setError((prev) => ({ ...prev, general: "Invalid Credentials" }));
      } else {
        router.push("/profile");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError((prev) => ({ ...prev, general: "Login failed. Please try again." }));
    }
  };

  return (
    <>
      <Button
        className="px-6 py-3 text-lg font-semibold rounded-full bg-gradient-to-br from-black via-violet-900 to-blue-400 hover:bg-gradient-to-br hover:from-black hover:via-violet-900 hover:to-blue-400 relative overflow-hidden"
        onPress={onOpen}
      >
        <span className="relative z-10">Guide</span>
        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white opacity-20 mix-blend-screen pointer-events-none"></span>
      </Button>

      <Modal className={"p-0 m-0 max-w-6xl h-4/5"} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className={"pt-0"}>
          {(onClose) => (
            <>
              <div className={"flex flex-col h-full"}>
                <div className="h-full">
                  <ModalBody className={"h-full p-0 m-0"}>
                    <div className={"flex flex-row h-full"}>
                      <div
                        className="container basis-2/5 border-r-1 pr-10 pt-10 pl-8 bg-zinc-800 h-full flex flex-col justify-between"
                        style={{
                          backgroundColor: "rgba(39, 39, 42, 0.8)",
                          backgroundImage: 'url("https://img.freepik.com/premium-photo/empty-wooden-table-with-smoke-float-up-dark-background_68495-135.jpg")',
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                      >
                        <p className="mt-20 text-lg">Be the guide that propels projects to success.</p>
                        <ul className="check-list mb-40">
                          <li>Ready to share your expertise and help others succeed? Log in to guide their journey....</li>
                          <li>Join our community of experts and inspire the next generation of innovators...</li>
                          <li>Your insights can transform projects...</li>
                          <li>Share your skills and experience to help others achieve their goals...</li>
                          <li>Become a beacon of knowledge and support...</li>
                        </ul>
                      </div>

                      <div className={"basis-3/5 bg-gradient-to-br from-gray-800 via-black to-gray-900 backdrop-blur-lg bg-opacity-10 relative"}>
                        <div className={"w-full flex flex-row gap-2 justify-center pt-10 pb-20 mb-22 text-gray-400"}></div>
                        <div className={"w-full flex items-center justify-center flex-col gap-4 pb-20 mb-20"}>
                          <div className={"basis-3/5"}>
                            <Button color="danger" variant="light" onPress={onClose} className="absolute top-4 right-4">
                              <FaTimes />
                            </Button>
                            <div className="w-full flex flex-row gap-2 justify-center pt-10 pb-5 text-gray-400">
                              <p className="mb-10">
                                Don't have an account?{" "}
                                <Link href="guide/create-new-guide-form" underline="always">
                                  Create Account
                                </Link>
                              </p>
                            </div>

                            <div className="w-full flex flex-col items-center">
                              <div className="relative max-w-xs w-full mb-8">
                                <Input
                                  isRequired
                                  label="Email"
                                  placeholder="Enter your email"
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  variant={"bordered"}
                                />
                                {error.email && <p className="absolute text-red-500 mt-1">{error.email}</p>}
                              </div>

                              <div className="relative max-w-xs w-full mb-10">
                                <Input
                                  isRequired
                                  endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
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
                                {error.password && <p className="absolute text-red-500 mt-1">{error.password}</p>}
                              </div>

                              <div className={"flex flex-row justify-end w-full"}>
                                <Button color="primary" type="submit" onPress={onSubmit}>
                                  Login
                                </Button>
                              </div>
                            </div>

                            {error.general && <p className="text-red-500 mt-4">{error.general}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </ModalBody>
                </div>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
