package com.example.server.Models.System;

import com.example.server.Models.Users.LagaltUser;
import com.example.server.Models.Users.Project;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name = "notification")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notificationId", nullable = false)
    private int notificationId;

    @Column(name = "ProjectName")
    private String nameOfProject;

    private String content;
    @ManyToOne()
    private LagaltUser lagaltUser;
    @ManyToOne
    private Project project;

}