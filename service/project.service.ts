import {ProjectRequest} from "@/service/project.request.service";
import {Guide} from "@/service/guide.service";

export interface Project {
  id: string;
  title: string;
  summary: string;
  student: string;
  technology: string[];
  category:string[];
}


export async function getAllProject(): Promise<Project[]> {
  const url: string = "http://localhost:3000/projects";
  const response: Response = await fetch(url, { cache: "no-store" });
  const projects: Project[] = await response.json();

  return projects;
}

export async function getAllSpecificProject(studentId: string): Promise<Project> {
  const url: string = `http://localhost:3000/projects/${studentId}` ;
  const response = await fetch(url,{ cache: "no-store" });
  const project: Project = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to fetch project for student ID ${studentId}: ${response.statusText}`);
  }

  return project;
}
export async function findByID(id: string): Promise<Project> {
  const url: string = "http://localhost:3000/projects/" + id;
  const response: Response = await fetch(url,{ cache: "no-store" });
  const project: Project = await response.json();

  return project;
}

export async function saveProject(projectRequest: Project): Promise<Project> {
  const url: string = "http://localhost:3000/projects";
  const request = new Request(url, {
    body: JSON.stringify(projectRequest),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "POST",
    cache: "no-store",
  });
  const response: Response = await fetch(request);
  const project: Project = await response.json();

  return project;
}

export async function updateProject(projectRequest: Project): Promise<Project> {
  const url: string = "http://localhost:3000/projects/" + projectRequest.id;
  const dto = {
    title: projectRequest.title,
    summary: projectRequest.summary,
    student: projectRequest.student["id"],
    technology: projectRequest["technologies"].map((tec) => tec["id"]),
  };
  const request = new Request(url, {
    body: JSON.stringify(dto),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "PUT",
    cache: "no-store",
  });
  const response: Response = await fetch(request);
  const project: Project = await response.json();

  return project;
}

export async function deleteProject(id: string): Promise<Project> {
  const url: string = "http://localhost:3000/projects/" + id;
  const request = new Request(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "DELETE",
    cache: "no-store",
  });
  const response: Response = await fetch(request);
  const project: Project = await response.json();

  return project;
}

export async function findByStudentId(studentId:string): Promise<Project[]> {
  const url: string = "http://localhost:3000/projects/"+studentId;
  const response: Response = await fetch(url, { cache: "no-store" });
  console.log("existing projects for student, "+studentId+ ":  \n"+response);

  const projects: Project[] = await response.json();

  // console.log ("response(service)",projectRequests);

  return projects;
}



// In your service file (e.g., projectService.ts)
 
// import useAxiosAuth from "@/lib/hook/useAxiosAuth";
// import axios from 'axios';

// export interface Project {
//   id: string;
//   title: string;
//   summary: string;
//   student: string;
//   technology: string[];
//   category: string[];
// }

// export const getAllProject = async (): Promise<Project[]> => {
//   const axiosAuth = useAxiosAuth();
//   const url = "http://localhost:3000/projects";
//   const response = await axiosAuth.get(url, { cache: "no-store" });
//   return response.data;
// };

// export const getOneProject = async (id: string): Promise<Project> => {
//   const axiosAuth = useAxiosAuth();
//   const url = `http://localhost:3000/projects/${id}`;
//   const response = await axiosAuth.get(url);
//   return response.data;
// };

// export const saveProject = async (projectRequest: Project): Promise<Project> => {
//   const axiosAuth = useAxiosAuth();
//   const url = "http://localhost:3000/projects";
//   const response = await axiosAuth.post(url, projectRequest, {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   });
//   return response.data;
// };

// export const updateProject = async (projectRequest: Project): Promise<Project> => {
//   const axiosAuth = useAxiosAuth();
//   const url = `http://localhost:3000/projects/${projectRequest.id}`;
//   const dto = {
//     title: projectRequest.title,
//     summary: projectRequest.summary,
//     student: projectRequest.student["id"],
//     technology: projectRequest.technology.map((tec) => tec["id"]),
//   };
//   const response = await axiosAuth.put(url, dto, {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   });
//   return response.data;
// };

// export const deleteProject = async (id: string): Promise<Project> => {
//   const axiosAuth = useAxiosAuth();
//   const url = `http://localhost:3000/projects/${id}`;
//   const response = await axiosAuth.delete(url, {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   });
//   return response.data;
// };
