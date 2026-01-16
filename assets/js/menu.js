/**
 * ALKE WALLET - Menú Principal
 * menu.js - Manejo del menú y estadísticas con jQuery
 * Desarrollado para el Bootcamp SENCE 2025
 */

$(document).ready(function () {
  console.log("🏠 Menú Principal Cargado - Alke Wallet");

  // Verificar autenticación
  verificarAutenticacion();

  // Cargar datos del usuario
  cargarDatosUsuario();

  // Mostrar saldo actual
  mostrarSaldoActual();

  // Mostrar estadísticas
  mostrarEstadisticas();

  // Eventos de los botones
  configurarEventos();

  /**
   * Verificar si el usuario está autenticado
   */
  function verificarAutenticacion() {
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");

    if (!usuarioLogueado) {
      console.log("❌ Usuario no autenticado, redirigiendo al login...");
      alert("⚠️ Debes iniciar sesión primero");
      window.location.href = "index.html";
      return;
    }

    console.log("✅ Usuario autenticado:", usuarioLogueado);
  }

  /**
   * Cargar datos del usuario en la interfaz
   */
  function cargarDatosUsuario() {
    const nombre = localStorage.getItem("nombreUsuario") || "Usuario";
    const apellido = localStorage.getItem("apellidoUsuario") || "";

    $("#nombreUsuario").text(`👤 ${nombre} ${apellido}`);
    console.log("📝 Datos de usuario cargados:", nombre, apellido);
  }

  /**
   * Mostrar saldo actual con formato
   */
  function mostrarSaldoActual() {
    const saldo = parseFloat(localStorage.getItem("saldo")) || 0;
    $("#saldoActual")
      .text("$" + formatearNumero(saldo))
      .addClass("fade-in");

    console.log("💰 Saldo actual mostrado: $" + formatearNumero(saldo));
  }

  /**
   * Mostrar estadísticas de actividad
   */
  function mostrarEstadisticas() {
    const movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
    const contactos = JSON.parse(localStorage.getItem("contactos")) || [];

    let totalDepositos = 0;
    let totalTransferencias = 0;
    let contadorDepositos = 0;
    let contadorTransferencias = 0;

    // Contar movimientos y calcular totales
    movimientos.forEach(function (mov) {
      if (mov.tipo === "deposito") {
        contadorDepositos++;
      } else if (mov.tipo === "transferencia") {
        contadorTransferencias++;
      }
    });

    // Actualizar interfaz con animación
    $("#totalDepositos").text(contadorDepositos).addClass("fade-in");
    $("#totalTransferencias").text(contadorTransferencias).addClass("fade-in");
    $("#totalContactos").text(contactos.length).addClass("fade-in");
    $("#totalMovimientos").text(movimientos.length).addClass("fade-in");

    console.log("📊 Estadísticas cargadas:");
    console.log(`   💰 Depósitos: ${contadorDepositos}`);
    console.log(`   💸 Transferencias: ${contadorTransferencias}`);
    console.log(`   👥 Contactos: ${contactos.length}`);
    console.log(`   📋 Total Movimientos: ${movimientos.length}`);
  }

  /**
   * Configurar eventos de los botones
   */
  function configurarEventos() {
    // Botón Depositar
    $("#btnDeposit").on("click", function () {
      const pagina = $(this).data("page");
      console.log("📍 Navegando a:", pagina);
      window.location.href = pagina;
    });

    // Botón Enviar Dinero
    $("#btnSendMoney").on("click", function () {
      const pagina = $(this).data("page");
      console.log("📍 Navegando a:", pagina);
      window.location.href = pagina;
    });

    // Botón Transacciones
    $("#btnTransactions").on("click", function () {
      const pagina = $(this).data("page");
      console.log("📍 Navegando a:", pagina);
      window.location.href = pagina;
    });

    // Botón Cerrar Sesión
    $("#btnCerrarSesion").on("click", function () {
      cerrarSesion();
    });

    console.log("✅ Eventos configurados correctamente");
  }

  /**
   * Cerrar sesión del usuario
   */
  function cerrarSesion() {
    const confirmar = confirm("¿Estás seguro de que deseas cerrar sesión?");

    if (confirmar) {
      console.log("👋 Cerrando sesión...");

      // Obtener datos antes de limpiar (para mantener movimientos y contactos)
      const movimientos = localStorage.getItem("movimientos");
      const contactos = localStorage.getItem("contactos");
      const saldo = localStorage.getItem("saldo");

      // Limpiar solo datos de sesión
      localStorage.removeItem("usuarioLogueado");
      localStorage.removeItem("nombreUsuario");
      localStorage.removeItem("apellidoUsuario");
      localStorage.removeItem("idUsuario");

      // Si quieres mantener los datos entre sesiones, comenta estas líneas:
      // localStorage.removeItem("saldo");
      // localStorage.removeItem("movimientos");
      // localStorage.removeItem("contactos");

      console.log("✅ Sesión cerrada exitosamente");
      alert("👋 Has cerrado sesión correctamente");

      // Redirigir al login
      window.location.href = "index.html";
    }
  }

  /**
   * Función para formatear números con separador de miles
   * @param {number} num - Número a formatear
   * @returns {string} - Número formateado
   */
  function formatearNumero(num) {
    return Math.floor(num).toLocaleString("es-CL");
  }

  // Actualizar saldo cada 5 segundos (por si se modifica en otra pestaña)
  setInterval(function () {
    const saldoAnterior = $("#saldoActual").text();
    mostrarSaldoActual();
    const saldoNuevo = $("#saldoActual").text();

    if (saldoAnterior !== saldoNuevo) {
      console.log("🔄 Saldo actualizado automáticamente");
    }
  }, 5000);

  // Efecto hover en las tarjetas de acción
  $(".action-card").hover(
    function () {
      $(this).find(".icon-circle").css("transform", "scale(1.1)");
    },
    function () {
      $(this).find(".icon-circle").css("transform", "scale(1)");
    }
  );

  // Animación de entrada para las tarjetas
  $(".action-card").each(function (index) {
    $(this).css({
      opacity: 0,
      transform: "translateY(20px)",
    });

    setTimeout(() => {
      $(this).animate({ opacity: 1 }, 500);
      $(this).css({
        transform: "translateY(0)",
        transition: "transform 0.5s ease",
      });
    }, index * 100);
  });

  console.log("✅ Menú Principal listo para usar");
});
