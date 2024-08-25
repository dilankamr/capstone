
export interface Student {
    success: any;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export async function saveStudent(studentRequest: Student): Promise<Student> {
    const url: string = "http://44.243.8.35:3000/auth/signup/student";
    const request = new Request(url, {
        body: JSON.stringify(studentRequest),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        method: "POST",
        cache: "no-store",
    });
    const response: Response = await fetch(request);
    const student: Student = await response.json();

    return student;
}






