package com.chatapp.chatapp.model;

import jakarta.persistence.*;

@Entity
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    private String displayName;
    private boolean onlineStatus;

    public Users() {}

    public Users(String username, String password, String displayName) {
       this.username = username;
       this.password = password;
       this.displayName = displayName;
    }

    // getters and setters
    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public String getUsername() {return username;}
    public void setUsername(String username) {this.username = username;}

    public String getPassword() {return password;}
    public void setPassword(String password) {this.password = password;}

    public String getDisplayName() {return displayName;}
    public void setDisplayName(String displayName) {this.displayName = displayName;}

    public boolean getOnlineStatus() {return onlineStatus;}
    public void setOnlineStatus(boolean onlineStatus) {this.onlineStatus = onlineStatus;}
}

