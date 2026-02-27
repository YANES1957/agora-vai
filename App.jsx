import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState, createContext, useContext, useRef } from "react";
import "./App.css";

/* CONTEXTOS */
const ThemeContext = createContext();
const PersonalContext = createContext();

/* 🔊 SOM DE NOTIFICAÇÃO */
function playNotificationSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = 880;
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.3);
  gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 3.5);
  oscillator.start();
  oscillator.stop(ctx.currentTime + 3.5);
}

/* TIMER */
function useCompleteTimer() {
  const [timeLeft, setTimeLeft] = useState(null);
  const [activeKey, setActiveKey] = useState(null);
  const timerRef = useRef(null);

  const toggle = (key, seconds, onComplete) => {
    if (activeKey === key) {
      clearInterval(timerRef.current);
      setActiveKey(null);
      setTimeLeft(null);
      return;
    }
    if (activeKey && activeKey !== key) {
      clearInterval(timerRef.current);
    }
    setActiveKey(key);
    setTimeLeft(seconds);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setActiveKey(null);
          onComplete && onComplete();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return { timeLeft, toggle };
}

/* SIDE */
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

/* ÁGUA */
function Agua() {
  const [msg, setMsg] = useState(false);
  const timer = useCompleteTimer();
  const showMessage = () => {
    setMsg(true);
    playNotificationSound();
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
    playNotificationSound();
    setTimeout(() => setMsg(false), 3000);
  };
  return (
    <div className="page">
      <h2 className="page-title green-text">Atividade Física</h2>
      <div className="activity-groups">
        {grupos.map(grupo => (
          <div key={grupo} className="activity-group">
            <h4>{grupo}</h4>
            {tempos.map(t => (
              <button key={grupo+t.label} className="btn neon green small" onClick={() => timer.toggle(`${grupo}-${t.value}`, t.value, showMessage)}>
                {t.label}
              </button>
            ))}
          </div>
        ))}
      </div>
      <SideTimer title="Atividade Física" timeLeft={timer.timeLeft} />
      {msg && <SideMessage text="Parabéns, atividade física realizada!" />}
      <FooterBack />
    </div>
  );
}

/* APP */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/agua" element={<Agua />} />
        <Route path="/atividade" element={<Atividade />} />
      </Routes>
    </BrowserRouter>
  );
}
