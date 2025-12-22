function startBreak() {
    const alertBox = document.getElementById('alert-box');
    const username = document.getElementById('username').innerText;
    
    // Mensagem de parabéns personalizada
    alertBox.innerText = 'Parabéns, ' + username + '! Hora de cuidar de você!';
    
    // Som simples (alerta)
    const audio = new Audio('/audio/alert.mp3');
    audio.play();
    
    // Pequena animação (piscando mascote)
    const mascote = document.getElementById('mascote');
    mascote.style.transform = 'scale(1.2)';
    setTimeout(() => { mascote.style.transform = 'scale(1)'; }, 1000);
    
    // Sugestão de atividade (IA simulada)
    const activities = [
        'Beba um copo de água 💧',
        'Faça um alongamento rápido 🧘',
        'Leia uma frase motivacional 📖',
        'Respire profundamente por 1 minuto 🌬️',
        'Dê uma caminhada rápida pela sala 🚶'
    ];
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    setTimeout(() => { alertBox.innerText += '\nSugestão: ' + randomActivity; }, 1500);
}
