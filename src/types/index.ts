export interface Project {
  id: number;
  name: string;
  url: string;
  description: string;
  category: string;
  tools?: string;
  image?: string;
}

export interface GameData {
  "": string; // Game description like "Game1: build me a minimalist note taking journal"
  linkATool: string;
  linkAWebsite: string;
  linkBTool: string;
  linkBWebsite: string;
  linkCTool: string;
  linkCWebsite: string;
  linkDTool: string;
  linkDWebsite: string;
  id: number;
}

export interface SheetResponse {
  sheet1: Project[];
}
