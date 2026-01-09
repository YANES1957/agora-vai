package com.agoravai.agora_vai.service;

import com.agoravai.agora_vai.model.UserStatus;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class WellBeingServiceTest {

    @Test
    void shouldReturnMotivatedStatus() {
        WellBeingService service = new WellBeingService();
        UserStatus status = service.checkStatus("Yanes");

        assertEquals("Yanes", status.getName());
        assertEquals("Motivado 🚀", status.getStatus());
    }
}
