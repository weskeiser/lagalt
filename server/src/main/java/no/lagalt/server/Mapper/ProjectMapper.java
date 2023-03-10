package no.lagalt.server.Mapper;

import java.util.List;
import java.util.Set;
import no.lagalt.server.Dtos.Project.NewProjectDto;
import no.lagalt.server.Dtos.Project.ProjectDto;
import no.lagalt.server.Dtos.Project.ProjectPreviewDto;
import no.lagalt.server.Dtos.Project.UpdateProjectDto;
import no.lagalt.server.Entity.Project;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(
    componentModel = "spring",
    uses = {SkillMapper.class, UserMapper.class})
public interface ProjectMapper {

  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "projectId", ignore = true)
  @Mapping(target = "messageBoard", ignore = true)
  // @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  Project toProject(NewProjectDto newProjectDto);

  Project toProject(UpdateProjectDto updateProjectDto);

  ProjectDto toDto(Project project);

  ProjectDto previewToDto(ProjectPreviewDto project);

  Set<ProjectDto> previewToDto(Set<ProjectPreviewDto> project);

  Set<ProjectDto> toDto(Set<Project> project);

  List<ProjectDto> toDto(List<Project> project);

  ProjectPreviewDto toPreviewDto(Project project);
}
