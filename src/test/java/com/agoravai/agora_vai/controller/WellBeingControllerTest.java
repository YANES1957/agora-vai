package com.agoravai.agora_vai.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class WellBeingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldReturnUserStatus() throws Exception {
        mockMvc.perform(get("/api/status/Yanes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Yanes"))
                .andExpect(jsonPath("$.status").value("Motivado 🚀"));
    }
}
