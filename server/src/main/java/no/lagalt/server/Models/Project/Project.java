package no.lagalt.server.Models.Project;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import no.lagalt.server.Models.Industry.Industry;
import no.lagalt.server.Models.LagaltUser.LagaltUser;
import no.lagalt.server.Models.MessageBoard.MessageBoard;
import no.lagalt.server.Models.Notification.Notification;

@Getter
@Setter
@Entity()
@Table(name = "project")
public class Project {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "projectId")
  private int id;

  @Column(name = "title", nullable = false)
  private String title;

  @Column(name = "description", nullable = false)
  private String description;

  @Column(name = "creationDatetime")
  private Date creationDatetime;

  @Column(name = "updatedDatetime")
  private Date updatedDatetime;

  @Column(name = "link_Source")
  private String linkSource;

  @OneToMany(mappedBy = "project")
  private List<Notification> notification;

  @OneToMany()
  @JoinColumn(name = "industryId")
  private List<Industry> industry;

  @ManyToOne
  @JoinColumn(name = "lagaltuser_project")
  private LagaltUser lagaltUsers;

  @OneToOne(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
  private MessageBoard messageBoard;
}