package com.agoravai.agora_vai.service;

import com.agoravai.agora_vai.model.UserStatus;
import org.springframework.stereotype.Service;

@Service
public class WellBeingService {

    public UserStatus checkStatus(String name) {
        return new UserStatus(name, "Motivado 🚀");
    }
}
