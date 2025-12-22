package com.agoravai.agora_vai.controller;

import com.agoravai.agora_vai.model.UserStatus;
import com.agoravai.agora_vai.service.WellBeingService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/status")
public class WellBeingController {

    private final WellBeingService service;

    public WellBeingController(WellBeingService service) {
        this.service = service;
    }

    @GetMapping("/{name}")
    public UserStatus getStatus(@PathVariable String name) {
        return service.checkStatus(name);
    }
}
