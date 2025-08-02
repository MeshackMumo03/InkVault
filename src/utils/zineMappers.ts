// src/utils/zineMappers.ts
import { Zine as BackendZine, ZineContent as BackendZineContent } from '../services/zineService';

// Frontend types (what your current components expect)
export interface FrontendZine {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  aiHint: string;
  description: string;
}

export interface FrontendZineContent {
  id: number;
  contentType: string;
  text: string;
  imageUrl: string;
  alt: string | null;
  caption: string;
}

// Convert backend zine to frontend format
export function mapBackendZineToFrontend(backendZine: BackendZine): FrontendZine {
  return {
    id: backendZine.zineId.toString(),
    title: backendZine.zineTitle,
    author: backendZine.zineAuthor,
    coverImage: backendZine.coverImage,
    aiHint: backendZine.aiHint,
    description: backendZine.zineDescription,
  };
}

// Convert backend zine content to frontend format
export function mapBackendZineContentToFrontend(backendContent: BackendZineContent): FrontendZineContent {
  return {
    id: backendContent.zineContentId,
    contentType: backendContent.contentType,
    text: backendContent.text,
    imageUrl: backendContent.imageUrl,
    alt: backendContent.alt,
    caption: backendContent.caption,
  };
}

// Convert arrays
export function mapBackendZinesToFrontend(backendZines: BackendZine[]): FrontendZine[] {
  return backendZines.map(mapBackendZineToFrontend);
}

export function mapBackendZineContentsToFrontend(backendContents: BackendZineContent[]): FrontendZineContent[] {
  return backendContents.map(mapBackendZineContentToFrontend);
}