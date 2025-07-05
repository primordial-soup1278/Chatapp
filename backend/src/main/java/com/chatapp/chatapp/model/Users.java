package com.chatapp.chatapp.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

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

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "user_friends",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "friend_id")
    )
    private Set<Users> friends = new HashSet<>();

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

    public Set<Users> getFriends() {return friends;}
    public void setFriends(Set<Users> friends) {this.friends = friends;}

    // Helper methods for managing friends
    public void addFriend(Users friend) {
        this.friends.add(friend);
        friend.getFriends().add(this);
    }

    public void removeFriend(Users friend) {
        this.friends.remove(friend);
        friend.getFriends().remove(this);
    }

    public boolean isFriendWith(Users user) {
        return this.friends.contains(user);
    }
}



