package br.com.agoravai.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/agora-vai")
public class AgoraVaiController {

    @GetMapping("/status")
    public Map<String, Object> status() {
        return Map.of(
                "app", "Agora Vai 💪😉",
                "status", "online",
                "mensagem", "Comece com 5 minutos focados e uma pausa consciente.",
                "timestamp", LocalDateTime.now()
        );
    }

    @GetMapping("/hoje")
    public Map<String, Object> hoje() {
        return Map.of(
                "foco", "5 minutos de atenção plena",
                "pausa", "levante-se, respire e alongue",
                "humor", "não tente vencer o dia inteiro, vença o próximo passo"
        );
    }
}
