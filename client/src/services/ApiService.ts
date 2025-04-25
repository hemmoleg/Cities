import { City } from "../store/city";

export class ApiService {
  private static BASE_URL = "http://localhost:3000"; // Base URL for the backend

  static async fetchCities(): Promise<any[]> {
    const response = await fetch(`${this.BASE_URL}/city`, {
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
  }): Promise<City> {
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
    return response.json();
  }
  
  static async updateCity(
    cityId: number,
    updatedCity: {
      name: string;
      country: string;
      latitude: number;
      longitude: number;
    }
  ): Promise<City> {
    const response = await fetch(`${this.BASE_URL}/capital/${cityId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCity),
    });

    if (!response.ok) {
      throw new Error("Failed to update city");
    }
    return response.json();
  }

  static async removeCity(cityId: number): Promise<void> {
    const response = await fetch(`${this.BASE_URL}/capital/${cityId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to remove city");
    }
  }
}