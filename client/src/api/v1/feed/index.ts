import { IProjectsPage } from "src/types/entities/Project";
import { defaultOptions } from "src/api/v1/defaults";

const projectsUri = import.meta.env.VITE_API_V1_URL + "/feed";

export const fetchFeed = async (
  fetchOptions?: RequestInit,
  params?: string
): Promise<IProjectsPage> => {
  const res = await fetch(`${projectsUri}${params}`, {
    ...defaultOptions,
    ...fetchOptions,
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};
