import "./style.scss";
import { useQuery, useMutation } from "src/utils/tanstack";
import { useMemo, useState } from "react";
import { useAuth } from "src/auth";
import { queryClient } from "src/index";
import { fetchProjects } from "src/api/v1";
import { ProjectPreview } from "src/components";
import { INewProject } from "src/types/entities/Project";
import { useInfiniteQuery } from "@tanstack/react-query";

const newProject = (title: string) => {
  return {
    ownerId: 1,
    title,
    description: "Descirptionsdlkfja",
  };
};

const pageSize = 15;

export const Feed = () => {
  const { authState } = useAuth();

  const [page, setPage] = useState(0);

  const newProjectMutation = useMutation({
    mutationFn: (newProject: INewProject) => {
      const { token } = authState;

      if (!token) throw new Error("No token error blabla");

      return fetchProjects({
        method: "POST",
        body: JSON.stringify(newProject),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // filterOpts
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["/projects"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const makeDummies = () => {
    newProjectMutation.mutate(newProject("New project title 1"));
    newProjectMutation.mutate(newProject("New project title 2"));
    newProjectMutation.mutate(newProject("New project title 3"));
    newProjectMutation.mutate(newProject("New project title 4"));
    newProjectMutation.mutate(newProject("New project title 5"));
    newProjectMutation.mutate(newProject("New project title 6"));
    newProjectMutation.mutate(newProject("New project title 7"));
  };

  // Implement pagination on scroll
  // onScroll => setPage(prev => Math.max(prev - 1, 0))
  const {
    data: projectsPage,
    error,
    isLoading,
    isPreviousData,
  } = useQuery({
    queryKey: ["/projects", authState],
    queryFn: () => {
      const { token } = authState;

      const params = `?size=${pageSize}&sort=createdAt&page=${page}`;
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      return token ? fetchProjects(headers, params) : null;
    },
    keepPreviousData: true,
  });

  console.log(projectsPage);

  // const {
  //   data,
  //   error,
  //   fetchNextPage,
  //   fetchPreviousPage,
  // } = useInfiniteQuery({
  //   queryKey: ["/projects", authState],
  //   getNextPageParam: (lastPage, pages) => lastPage?;
  //   queryFn: () => {
  //     const { token } = authState;
  //
  //     const params = `?size=${pageSize}&sort=createdAt&page=${page}`;
  //     const headers = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };
  //
  //     return token ? fetchProjects(headers, params) : null;
  //   },
  // });

  const feedItems = useMemo(() => {
    return projectsPage?.content.map((project) => (
      <ProjectPreview
        className="feed__project-preview"
        title={project.title}
        description={project.description}
        key={project.id + project.title}
      />
    ));
  }, [projectsPage]);

  return isLoading ? (
    <div>Loading gif</div>
  ) : error ? (
    <div>Error</div>
  ) : (
    <main className="feed" role="feed">
      <button onClick={makeDummies}>New Project</button>
      {feedItems}
    </main>
  );
};
