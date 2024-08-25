export interface Technology {
    id: string;
   technologyType:string;
   technologyName:string;
}

export async function getAllTechnology(): Promise<Technology[]> {
    const url: string = "http://44.243.8.35:3000/technology";
    const response: Response = await fetch(url, { cache: "no-store" });
    const technologies: Technology[] = await response.json();

    return technologies;
}


export async function saveTechnology(technologyRequest: Technology): Promise<Technology> {
    const url: string = "http://44.243.8.35:3000/technology";
    const request = new Request(url, {
        body: JSON.stringify(technologyRequest),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        method: "POST",
        cache: "no-store",
    });
    const response: Response = await fetch(request);
    const technology: Technology = await response.json();

    return technology;
}

