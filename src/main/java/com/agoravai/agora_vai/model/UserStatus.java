package com.agoravai.agora_vai.model;

public class UserStatus {

    private String name;
    private String status;

    public UserStatus(String name, String status) {
        this.name = name;
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public String getStatus() {
        return status;
    }
}
