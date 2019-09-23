import React from "react";

const About = () => {
  return (
    <div className="container">
      <div className="col-jm">
        <h2>About John Moran</h2>
        <p>Tengo muchas ganas trabajar en Front End y usar React, Vue o Angular. Tengo un pasíon aprender y hacer más proyectos</p>
        <h3>Sobre esta prueba:</h3>
        <a href="https://github.com/artworkjpm/bestiario-dropDownChart" target="_blank" rel="noopener noreferrer">
          <img src="github-brands.svg" alt="" height="30" />
          <span className="centerLink">Link to Github repo</span>
        </a>
        <p>
          He decidido usar <b>React</b> porque últimamente estoy usando React la mayoría de tempo,( y me encanta CREATE-REACT-APP! programa), pero he hecho proyectos en <b>Vue.js</b> y <b>Angular </b>y no me importa cual lo uso para proyectos. Para esto prueba era bastante fácil porque recientemente he hecho un proyecto usando <b>Chart.js</b>, y tengo conocimientos a usarlo.
          Prefiero usar <b>Chart.js</b> en lugar de <b>D3.js</b> porque he encontrado <b>chart.js</b> estar más fácil, pero también he hecho un proyecto con <b>d3.js</b> antes. Solo quiero juntar un equipo y hacer cosas de
          <b> Front End </b>, <b>UX</b>, <b>diseñar</b>, cualquier cosas que tengas o necesitas. Estoy probando escribir en Castellano para mostrarte quedo puedo escribir en esta idioma, pero probablemente ha frases un poco raro :D
        </p>
        <p>
          Este pagina es <b>mobile responsive</b>
        </p>

        <h3>Aquí no usa un Framework de CSS!</h3>
        <p>
          He decidido a no usar <b>BOOTSTRAP</b> o similar libraries de CSS para demonstrar que no son necesario siempre, por eso puedes ver que he hecho en <b>TOPNAV</b> menu que funciona con la código he puesto. Pero en general yo prefiero usar frameworks de estilo como <b>BOOTSTRAP</b> o <b> Material UI</b> porque ahorramos mucho tiempo
        </p>
      </div>
    </div>
  );
};

export default About;
