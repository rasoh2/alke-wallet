/**
 * ALKE WALLET - Sistema de Autenticación
 * login.js - Manejo del inicio de sesión con jQuery
 * Desarrollado para el Bootcamp SENCE 2025
 */

$(document).ready(function () {
  console.log("🚀 Sistema de Login Cargado - Alke Wallet");

  let usuarios = [];

  // Cargar usuarios desde el archivo JSON
  $.ajax({
    url: "assets/data/usuarios.json",
    method: "GET",
    dataType: "json",
    success: function (data) {
      usuarios = data;
      console.log("✅ Usuarios cargados desde BD:", usuarios.length);
      console.log("════════════════════════════════════════");
      console.log("📋 USUARIOS DISPONIBLES PARA PRUEBA:");
      console.log("════════════════════════════════════════");
      usuarios.forEach((u, index) => {
        console.log(`\n👤 Usuario ${index + 1}:`);
        console.log(`   📧 Email: ${u.email}`);
        console.log(`   🔒 Contraseña: ${u.password}`);
        console.log(`   👤 Nombre: ${u.nombre} ${u.apellido}`);
        console.log(`   💰 Saldo Inicial: $${formatearNumero(u.saldoInicial)}`);
      });
      console.log("\n════════════════════════════════════════");
    },
    error: function (xhr, status, error) {
      console.error("❌ Error al cargar usuarios:", error);
      // Credenciales de respaldo por si falla la carga
      usuarios = [
        {
          id: 1,
          email: "user@wallet.com",
          password: "12345",
          nombre: "Usuario",
          apellido: "Demo",
          saldoInicial: 250000,
        },
      ];
      console.log("⚠️ Usando credenciales por defecto");
    },
  });

  // Evento submit del formulario de login
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    // Obtener valores del formulario
    const email = $("#email").val().trim();
    const password = $("#password").val();

    console.log("🔍 Intento de inicio de sesión:", email);

    // Validar que los campos no estén vacíos
    if (!email || !password) {
      mostrarAlerta("⚠️ Por favor completa todos los campos", "warning");
      return;
    }

    // Buscar usuario en el array
    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (usuarioEncontrado) {
      console.log("✅ Inicio de sesión exitoso");
      console.log(
        "Usuario:",
        usuarioEncontrado.nombre,
        usuarioEncontrado.apellido
      );

      // Guardar datos del usuario en localStorage
      localStorage.setItem("usuarioLogueado", email);
      localStorage.setItem("nombreUsuario", usuarioEncontrado.nombre);
      localStorage.setItem("apellidoUsuario", usuarioEncontrado.apellido);
      localStorage.setItem("idUsuario", usuarioEncontrado.id);

      // Inicializar saldo si no existe
      if (!localStorage.getItem("saldo")) {
        localStorage.setItem(
          "saldo",
          usuarioEncontrado.saldoInicial.toString()
        );
        console.log("💰 Saldo inicializado:", usuarioEncontrado.saldoInicial);
      }

      // Inicializar movimientos si no existen
      if (!localStorage.getItem("movimientos")) {
        localStorage.setItem("movimientos", JSON.stringify([]));
      }

      // Mostrar alerta de éxito
      mostrarAlerta(
        `¡Bienvenido ${usuarioEncontrado.nombre}! 🎉<br>Redirigiendo al menú principal...`,
        "success"
      );

      // Redirigir después de 1 segundo
      setTimeout(function () {
        window.location.href = "menu.html";
      }, 1000);
    } else {
      console.log("❌ Credenciales incorrectas");

      // Mostrar alerta de error
      mostrarAlerta(
        "❌ Credenciales incorrectas<br><small>Verifica tu email y contraseña</small>",
        "danger"
      );

      // Limpiar campo de contraseña
      $("#password").val("").focus();

      // Agregar animación de shake al formulario
      $("#loginForm").addClass("shake");
      setTimeout(function () {
        $("#loginForm").removeClass("shake");
      }, 500);

      // Ocultar alerta después de 3 segundos
      setTimeout(function () {
        $("#alert-container").fadeOut(400, function () {
          $(this).empty().show();
        });
      }, 3000);
    }
  });

  /**
   * Función para mostrar alertas de Bootstrap dinámicamente
   * @param {string} mensaje - Mensaje a mostrar
   * @param {string} tipo - Tipo de alerta (success, danger, warning, info)
   */
  function mostrarAlerta(mensaje, tipo) {
    // Limpiar alertas anteriores
    $("#alert-container").empty();

    // Crear alerta de Bootstrap con jQuery
    const alerta = $("<div></div>")
      .addClass(`alert alert-${tipo} alert-dismissible fade show`)
      .attr("role", "alert")
      .html(
        `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `
      );

    // Agregar al contenedor con animación
    $("#alert-container").append(alerta).hide().fadeIn(400);
  }

  /**
   * Función para formatear números con separador de miles
   * @param {number} num - Número a formatear
   * @returns {string} - Número formateado
   */
  function formatearNumero(num) {
    return Math.floor(num).toLocaleString("es-CL");
  }

  // Verificar si el usuario ya está logueado
  if (localStorage.getItem("usuarioLogueado")) {
    console.log("👤 Usuario ya autenticado, redirigiendo...");
    window.location.href = "menu.html";
  }

  // Efecto de focus en los campos del formulario
  $(".form-control").on("focus", function () {
    $(this).parent().addClass("input-focused");
  });

  $(".form-control").on("blur", function () {
    $(this).parent().removeClass("input-focused");
  });

  // Prevenir doble submit
  let formularioEnviado = false;
  $("#loginForm").on("submit", function () {
    if (formularioEnviado) {
      return false;
    }
    formularioEnviado = true;
    setTimeout(function () {
      formularioEnviado = false;
    }, 2000);
  });

  console.log("✅ Sistema de Login listo para usar");
});

// Animación de shake para el formulario
const style = document.createElement("style");
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
  }
  .shake {
    animation: shake 0.5s;
  }
`;
document.head.appendChild(style);
