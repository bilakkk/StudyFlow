
import { useState } from "react";
import {
  LayoutDashboard, CalendarDays, ClipboardList,
  GraduationCap, ChartNoAxesColumn, UserRound,
  Search, Bell, Clock, CheckCircle2, BookOpen,
  Plus, ArrowUpRight, Trash2, LogOut, Menu, X
} from "lucide-react";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("studyflowLoggedIn") === "true"
  );

  const [authMode, setAuthMode] = useState("login");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState(
    () => localStorage.getItem("studyflowEmail") || ""
  );
  const [authPassword, setAuthPassword] = useState("");
  const [authConfirm, setAuthConfirm] = useState("");
  const [authError, setAuthError] = useState("");

  const [userName, setUserName] = useState(
    () => localStorage.getItem("studyflowUserName") || "Софія Білак"
  );

  const [active, setActive] = useState("Головна");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);

  const [tasks, setTasks] = useState([
    { id: 1, title: "Лабораторна робота №2", subject: "Вебтехнології", date: "9 листопада, 18:00", done: false },
    { id: 2, title: "Практичне завдання", subject: "Математика", date: "10 листопада, 12:00", done: false },
    { id: 3, title: "Підготовка до тесту", subject: "Програмування", date: "10 листопада", done: true },
  ]);

  const [newTask, setNewTask] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newDate, setNewDate] = useState("");

  const menu = [
    { name: "Головна", icon: LayoutDashboard },
    { name: "Розклад", icon: CalendarDays },
    { name: "Завдання", icon: ClipboardList },
    { name: "Оцінки", icon: GraduationCap },
    { name: "Статистика", icon: ChartNoAxesColumn },
    { name: "Профіль", icon: UserRound },
  ];

  const lessons = [
    { time: "09:00", subject: "Програмування", detail: "Лекція · Аудиторія 305", color: "purple" },
    { time: "11:00", subject: "Математичний аналіз", detail: "Практика · Аудиторія 210", color: "blue" },
    { time: "13:00", subject: "Вебтехнології", detail: "Лабораторна · Комп'ютерний клас", color: "pink" },
  ];

  const grades = [
    { subject: "Програмування", grade: "1,5" },
    { subject: "Математичний аналіз", grade: "2,0" },
    { subject: "Вебтехнології", grade: "1,0" },
    { subject: "Статистика", grade: "1,5" },
  ];

  function handleAuth(e) {
    e.preventDefault();
    setAuthError("");

    if (!authEmail.trim() || !authPassword.trim()) {
      setAuthError("Заповни електронну пошту та пароль.");
      return;
    }

    if (authMode === "register") {
      if (!authName.trim()) {
        setAuthError("Введи своє ім'я.");
        return;
      }

      if (authPassword.length < 6) {
        setAuthError("Пароль повинен містити щонайменше 6 символів.");
        return;
      }

      if (authPassword !== authConfirm) {
        setAuthError("Паролі не збігаються.");
        return;
      }

      setUserName(authName.trim());
      localStorage.setItem("studyflowUserName", authName.trim());
    }

    localStorage.setItem("studyflowEmail", authEmail.trim());
    localStorage.setItem("studyflowLoggedIn", "true");

    setIsLoggedIn(true);
    setActive("Головна");
    setAuthPassword("");
    setAuthConfirm("");
  }

  function handleLogout() {
    localStorage.removeItem("studyflowLoggedIn");
    localStorage.removeItem("studyflowEmail");
    localStorage.removeItem("studyflowUserName");

    setIsLoggedIn(false);
    setAuthMode("login");
    setAuthPassword("");
    setAuthConfirm("");
    setAuthError("");
    setAuthEmail("");
    setUserName("Софія Білак");
    setAuthName("");
  }

  function renderAuth() {
    return (
      <div className="auth-screen">
        <div className="auth-card">
          <div className="auth-brand">
            <div className="auth-brand-icon">
              <GraduationCap size={27} />
            </div>
            <span>Study<span>Flow</span></span>
          </div>

          <h1>
            {authMode === "login" ? "З поверненням!" : "Створи акаунт"}
          </h1>

          <p className="auth-subtitle">
            {authMode === "login"
              ? "Увійди до свого навчального простору"
              : "Приєднуйся до StudyFlow та плануй навчання"}
          </p>

          <form className="auth-form" onSubmit={handleAuth}>
            {authMode === "register" && (
              <div className="auth-field">
                <label>Ім'я та прізвище</label>
                <input
                  type="text"
                  placeholder="Наприклад, Софія Білак"
                  value={authName}
                  onChange={e => setAuthName(e.target.value)}
                />
              </div>
            )}

            <div className="auth-field">
              <label>Електронна пошта</label>
              <input
                type="email"
                placeholder="example@email.com"
                value={authEmail}
                onChange={e => setAuthEmail(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <label>Пароль</label>
              <input
                type="password"
                placeholder="Введи пароль"
                value={authPassword}
                onChange={e => setAuthPassword(e.target.value)}
              />
            </div>

            {authMode === "register" && (
              <div className="auth-field">
                <label>Підтвердження пароля</label>
                <input
                  type="password"
                  placeholder="Повтори пароль"
                  value={authConfirm}
                  onChange={e => setAuthConfirm(e.target.value)}
                />
              </div>
            )}

            {authError && (
              <div className="auth-error">{authError}</div>
            )}

            <button className="auth-submit" type="submit">
              {authMode === "login" ? "Увійти" : "Зареєструватися"}
            </button>
          </form>

          <p className="auth-switch">
            {authMode === "login"
              ? "Ще не маєш акаунта?"
              : "Вже маєш акаунт?"}
            {" "}
            <button
              type="button"
              onClick={() => {
                setAuthMode(authMode === "login" ? "register" : "login");
                setAuthError("");
              }}
            >
              {authMode === "login" ? "Реєстрація" : "Увійти"}
            </button>
          </p>
        </div>
      </div>
    );
  }

  function addTask(e) {
    e.preventDefault();
    if (!newTask.trim()) return;

    const formattedDate = newDate
      ? new Date(`${newDate}T00:00:00`).toLocaleDateString("uk-UA", {
          day: "numeric",
          month: "long"
        })
      : "Без дедлайну";

    setTasks([...tasks, {
      id: Date.now(),
      title: newTask,
      subject: newSubject || "Без предмета",
      date: formattedDate,
      done: false
    }]);

    setNewTask("");
    setNewSubject("");
    setNewDate("");
  }

  function toggleTask(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function renderTasks() {
    return (
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h3>Список завдань</h3>
            <p>Керуй своїми навчальними справами</p>
          </div>
        </div>

        <form className="task-form" onSubmit={addTask}>
          <input
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            placeholder="Назва нового завдання..."
          />
          <input
            value={newSubject}
            onChange={e => setNewSubject(e.target.value)}
            placeholder="Предмет"
          />
          <input
            type="date"
            value={newDate}
            onChange={e => setNewDate(e.target.value)}
            aria-label="Дедлайн завдання"
          />
          <button className="primary-btn" type="submit">
            <Plus size={17} /> Додати
          </button>
        </form>

        <div className="task-list">
          {tasks.map(task => (
            <div className={`task-row ${task.done ? "completed" : ""}`} key={task.id}>
              <button className="task-check" onClick={() => toggleTask(task.id)}>
                {task.done ? <CheckCircle2 /> : <span />}
              </button>
              <div className="task-info">
                <strong>{task.title}</strong>
                <small>{task.subject} · {task.date}</small>
              </div>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                <Trash2 size={17} />
              </button>
            </div>
          ))}
          {tasks.length === 0 && <p>Поки що завдань немає. Додай перше!</p>}
        </div>
      </section>
    );
  }

  function renderSchedule() {
    const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

    const scheduleByDay = [
      [
        { time: "09:00", subject: "Програмування", detail: "Лекція · Аудиторія 305", color: "purple" },
        { time: "11:00", subject: "Математичний аналіз", detail: "Практика · Аудиторія 210", color: "blue" },
        { time: "13:00", subject: "Вебтехнології", detail: "Лабораторна · Комп'ютерний клас", color: "pink" },
      ],
      [
        { time: "09:00", subject: "Дискретна математика", detail: "Лекція · Аудиторія 202", color: "purple" },
        { time: "11:00", subject: "Бази даних", detail: "Практика · Аудиторія 105", color: "blue" },
      ],
      [
        { time: "10:00", subject: "Статистика", detail: "Лекція · Аудиторія 301", color: "purple" },
        { time: "12:00", subject: "Програмування", detail: "Практика · Комп'ютерний клас", color: "pink" },
      ],
      [
        { time: "09:00", subject: "Математичний аналіз", detail: "Лекція · Аудиторія 210", color: "blue" },
        { time: "12:00", subject: "Вебтехнології", detail: "Практика · Комп'ютерний клас", color: "purple" },
      ],
      [
        { time: "10:00", subject: "Бази даних", detail: "Лекція · Аудиторія 105", color: "pink" },
        { time: "12:00", subject: "Статистика", detail: "Практика · Аудиторія 301", color: "blue" },
      ],
      [],
      [],
    ];

    const selectedLessons = scheduleByDay[selectedDay];

    return (
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h3>Мій розклад</h3>
            <p>Навчальний день</p>
          </div>
        </div>

        <div className="week-days">
          {days.map((day, i) => (
            <button
              type="button"
              className={`day ${selectedDay === i ? "active-day" : ""}`}
              key={day}
              onClick={() => setSelectedDay(i)}
            >
              <small>{day}</small>
              <strong>{9 + i}</strong>
            </button>
          ))}
        </div>

        {selectedLessons.length > 0 ? (
          selectedLessons.map((lesson, i) => (
            <div className="lesson" key={i}>
              <span className="lesson-time">{lesson.time}</span>
              <div className={`lesson-dot ${lesson.color}`}></div>
              <div className="lesson-info">
                <strong>{lesson.subject}</strong>
                <small>{lesson.detail}</small>
              </div>
              <Clock size={16} className="clock-icon" />
            </div>
          ))
        ) : (
          <div className="empty-day">
            <p>🌸</p>
            <strong>На цей день занять немає</strong>
            <small style={{ display: "block", marginTop: "8px" }}>
              Час для відпочинку або самостійного навчання!
            </small>
          </div>
        )}
      </section>
    );
  }

  function renderGrades() {
    return (
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h3>Мої оцінки</h3>
            <p>Результати навчання</p>
          </div>
        </div>
        <div className="grade-summary">
          <span>Середній бал</span>
          <strong>1,5</strong>
          <small>Поточний навчальний результат</small>
        </div>
        {grades.map((item, i) => (
          <div className="grade-row" key={i}>
            <span>{item.subject}</span>
            <strong>{item.grade}</strong>
          </div>
        ))}
      </section>
    );
  }

  function renderStatistics() {
    const completed = tasks.filter(task => task.done).length;
    const percent = tasks.length ? Math.round(completed / tasks.length * 100) : 0;

    return (
      <section className="panel">
        <h3>Навчальна статистика</h3>
        <p>Твої результати та продуктивність</p>
        <div className="statistics-grid">
          <div className="stat-card">
            <div className="stat-icon purple"><ClipboardList /></div>
            <div><small>Усього завдань</small><h2>{tasks.length}</h2></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue"><CheckCircle2 /></div>
            <div><small>Виконано</small><h2>{completed}</h2></div>
          </div>
        </div>
        <div className="progress-panel">
          <div><h3>Виконання завдань</h3><p>{percent}% завершено</p></div>
          <div className="progress-right">
            <strong>{percent}%</strong>
            <div className="progress-track">
              <div style={{ width: `${percent}%` }}></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function renderProfile() {
    return (
      <section className="panel profile-panel">
        <div className="profile-avatar">{userName.charAt(0).toUpperCase()}</div>
        <h2>{userName}</h2>
        <p>Студентка · Інженерія програмного забезпечення</p>
        <div className="profile-details">
          <div><span>Ім'я</span><strong>{userName}</strong></div>
          <div><span>Електронна пошта</span><strong>{authEmail}</strong></div>
          <div><span>Навчальний заклад</span><strong>Ужгородський національний університет</strong></div>
          <div><span>Спеціальність</span><strong>Інженерія ПЗ</strong></div>
        </div>
        <button className="auth-submit" style={{ marginTop: "25px" }} onClick={handleLogout}>
          <LogOut size={17} /> Вийти з акаунта
        </button>
      </section>
    );
  }

  function renderContent() {
    switch (active) {
      case "Розклад": return renderSchedule();
      case "Завдання": return renderTasks();
      case "Оцінки": return renderGrades();
      case "Статистика": return renderStatistics();
      case "Профіль": return renderProfile();

      default:
        return (
          <>
            <section className="welcome">
              <div>
                <div className="date-label">ТВІЙ НАВЧАЛЬНИЙ ПРОСТІР</div>
                <h1>Доброго дня, {userName.split(" ")[0]}! <span>✦</span></h1>
                <p>Готова зробити ще один крок до своїх цілей?</p>
              </div>
              <div className="welcome-art"><GraduationCap size={70} /></div>
            </section>

            <section className="stats">
              <div className="stat-card">
                <div className="stat-icon purple"><CalendarDays /></div>
                <div><small>Занять сьогодні</small><h2>3</h2><span>У твоєму розкладі</span></div>
              </div>
              <div className="stat-card">
                <div className="stat-icon blue"><ClipboardList /></div>
                <div><small>Активні завдання</small><h2>{tasks.filter(t => !t.done).length}</h2><span>Не забудь про дедлайни</span></div>
              </div>
              <div className="stat-card">
                <div className="stat-icon pink"><GraduationCap /></div>
                <div><small>Середній бал</small><h2>1,5</h2><span>Поточний результат</span></div>
              </div>
            </section>

            <div className="content-grid">
              <section className="panel schedule">
                <div className="panel-heading">
                  <div><h3>Розклад на сьогодні</h3><p>Твій навчальний день</p></div>
                  <button className="text-btn" onClick={() => setActive("Розклад")}>Увесь розклад <ArrowUpRight size={15} /></button>
                </div>
                {lessons.map((lesson, i) => (
                  <div className="lesson" key={i}>
                    <span className="lesson-time">{lesson.time}</span>
                    <div className={`lesson-dot ${lesson.color}`}></div>
                    <div className="lesson-info">
                      <strong>{lesson.subject}</strong>
                      <small>{lesson.detail}</small>
                    </div>
                    <Clock size={16} className="clock-icon" />
                  </div>
                ))}
              </section>

              <section className="panel tasks">
                <div className="panel-heading">
                  <div><h3>Найближчі завдання</h3><p>Тримай усе під контролем</p></div>
                  <button className="add-btn" onClick={() => setActive("Завдання")}><Plus size={17} /></button>
                </div>
                {tasks.slice(0, 3).map(task => (
                  <div className="task" key={task.id}>
                    <div className="task-marker purple"></div>
                    <div className="task-info">
                      <strong>{task.title}</strong>
                      <small>{task.subject}</small>
                      <span><Clock size={13} /> {task.date}</span>
                    </div>
                    <CheckCircle2 size={19} className="check-icon" />
                  </div>
                ))}
              </section>
            </div>

            <section className="progress-panel">
              <div><h3>Твій навчальний прогрес</h3><p>Продовжуй у тому ж дусі — ти молодець!</p></div>
              <div className="progress-right">
                <strong>{tasks.length ? Math.round(tasks.filter(t => t.done).length / tasks.length * 100) : 0}%</strong>
                <div className="progress-track">
                  <div style={{ width: `${tasks.length ? tasks.filter(t => t.done).length / tasks.length * 100 : 0}%` }}></div>
                </div>
              </div>
            </section>
          </>
        );
    }
  }

  if (!isLoggedIn) {
    return renderAuth();
  }

  return (
    <div className="app">
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon"><GraduationCap size={25} /></div>
          <span>Study<span>Flow</span></span>
          <button className="mobile-close" onClick={() => setMobileMenu(false)}><X /></button>
        </div>

        <div className="menu-label">МЕНЮ</div>
        <nav>
          {menu.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`nav-item ${active === name ? "active" : ""}`}
              onClick={() => { setActive(name); setMobileMenu(false); }}
            >
              <Icon size={19} /> {name}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="mini-card">
            <BookOpen size={23} />
            <p>Маленькі кроки — великі результати!</p>
          </div>
          <div className="user-mini">
            <div className="avatar">{userName.charAt(0).toUpperCase()}</div>
            <div><strong>{userName}</strong><small>Студентка</small></div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={16} /> Вийти з акаунта
          </button>
        </div>
      </aside>

      {mobileMenu && <div className="overlay" onClick={() => setMobileMenu(false)}></div>}

      <main className="main">
        <header className="topbar">
          <div className="top-left">
            <button className="mobile-menu-btn" onClick={() => setMobileMenu(true)}><Menu /></button>
            <div className="breadcrumb">Мій простір / <b>{active}</b></div>
          </div>
          <div className="top-actions">
            <button className="icon-btn"><Search size={19} /></button>
            <button className="icon-btn"><Bell size={19} /></button>
            <div className="avatar">{userName.charAt(0).toUpperCase()}</div>
          </div>
        </header>

        <div className="page-content">
          {active !== "Головна" && (
            <div className="page-title">
              <h1>{active}</h1>
              <p>Керуй своїм навчанням разом зі StudyFlow</p>
            </div>
          )}
          {renderContent()}
        </div>

        <footer>© 2026 StudyFlow · Створено для твого комфортного навчання 💜</footer>
      </main>
    </div>
  );
}

export default App;
