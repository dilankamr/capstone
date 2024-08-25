import {Guide, MatchingGuide} from "@/service/guide.service";
import {Project} from "@/service/project.service";

export interface ProjectRequest {
     id: string;
    guideId: string;
    projectId: string;
    status: string;

    guideEmail:string;

    projectTitle:string;

    projectSummary:string;

    studentEmail:string;
}

// export interface ProjectRequestResponse{
//     guideId: string;
//     projectId: string;
//     status: string;
// }

export async function createRequest(projectRequest: ProjectRequest): Promise<ProjectRequest> {
    const url: string = "http://127.0.0.1:3000/projectRequests";
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
    const projectRequest1: ProjectRequest = await response.json();

    return projectRequest1;
}

export async function deleteRequest(id: string): Promise<ProjectRequest> {
    const url: string = "http://127.0.0.1:3000/projectRequests/" + id;
    const request = new Request(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        method: "DELETE",
        cache: "no-store",
    });
    const response: Response = await fetch(request);
    const projectRequest: ProjectRequest = await response.json();

    return projectRequest;
}

export async function getRequestsByGuide(guideId:string): Promise<ProjectRequest[]> {
    const url: string = "http://127.0.0.1:3000/projectRequests/"+guideId;
    const response: Response = await fetch(url, { cache: "no-store" });
    console.log("project requests for guide, "+guideId+ ":  \n"+response);

    const projectRequests: ProjectRequest[] = await response.json();

    console.log ("response(service)",projectRequests);

    return projectRequests;
}

export async function getRequestsByProject(projectId:string): Promise<ProjectRequest[]> {
    const url: string = "http://127.0.0.1:3000/projectRequests/projectId/"+projectId;
    const response: Response = await fetch(url, { cache: "no-store" });
    console.log("project requests for guide, "+projectId+ ":  \n"+response);

    const projectRequests: ProjectRequest[] = await response.json();

    console.log ("response(service)",projectRequests);

    return projectRequests;
}

export async function  rejectRequest(id: string): Promise<ProjectRequest> {
    const url: string = "http://127.0.0.1:3000/projectRequests/" + id+"/reject";
    const request = new Request(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        method: "PATCH",
        cache: "no-store",
    });
    const response: Response = await fetch(request);
    const projectRequest: ProjectRequest = await response.json();

    return projectRequest;
}

export async function  acceptRequest(id: string): Promise<ProjectRequest> {
    const url: string = "http://127.0.0.1:3000/projectRequests/" + id+"/accept";
    const request = new Request(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        method: "PATCH",
        cache: "no-store",
    });
    const response: Response = await fetch(request);
    const projectRequest: ProjectRequest = await response.json();

    return projectRequest;
}

export async function getFinalStatusOfProject(projectId: string): Promise<string> {
    const url: string = "http://127.0.0.1:3000/projectRequests/" + projectId +"/projectFinalStatus";
    const response = await fetch(url, { cache: "no-store" });
    const data = await response.text(); // Capture the JSON data

    return data; // Assuming data is the status string you need
}

export async function getAcceptedGuideIdByProjectId(projectId: string): Promise<string> {
    const url: string = "http://127.0.0.1:3000/projectRequests/" + projectId +"/acceptedGuideID";
    const response = await fetch(url, { cache: "no-store" });
    const data = await response.text(); // Capture the JSON data

    if (!response.ok) {
        throw new Error(`Failed to fetch project for student ID ${projectId}: ${response.statusText}`);
    }

    console.log("Fetched Data for   "+projectId+"   :", data); // Log the actual data received
    return data; // Assuming data is the status string you need
}

export async function getRejectedGuideIdsByProjectId(projectId: string): Promise<string[]> {
    const url: string = "http://127.0.0.1:3000/projectRequests/" + projectId +"/rejectedGuidesIds";
    const response = await fetch(url, { cache: "no-store" });
    const data = await response.json(); // Capture the JSON data

    if (!response.ok) {
        throw new Error(`Failed to fetch project for student ID ${projectId}: ${response.statusText}`);
    }

    console.log("Fetched Data for   "+projectId+"   :", data); // Log the actual data received
    return data; // Assuming data is the status string you need
}
