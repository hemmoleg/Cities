export class ApiService {
  private static BASE_URL = "http://localhost:3000"; // Base URL for the backend

  static async fetchCities(): Promise<any[]> {
    const response = await fetch(`${this.BASE_URL}/capital`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cities");
    }

    return response.json();
  }

  static async addCity(city: {
    name: string;
    country: string;
    latitude: number;
    longitude: number;
  }): Promise<void> {
    const response = await fetch(`${this.BASE_URL}/capital`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(city),
    });

    if (!response.ok) {
      throw new Error("Failed to add city");
    }
  }

  // Additional methods for other API calls can be added here
}