// ==========================
// POSTS DEL BLOG
// ==========================
const postsData = [
  {
    id: 1,
    titulo: "Ansiedad: ¿Qué es y cómo identificarla?",
    resumen: "Descubre cómo reconocer los síntomas de la ansiedad y cuándo es momento de buscar ayuda.",
    fecha: "24 de junio de 2025",
    contenido: `
      <p>La ansiedad es una respuesta natural del cuerpo ante situaciones de estrés o peligro. Sin embargo, cuando esta sensación se vuelve constante e intensa, puede afectar significativamente nuestra calidad de vida.</p>
      <p>En este artículo hablaremos sobre los síntomas, tipos de ansiedad y cómo diferenciarlos del estrés cotidiano. También exploraremos cuándo es el momento adecuado para buscar ayuda profesional.</p>
    `
  },
  {
    id: 2,
    titulo: "Diferencias entre estrés y ansiedad",
    resumen: "Aunque parecidos, estos dos conceptos no son iguales. Aprende a diferenciarlos.",
    fecha: "25 de junio de 2025",
    contenido: `
      <p>Muchas personas confunden el estrés con la ansiedad, pero son condiciones distintas. El estrés suele tener una causa clara y concreta, mientras que la ansiedad puede aparecer incluso sin motivo aparente.</p>
      <p>En esta guía rápida te ayudaremos a distinguir entre ambas para que puedas tomar decisiones informadas sobre tu salud mental.</p>
    `
  }
];

// ==========================
// MOSTRAR POSTS EN INDEX.HTML
// ==========================
function mostrarPosts() {
  const contenedor = document.getElementById("posts");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  postsData.forEach(post => {
    const card = document.createElement("div");
    card.className = "post";
    card.tabIndex = 0;
    card.innerHTML = `
      <h3>${post.titulo}</h3>
      <p>${post.resumen}</p>
    `;
    card.onclick = () => {
      window.location.href = `post.html?id=${post.id}`;
    };
    contenedor.appendChild(card);
  });
}

mostrarPosts();

// ==========================
// CARGAR UN POST INDIVIDUAL
// ==========================
function cargarPost() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const post = postsData.find(p => p.id === id);
  const contenedor = document.getElementById("contenido-post");

  if (!contenedor) return;

  if (post) {
    document.title = post.titulo + " | PsicoForo";
    contenedor.innerHTML = `
      <h2>${post.titulo}</h2>
      <p><strong>Publicado el:</strong> ${post.fecha}</p>
      ${post.contenido}
    `;
  } else {
    contenedor.innerHTML = "<h2>Post no encontrado</h2><p>Este post no existe o fue eliminado.</p>";
  }
}

if (window.location.pathname.includes("post.html")) {
  cargarPost();
}

// ==========================
// MODO CLARO/OSCURO
// ==========================
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("modoOscuro", document.body.classList.contains("dark") ? "1" : "0");
}

if (localStorage.getItem("modoOscuro") === "1") {
  document.body.classList.add("dark");
}

// ==========================
// LOGIN Y REGISTRO CON FIREBASE
// ==========================

// Mostrar formulario login o registro
function mostrarFormulario(form) {
  const loginForm = document.getElementById("form-login");
  const registerForm = document.getElementById("form-register");
  const tabLogin = document.getElementById("tab-login");
  const tabRegister = document.getElementById("tab-register");
  const status = document.getElementById("loginStatus");

  status.innerText = "";
  status.className = "";

  if (form === "login") {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");
  } else {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    tabLogin.classList.remove("active");
    tabRegister.classList.add("active");
  }
}

// Login con Firebase
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const status = document.getElementById("loginStatus");

  status.className = "";
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      status.classList.add("success");
      status.innerText = "Bienvenido, " + userCredential.user.email;
      // Aquí puedes agregar redirección o cerrar modal
    })
    .catch(error => {
      status.classList.add("error");
      status.innerText = "Error: " + error.message;
    });
}

// Registro con Firebase
function registrarse() {
  const email = document.getElementById("email-reg").value;
  const password = document.getElementById("password-reg").value;
  const status = document.getElementById("loginStatus");

  status.className = "";
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      status.classList.add("success");
      status.innerText = "Cuenta creada para " + userCredential.user.email;
    })
    .catch(error => {
      status.classList.add("error");
      status.innerText = "Error: " + error.message;
    });
}