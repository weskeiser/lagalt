package com.example.server.Models.System;


import com.example.server.Models.Users.LagaltUser;
import com.example.server.Models.Users.Project;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "History")
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hisotryId", nullable = false)
    private int hisotryId;


    @OneToMany
    @Column(name = "seenProject")
    private List<Project> seenProject;

    @OneToMany
    @Column(name = "clickedProject")
    private List<Project> clickedProject;


    @ManyToOne
    @JoinColumn(name = "lagalt_user")
    private LagaltUser lagaltUser;

}
