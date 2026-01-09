package br.com.agoravai.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class AgoraVaiService {

    private final List<String> dicas = List.of(
            "Levante-se e alongue-se por 3 minutos",
            "Faça uma pausa consciente respirando profundamente",
            "Trabalhe 25 minutos focado, depois faça 5 min de descanso",
            "Beba água e mantenha-se hidratado",
            "Liste suas 3 prioridades do dia"
    );

    private final Random random = new Random();

    public String dicaAleatoria() {
        return dicas.get(random.nextInt(dicas.size()));
    }
}
