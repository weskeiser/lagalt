package com.example.server.Models.LagaltUser;

import com.example.server.Models.Country.Country;
import com.example.server.Models.History.History;
import com.example.server.Models.Project.Project;
import com.example.server.Models.Skill.Skill;
import com.example.server.Utils.Enum.Gender;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Entity(name = "lagaltUser")
@ToString
public class LagaltUser {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "lagaltUserId", nullable = false)
  private int lagaltUserId;

  private String avatarUrl;

  @Column(name = "userName", nullable = false)
  private String userName;

  @Column(name = "firstName", nullable = false)
  private String firstName;

  @Column(name = "lastName", nullable = false)
  private String lastName;

  @Column(name = "dob", nullable = false)
  private Date dob;

  @Column(name = "dateOfCreation", nullable = false)
  private Date dateOfCreation;

  @Column(name = "email", nullable = false)
  private String email;

  @Column(name = "gender")
  private Gender gender;

  @Column(name = "roles")
  private Enum roles;

  @Column(name = "bio", length = 510)
  private String bio;

  @OneToMany(mappedBy = "users")
  @Column(name = "users_Skills")
  private List<Skill> skills;

  @OneToMany(mappedBy = "lagaltUser")
  @Column(name = "users_Skills")
  private List<History> Histories;

  @OneToMany(mappedBy = "lagaltUsers")
  @Column(name = "userProject")
  private List<Project> projects;

  @OneToOne private Country country;
}