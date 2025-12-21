package br.com.agoravai.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AgoraVaiController {

    @GetMapping("/agora-vai/hoje")
    public String hoje() {
        return "Agora vai: comece com 5 minutos focados e uma pausa consciente.";
    }
}
