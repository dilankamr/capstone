"use client";
import React, { useEffect, useState } from "react";
import { getAllProject, Project } from "@/service/project.service";
import { title} from "@/app/components/primitives";
import {Button} from "@nextui-org/button";
import {useRouter} from "next/navigation";
import {useMultiStepContext} from "@/app/step-context";
import Nav from "../components/nav1";


export default function ProjectPage() {

  const route=useRouter();
  const { setStep,  setUserData} = useMultiStepContext();
  const columns: Column[] = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "title",
      label: "TITLE",
    },
    {
      key: "summary",
      label: "SUMMARY",
    },
    {
      key: "action",
      label: "Action",
    },
  ];


  const [rows, setRows] = useState<Project[]>([]);

  useEffect(() => {
    getAllProject().then((res) => {
      console.log("fetch response: ", res);
      setRows(res);
    }).catch((error) => {
      console.error("Error fetching projects: ", error);
    });
  }, []);

  const handleSave = (project: Project) => {
    console.log("Trying to save: ", project);
    setRows((prevRows: Project[]) => [...prevRows, project]);
  };

  const handleDelete = (id: string) => {
    console.log("Trying to delete: ", id);
    setRows((prevRows: Project[]) => prevRows.filter((item) => item.id !== id));
  };
  const routeCreateProject = () => {
    route.push('/project/create-new-project-form');
    setUserData("");
    setStep(1);
  };

  const routeViewProject = () =>{
    route.push('/project/exisiting-projects')
  }

  return (
    <>
    <div className="absolute inset-x-0 mb-20">
    <Nav/>
    </div>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-20">

      <div className="inline-block text-center justify-center ">
        <h1 className={title()}>Discover Your Perfect Guide</h1>
        <br />
        <h1 className={title()}>for Your Project with <span style={{ color: '#9333ea' }}>Guidely</span></h1>
        <br />
        <br />
        <hr className="m-3 w-3/4 mx-auto border-t-1 border-blue-500 pb-5" style={{ borderColor: '#9333ea' }} />
      </div>


          <div className={"text-center pl-20 pr-20 mr-5 ml-5 text-violet-100/70 font-light"}>
            Discover your perfect guide for your IT project with Guidely!
            Our platform connects university undergraduate students with experienced mentors,
            offering personalized support to help you succeed. With advanced filtering options,
            you can easily find guides based on specific skills, ensuring you get the expertise you need.
            Enhance your project with tailored guidance from verified professionals and reach new heights in your academic journey.
            Create your project here and take the first step towards achieving your project goals!
          </div>

        <div className={"flex flex-row gap-3 mt-8"}>
          <Button onPress={routeCreateProject} color={"secondary"} radius="full" className="  text-white shadow-lg text-lg font-semibold p-7" >Create New Project</Button>
         {/*<ProjectAddPopup onSave={handleSave}/>*/}
          <Button color={"secondary"} onPress={routeViewProject} variant="bordered" radius="full" className="  text-white shadow-lg text-lg font-semibold p-7" >View Existing Projects</Button>
        </div>




      {/*<ProjectAddPopup onSave={handleSave} />*/}
      {/*<ProjectTable columns={columns} rows={rows} onDelete={handleDelete} />*/}
      </section>
    </>

  );
}
