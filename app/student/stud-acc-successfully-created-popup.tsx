import {Modal, ModalBody, ModalContent} from "@nextui-org/modal";
import { CgAdd } from "react-icons/cg";
import {Button} from "@nextui-org/button";
import React from "react";
import {useRouter} from "next/navigation";
import { useSession } from "next-auth/react";
import { FaTimes } from "react-icons/fa";



export default function NewStudAccCreatedPopup({isOpen, onClose}){
    const router = useRouter();
    const {data: session}= useSession();
    const routeProjectHomePage = () => {
        router.push("/project");
    };
return(
    <>
        <Modal className={"p-0 m-0 max-w-6xl h-4/5"} isOpen={isOpen} onClose={onClose}>
          <ModalContent className={"pt-0"}>{(onClose) => (
            <>
              <div className={"flex flex-col h-full"}>
                <div className="h-full">
                  <ModalBody className={"h-full p-0 m-0"}>
                    <div className={"flex flex-row h-full"}>
                      <div className="container basis-2/5 border-r-1 pr-10 pt-10 pl-8 bg-zinc-800 h-full flex flex-col justify-between"
                        style={{
                          backgroundColor: 'rgba(39, 39, 42, 0.8)',
                          backgroundImage: 'url("https://img.freepik.com/premium-photo/empty-wooden-table-with-smoke-float-up-dark-background_68495-135.jpg")',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                        }}
                      >
                        <p className="mt-10 text-lg">Your Projects Success Starts from here</p>
                        <ul className="check-list mb-80">
                          <li>Choose your guide according to your personal needs...</li>
                          <li>Personalize your mentorship experience by selecting a guide that meets your criteria....</li>
                          <li>Begin your journey towards success with the right guide by your side...</li>
                          <li>Kickstart your project with guidance from industry experts.</li>
                          <li>Ensure your project's success with personalized mentorship.</li>
                          <li>Available over 1000 guides...</li>
                        </ul>

                      </div>

                      <div className={"basis-3/5 bg-gradient-to-br from-gray-800 via-black to-gray-900 backdrop-blur-lg bg-opacity-10 relative"}>
                        <Button color="danger" variant="light" onClick={onClose} className="absolute top-4 right-4"><FaTimes /></Button>
                        <div className="w-full flex flex-col  gap-2 justify-center pt-10 pb-10 pl-10 pr-10  top-10 relative ">
                         <p className={"pb-10 ml-16 text-lg mx-auto"}>You are successfully login your account!</p>
                        <img src="https://static.vecteezy.com/system/resources/previews/026/766/399/original/account-has-been-successfully-created-registered-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-ui-infographic-icon-vector.jpg" alt="Your Image" className="w-1/3 h-auto mx-auto mb-10 rounded-full opacity-90" />
                        <Button onPress={routeProjectHomePage} radius="full" className="bg-gradient-to-t from-blue-500 via-blue-700 to-blue-800 text-white shadow-lg text-xl font-semibold p-8" endContent={<CgAdd className={"font-bold text-2xl "}/>}>
                            Create New Project
                        </Button>

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
)

}
