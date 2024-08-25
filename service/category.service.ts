export interface Category {
    id: string;
    categoryName: string;
    project: string;
    guide: string;
  }

  export async function getAllCategory(): Promise<Category[]> {
    const url: string = "http://44.243.8.35:3000/categories";
    const response: Response = await fetch(url, { cache: "no-store" });
    const categories: Category[] = await response.json();

    return categories;
  }

  export async function getOneCategory(id: string): Promise<Category> {
    const url: string = "http://44.243.8.35:3000/categories/" + id;
    const response: Response = await fetch(url,{ cache: "no-store" });
    const category: Category = await response.json();

    return category;
  }

  export async function saveCategory(categoryRequest: Category): Promise<Category> {
    const url: string = "http://44.243.8.35:3000/categories";
    const request = new Request(url, {
      body: JSON.stringify(categoryRequest),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      cache: "no-store",
    });
    const response: Response = await fetch(request);
    const category: Category = await response.json();

    return category;
  }

  export async function updateCategory(categoryRequest: Category): Promise<Category> {
    const url: string = "http://44.243.8.35:3000/categories/" + categoryRequest.id;
    const dto = {
      categoryName: categoryRequest.categoryName,
      project: categoryRequest.project["id"],
      guide: categoryRequest.guide["id"],
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
    const category: Category = await response.json();

    return category;
  }

  export async function deleteCategory(id: string): Promise<Category> {
    const url: string = "http://44.243.8.35:3000/categories/" + id;
    const request = new Request(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "DELETE",
      cache: "no-store",
    });
    const response: Response = await fetch(request);
    const category: Category = await response.json();

    return category;
  }
