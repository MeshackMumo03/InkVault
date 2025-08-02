// src/services/zineService.ts
const API_BASE_URL = 'http://localhost:8080/api';

// Types matching your backend structure
export interface Zine {
  zineId: number;
  zineTitle: string;
  zineAuthor: string;
  coverImage: string;
  aiHint: string;
  zineDescription: string;
}

export interface ZineContent {
  zineContentId: number;
  contentType: string;
  text: string;
  imageUrl: string;
  alt: string | null;
  caption: string;
  zine?: Zine; // Optional since it's included in GET but not POST
}

export interface CreateZineRequest {
  zineId: null;
  zineTitle: string;
  zineAuthor: string;
  coverImage: string;
  aiHint: string;
  zineDescription: string;
}

export interface CreateZineContentRequest {
  zineContentId: null;
  contentType: string;
  text: string;
  imageUrl: string;
  alt: string;
  caption: string;
}

export const zineService = {
  // Get all zines
  async getAllZines(): Promise<Zine[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/zines`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching zines:', error);
      throw error;
    }
  },

  // Get a single zine by ID
  async getZineById(zineId: number): Promise<Zine> {
    try {
      const response = await fetch(`${API_BASE_URL}/zines/${zineId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching zine:', error);
      throw error;
    }
  },

  // Create a new zine
  async createZine(zineData: CreateZineRequest): Promise<Zine> {
    try {
      const response = await fetch(`${API_BASE_URL}/zines`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(zineData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating zine:', error);
      throw error;
    }
  },

  // Get zine contents
  async getZineContents(zineId: number): Promise<ZineContent[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/zines/${zineId}/zine-contents`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching zine contents:', error);
      throw error;
    }
  },

  // Create zine content
  async createZineContent(zineId: number, contentData: CreateZineContentRequest): Promise<ZineContent> {
    try {
      const response = await fetch(`${API_BASE_URL}/zines/${zineId}/zine-contents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contentData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating zine content:', error);
      throw error;
    }
  },
};