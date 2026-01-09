import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState, createContext, useContext, useRef } from "react";
import "./App.css";

/* CONTEXTOS */
const ThemeContext = createContext();
const PersonalContext = createContext();

/* FUNÇÃO DE SOM */
function playNotificationTone() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.type = "triangle"; // tom alegre
  oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // frequência inicial
  gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime); // volume

  oscillator.start();

  // toque de 3 segundos
  oscillator.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 3); 
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 3);

  oscillator.stop(audioCtx.currentTime + 3);
}

/* HOOK DE TIMER */
function useCompleteTimer() {
  const [timeLeft, setTimeLeft] = useState(null);
  const [activeKey, setActiveKey] = useState(null);
  const timerRef = useRef(null);
  const completedRef = useRef(false);

  const toggle = (key, seconds, onComplete) => {
    if (activeKey === key) {
      clearInterval(timerRef.current);
      setActiveKey(null);
      setTimeLeft(null);
      completedRef.current = false;
      return;
    }
    if (activeKey && activeKey !== key) {
      clearInterval(timerRef.current);
      completedRef.current = false;
    }
    setActiveKey(key);
    setTimeLeft(seconds);
    completedRef.current = true;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setActiveKey(null);
          if (completedRef.current && onComplete) {
            onComplete();
            playNotificationTone(); // toca o som junto com a mensagem
          }
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return { timeLeft, activeKey, toggle };
}

/* SIDE COMPONENTS */
function SideTimer({ title, timeLeft }) {
  if (timeLeft === null) return null;
  return (
    <div className="side-box">
      <h4>{title}</h4>
      <div className="side-timer">
        {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
      </div>
    </div>
  );
}

function SideMessage({ text }) {
  return <div className="side-box message">{text}</div>;
}

/* FOOTER */
function FooterBack() {
  const navigate = useNavigate();
  return (
    <div className="footer">
      <button className="btn neon purple" onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
}

/* HOME */
function Home() {
  const navigate = useNavigate();
  return (
    <div className="page home">
      <h1 className="home-title purple-text">Agora Vai</h1>
      <img src="/astronauta.png" className="home-astronaut" />
      <div className="home-buttons">
        <button className="btn neon purple" onClick={() => navigate("/menu")}>Menu</button>
        <button className="btn neon purple" onClick={() => navigate("/personalizar")}>Personalizar</button>
        <button className="btn neon purple" onClick={() => navigate("/configuracoes")}>Configurações</button>
      </div>
    </div>
  );
}

/* MENU */
function Menu() {
  const navigate = useNavigate();
  const { favoritos } = useContext(PersonalContext);
  const baseMenu = [
    { name: "Água", path: "/agua", color: "blue" },
    { name: "Atividade Física", path: "/atividade", color: "green" },
    { name: "ASMR", path: "/asmr", color: "yellow" },
    { name: "Saúde Mental", path: "/saude", color: "pink" },
    { name: "Tecnologia", path: "/tecnologia", color: "orange" },
    { name: "Músicas Relaxantes", path: "/musicas", color: "red" }
  ];
  const menuFinal = favoritos.length ? favoritos : baseMenu;
  return (
    <div className="page">
      <h2 className="page-title">Menu</h2>
      {menuFinal.map((o, i) => (
        <button key={i} className={`btn neon ${o.color}`} onClick={() => navigate(o.path)}>
          {o.name}
        </button>
      ))}
      <FooterBack />
    </div>
  );
}

/* ÁGUA */
function Agua() {
  const [msg, setMsg] = useState(false);
  const timer = useCompleteTimer();

  const showMessage = () => {
    setMsg(true);
    setTimeout(() => setMsg(false), 3000);
  };

  return (
    <div className="page">
      <h2 className="page-title blue-text">Hora de beber água</h2>
      <button className="btn neon blue" onClick={() => timer.toggle("30", 1800, showMessage)}>30 Min</button>
      <button className="btn neon blue" onClick={() => timer.toggle("60", 3600, showMessage)}>60 Min</button>
      <button className="btn neon blue" onClick={() => timer.toggle("180", 10800, showMessage)}>3 Horas</button>

      <SideTimer title="Beber Água" timeLeft={timer.timeLeft} />
      {msg && <SideMessage text="Gostaria de beber água novamente?" />}
      <FooterBack />
    </div>
  );
}

/* ATIVIDADE */
function Atividade() {
  const [msg, setMsg] = useState(false);
  const timer = useCompleteTimer();

  const grupos = ["Coluna","Perna","Peitoral","Mão","Pescoço","Ombros","Punho"];
  const tempos = [{ label:"30s", value:30 }, { label:"1 min", value:60 }, { label:"3 min", value:180 }];

  const showMessage = () => {
    setMsg(true);
    setTimeout(() => setMsg(false), 3000);
  };

  return (
    <div className="page">
      <h2 className="page-title green-text">Vamos alongar o corpo?</h2>
      <div className="activity-groups">
        {grupos.map(grupo => (
          <div key={grupo} className="activity-group">
            <h4>{grupo}</h4>
            {tempos.map(t => (
              <button
                key={grupo+t.label}
                className="btn neon green small"
                onClick={() => timer.toggle(`${grupo}-${t.value}`, t.value, showMessage)}
              >
                {t.label}
              </button>
            ))}
          </div>
        ))}
      </div>
      <SideTimer title="Atividade Física" timeLeft={timer.timeLeft} />
      {msg && <SideMessage text="Parabéns! Atividade física realizada!" />}
      <FooterBack />
    </div>
  );
}

/* PAGINAS DE TEMAS */
function TemaPage({ title, spotify }) {
  const navigate = useNavigate();
  return (
    <div className="page">
      <h2 className="page-title">{title}</h2>
      <div className="tema-buttons">
        <button className="btn neon red" onClick={() => window.open(`https://www.youtube.com/results?search_query=${title}`, "_blank")}>YouTube</button>
        <button className="btn neon green" onClick={() => window.open(spotify, "_blank")}>Spotify</button>
        <button className="btn neon lightblue" onClick={() => window.open(`https://www.google.com/search?q=${title}`, "_blank")}>Gemini</button>
      </div>
      <FooterBack />
    </div>
  );
}

/* PERSONALIZAR */
function Personalizar() {
  const navigate = useNavigate();
  const { favoritos, setFavoritos } = useContext(PersonalContext);
  const baseMenu = [
    { name: "Água", path: "/agua", color: "blue" },
    { name: "Atividade Física", path: "/atividade", color: "green" },
    { name: "ASMR", path: "/asmr", color: "yellow" },
    { name: "Saúde Mental", path: "/saude", color: "pink" },
    { name: "Tecnologia", path: "/tecnologia", color: "orange" },
    { name: "Músicas Relaxantes", path: "/musicas", color: "red" }
  ];
  return (
    <div className="page">
      <h2 className="page-title">Personalizar</h2>
      <div className="personalizar-container">
        <button className="btn neon purple circle"
          onClick={() => setFavoritos(f => f.length < baseMenu.length ? [...f, baseMenu[f.length]] : f)}
        >+</button>

        <div className="personalizar-centro">
          {favoritos.map((o,i) => (
            <button key={i} className={`btn neon ${o.color}`} onClick={() => navigate(o.path)}>
              {o.name}
            </button>
          ))}
        </div>

        <button className="btn neon purple circle" onClick={() => setFavoritos(f => f.slice(0,-1))}>-</button>
      </div>
      <FooterBack />
    </div>
  );
}

/* CONFIGURAÇÕES */
function Configuracoes() {
  const { setTheme } = useContext(ThemeContext);
  return (
    <div className="page center">
      <h2 className="page-title">Configurações</h2>
      <button className="btn neon purple" onClick={() => setTheme("dark")}>Escuro</button>
      <button className="btn neon purple" onClick={() => setTheme("light")}>Claro</button>
      <FooterBack />
    </div>
  );
}

/* APP */
export default function App() {
  const [theme, setTheme] = useState("dark");
  const [favoritos, setFavoritos] = useState([]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <PersonalContext.Provider value={{ favoritos, setFavoritos }}>
        <div className={`app ${theme}`}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/agua" element={<Agua />} />
              <Route path="/atividade" element={<Atividade />} />
              <Route path="/asmr" element={<TemaPage title="ASMR" spotify="https://open.spotify.com/search/asmr" />} />
              <Route path="/saude" element={<TemaPage title="Saúde Mental" spotify="https://open.spotify.com/search/saude%20mental/podcasts" />} />
              <Route path="/tecnologia" element={<TemaPage title="Tecnologia" spotify="https://open.spotify.com/search/tecnologia/podcasts" />} />
              <Route path="/musicas" element={<TemaPage title="Músicas Relaxantes" spotify="https://open.spotify.com/search/musicas%20relaxantes" />} />
              <Route path="/personalizar" element={<Personalizar />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
            </Routes>
          </BrowserRouter>
        </div>
      </PersonalContext.Provider>
    </ThemeContext.Provider>
  );
}
