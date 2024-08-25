export interface Guide {

    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profilePic: string;
    job: string;
    about: string;
    milestones: string;
    socialMediaLinks?: string[];
    technologies: string[];
    categories:string[];

  }

  export interface MatchingGuide{
    id: string;
    fullName: string;
    email: string;
    rating: number;
    reviewCount: number;
    job: string;

  }

  export async function getAllGuide(): Promise<Guide[]> {
    const url: string = "http://127.0.0.1:3000/guides";
    const response: Response = await fetch(url, { cache: "no-store" });
    const guides: Guide[] = await response.json();

    return guides;
  }

export async function getAllGuideUpdated(): Promise<MatchingGuide[]> {
  const url: string = "http://127.0.0.1:3000/guides/get-all";
  const response: Response = await fetch(url, { cache: "no-store" });
  const guides: MatchingGuide[] = await response.json();

  return guides;
}

export async function getAllMatchingGuide(pid:string): Promise<MatchingGuide[]> {
  const url: string = "http://127.0.0.1:3000/projects/"+pid+"/matchingGuides/";
  const response: Response = await fetch(url, { cache: "no-store" });
  console.log("matchingGuide response",response);

  const guides: MatchingGuide[] = await response.json();

  return guides;
}

  export async function getOneGuide(id: string): Promise<Guide> {
    const url: string = "http://127.0.0.1:3000/guides/" + id;
    const response: Response = await fetch(url,{ cache: "no-store" });
    const guide: Guide = await response.json();

    return guide;
  }

  export async function saveGuide(guideRequest: Guide): Promise<Guide> {
    const url: string = "http://127.0.0.1:3000/auth/signup/guide";
    const request = new Request(url, {
      body: JSON.stringify(guideRequest),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      cache: "no-store",
    });
    const response: Response = await fetch(request);
    const guide: Guide = await response.json();

    return guide;
  }

  export async function updateGuide(guideRequest: Guide): Promise<Guide> {


    const url: string = "http://127.0.0.1:3000/guides/" + guideRequest.id;
    const dto = {
      firstName: guideRequest.firstName,
      lastName: guideRequest.lastName,
      job: guideRequest.job,
      about: guideRequest.about,
      profilePic:guideRequest.profilePic,
      milestones: guideRequest.milestones,
      technologies: guideRequest.technologies || [],
      categories: guideRequest.categories || [],
      socialMediaLinks: guideRequest.socialMediaLinks || [],
    };
    console.log('Sending payload:', dto);

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
    if (!response.ok) {
      console.error('Update failed:', await response.json());
      throw new Error('Failed to update guide');
    }
    const guide: Guide = await response.json();
    console.log('Received response:', guide);

    return guide;
  }

  export async function updateGuidePic(guideRequest: Guide): Promise<Guide> {

  const technologies = guideRequest.technologies.map(tech => tech.id);
  const categories = guideRequest.categories.map(cat => cat.id);


    const url: string = "http://127.0.0.1:3000/guides/" + guideRequest.id;
    const dto = {
      firstName: guideRequest.firstName,
      lastName: guideRequest.lastName,
      job: guideRequest.job,
      about: guideRequest.about,
      profilePic:guideRequest.profilePic,
      milestones: guideRequest.milestones,
      technologies: technologies|| [],
      categories: categories || [],
      socialMediaLinks: guideRequest.socialMediaLinks || []
    };
    console.log('Sending payload:', dto);

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
    if (!response.ok) {
      console.error('Update failed:', await response.json());
      throw new Error('Failed to update guide');
    }
    const guide: Guide = await response.json();
    console.log('Received response:', guide);

    return guide;
  }


  export async function deleteGuide(id: string): Promise<Guide> {
    const url: string = "http://127.0.0.1:3000/guides/" + id;
    const request = new Request(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "DELETE",
      cache: "no-store",
    });
    const response: Response = await fetch(request);
    const guide: Guide = await response.json();

    return guide;
  }
