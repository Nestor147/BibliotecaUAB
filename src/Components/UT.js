export default class UT {
  static docenteSemestreActual = 'asignaturas-2023-1';
  static estudiantesSemestreActual = 'visitas-2023-1';
  static extension = "@uab.edu.bo";
  /*static carreras = [
    "Ingenieria de Sistemas",
    "Ingeniería en Redes y Telecomunicaciones",
    "Ingeniería Ambiental",
    "Contaduría Pública",
    "Administración de Empresas",
    "Ingeniería Comercial",
    "Ingeniería Financiera",
    "Enfermería",
    "Fisioterapia y Kinesiología",
    "Nutrición",
    "Bioquímica",
    "Teología",
    "Psicopedagogía",
    "Psicología",
    "Ciencias de la Actividad Física y Deportes"
  ];*/

  static carreras = [
    "Bioquímica",
    "Fisioterapia y Kinesiología",
    "Nutrición y Dietética",
    "Enfermería",
    "Actividad Física y Deportes",
    "Piscopedagogía",
    "Psicología",
    "Teología",
    "Ingeniería en Redes y Telecomunicaciones",
    "Administración y Negocios Internacionales",
    "Contaduría Pública",
    "Ingeniería Comercial",
    "Ingeniería de Sistemas",
    "Ingeniería Ambiental"
  ]

  static getidCorreo(correo) {
    return correo.replace("@uab.edu.bo", "").replace(".", "");
  }

  static getListaHoras(datos) {
    let lista = []
    for (let i = 0; i < datos.length; i++) {
      const tiempo = datos[i].total.split(':');
      const horas = parseFloat(tiempo[0]);
      const minutos = parseFloat(tiempo[1]) / 60;
      const segundos = parseFloat(tiempo[2]) / 3600;
      let totalHoras = horas + minutos + segundos;
      lista.push(totalHoras);
    }

    return lista;
  }

  /*static getListasHorasMatriz(datos) {
    let listaMatriz = [];
    for (let i = 0; i < datos.length; i++) {
      let valorActual = datos[i];
      let sumAct = 0;
      for (let k = 0; k < datos.length; k++) {
        if (valorActual.dia === datos[i].dia) {
          sumAct = sumAct +
        }
      }
    }
  }*/

  static getValorHora(hora) {
    const tiempo = hora.split(':');
    const horas = parseFloat(tiempo[0]);
    const minutos = parseFloat(tiempo[1]) / 60;
    const segundos = parseFloat(tiempo[2]) / 3600;
    let totalHoras = horas + minutos + segundos;
    return totalHoras;
  }

  static getListaDias(datos, mes) {
    let lista = []
    for (let i = 0; i < datos.length; i++) {
      let dato = datos[i].dia + " de " + mes;
      lista.push(dato);
    }
    return lista;
  }

  static getGestionActual() {
    let fecha = new Date();
    return fecha.getFullYear();
  }

  static getMesActual() {
    let fecha = new Date();
    return fecha.getMonth() + 1;
  }

  static correosAdmin = ["nestor.villca@uab.edu.bo", "ivan.flores@uab.edu.bo", "jhonmorales12020@gmail.com", "obed.castro@uab.edu.bo", "weslley.gazana@uab.edu.bo", "alfredo.santacruz@uab.edu.bo", "christian.arnez@uab.edu.bo"];
  //static correosRecepcion = ["nestor.villca@uab.edu.bo", "crai.info@uab.edu.bo"];
  static semestreActual = "2023-1";
  static mesesNombres = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
}