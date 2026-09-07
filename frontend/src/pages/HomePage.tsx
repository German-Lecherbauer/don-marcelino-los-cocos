import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import logoDonMarcelino from "../assets/logo-don-marcelino-los-cocos.png";
import "./HomePage.css";

const documentosMarcoLegal = [
    {
        nombre: "Buenos Aires",
        detalle: "Adhesión",
        archivo: "/documentos/marco-legal/buenos-aires-adhesion.docx",
    },
    {
        nombre: "Catamarca",
        detalle: "Adhesión",
        archivo: "/documentos/marco-legal/catamarca-adhesion.pdf",
    },
    {
        nombre: "Chaco",
        detalle: "Adhesión",
        archivo: "/documentos/marco-legal/chaco-adhesion.docx",
    },
    {
        nombre: "Chubut",
        detalle: "Adhesión",
        archivo: "/documentos/marco-legal/chubut-adhesion.docx",
    },
    {
        nombre: "Corrientes",
        detalle: "Adhesión",
        archivo: "/documentos/marco-legal/corrientes-adhesion.docx",
    },
    {
        nombre: "Entre Ríos",
        detalle: "Adhesión",
        archivo: "/documentos/marco-legal/entre-rios-adhesion.docx",
    },
    {
        nombre: "Jujuy",
        detalle: "Adhesión",
        archivo: "/documentos/marco-legal/jujuy-adhesion.pdf",
    },
    {
        nombre: "Jujuy",
        detalle: "Plan piloto de cultivo",
        archivo: "/documentos/marco-legal/jujuy-plan-piloto-cultivo.pdf",
    },
    {
        nombre: "La Rioja",
        detalle: "Adhesión",
        archivo: "/documentos/marco-legal/la-rioja-adhesion.docx",
    },
    {
        nombre: "Mendoza",
        detalle: "Ley Cannabis",
        archivo: "/documentos/marco-legal/mendoza-ley-cannabis.docx",
    },
    {
        nombre: "Misiones",
        detalle: "Adhesión",
        archivo: "/documentos/marco-legal/misiones-adhesion.docx",
    },
    {
        nombre: "Neuquén",
        detalle: "Previo a Ley 27.350",
        archivo: "/documentos/marco-legal/neuquen-previo-27350.docx",
    },
    {
        nombre: "Río Negro",
        detalle: "Adhesión",
        archivo: "/documentos/marco-legal/rio-negro-adhesion.docx",
    },
    {
        nombre: "Salta",
        detalle: "Antes de Ley 27.350",
        archivo: "/documentos/marco-legal/salta-antes-27350.docx",
    },
    {
        nombre: "Salta",
        detalle: "Resolución Ministerio de Salud - Epilepsia",
        archivo: "/documentos/marco-legal/salta-resolucion-min-salud-epilepsia-ref.docx",
    },
    {
        nombre: "Salta",
        detalle: "Resolución Ministerio de Salud",
        archivo: "/documentos/marco-legal/salta-resolucion-min-salud.docx",
    },
    {
        nombre: "San Juan",
        detalle: "Adhesión",
        archivo: "/documentos/marco-legal/san-juan-adhesion.docx",
    },
    {
        nombre: "San Juan",
        detalle: "Decreto reglamentario",
        archivo: "/documentos/marco-legal/san-juan-decreto-reg.docx",
    },
    {
        nombre: "San Juan",
        detalle: "Estatuto Sociedad del Estado",
        archivo: "/documentos/marco-legal/san-juan-estatuto-sociedad-del-estado.docx",
    },
    {
        nombre: "San Juan",
        detalle: "Sociedad del Estado",
        archivo: "/documentos/marco-legal/san-juan-sociedad-del-estado.docx",
    },
    {
        nombre: "San Luis",
        detalle: "Adhesión",
        archivo: "/documentos/marco-legal/san-luis-adhesion.pdf",
    },
    {
        nombre: "Santa Cruz",
        detalle: "Adhesión",
        archivo: "/documentos/marco-legal/santa-cruz-adhesion.docx",
    },
    {
        nombre: "Santa Fe",
        detalle: "Ley Cannabis",
        archivo: "/documentos/marco-legal/santa-fe-ley-cannabis.docx",
    },
    {
        nombre: "Tierra del Fuego",
        detalle: "Adhesión",
        archivo: "/documentos/marco-legal/tierra-del-fuego-adhesion.docx",
    },
    {
        nombre: "Tucumán",
        detalle: "Adhesión",
        archivo: "/documentos/marco-legal/tucuman-adhesion.docx",
    },
];

export default function HomePage() {
    const navigate = useNavigate();

    const legalCarouselRef =
        useRef<HTMLDivElement | null>(null);

    const moverCarrusel = (
        direccion: "izquierda" | "derecha"
    ) => {
        const carrusel = legalCarouselRef.current;

        if (!carrusel) {
            return;
        }

        const distancia =
            carrusel.clientWidth * 0.9;

        carrusel.scrollBy({
            left:
                direccion === "derecha"
                    ? distancia
                    : -distancia,
            behavior: "smooth",
        });
    };

    return (
        <div className="home-page">
            <header className="home-navbar">
                <div className="home-brand">
                    <span>
                        Don Marcelino
                    </span>

                    <strong>
                        y Los Cocos
                    </strong>
                </div>

                <nav className="home-nav">
                    <a href="#nosotros">
                        Nosotros
                    </a>

                    <a href="#beneficios">
                        Beneficios
                    </a>

                    <a href="#marco-legal">
                        Marco legal
                    </a>

                    <a href="#recursos">
                        Recursos
                    </a>

                    <a href="#como-funciona">
                        Cómo funciona
                    </a>
                </nav>

                <button
                    type="button"
                    className="home-login-button"
                    onClick={() =>
                        navigate("/login")
                    }
                >
                    Ingreso socios
                </button>
            </header>

            <main>
                <section className="home-hero">
                    <div className="home-hero-overlay" />

                    <div className="home-hero-content">
                        <p className="home-eyebrow">
                            Club Don Marcelino y Los Cocos
                        </p>

                        <h1>
                            Cultivamos comunidad.
                        </h1>

                        <p className="home-hero-text">
                            Cultivo solidario medicinal en red.
                            Una asociación civil sin fines de lucro
                            dedicada a informar, investigar y acompañar
                            a la comunidad.
                        </p>

                        <div className="home-hero-actions">
                            <a
                                href="#nosotros"
                                className="home-primary-button"
                            >
                                Conocé el club
                            </a>

                            <button
                                type="button"
                                className="home-secondary-button"
                                onClick={() =>
                                    navigate("/login")
                                }
                            >
                                Acceso al sistema
                            </button>
                        </div>
                    </div>

                    <div className="home-hero-decoration">
                        <div className="home-logo-stage">
                            <img
                                src={logoDonMarcelino}
                                alt="Don Marcelino y Los Cocos"
                                className="home-hero-logo"
                            />
                        </div>
                    </div>
                </section>

                <section
                    id="nosotros"
                    className="home-section home-about"
                >
                    <div className="home-section-heading">
                        <p className="home-eyebrow">
                            Sobre nosotros
                        </p>

                        <h2>
                            Una comunidad con raíces.
                        </h2>

                        <p>
                            Don Marcelino y Los Cocos es una
                            Asociación Civil sin fines de lucro,
                            ubicada en la Ciudad Autónoma de Buenos
                            Aires, República Argentina.
                        </p>

                        <p>
                            Nuestro objetivo es investigar,
                            informar y acompañar a la comunidad
                            en los diferentes usos del cannabis
                            medicinal y terapéutico.
                        </p>
                    </div>

                    <div className="home-about-grid">
                        <article>
                            <span>
                                01
                            </span>

                            <h3>
                                Comunidad
                            </h3>

                            <p>
                                Un espacio pensado para conectar
                                personas y acompañarlas dentro
                                de una comunidad organizada.
                            </p>
                        </article>

                        <article>
                            <span>
                                02
                            </span>

                            <h3>
                                Información
                            </h3>

                            <p>
                                Acceso a información clara sobre
                                cannabis medicinal, normativa
                                y herramientas disponibles.
                            </p>
                        </article>

                        <article>
                            <span>
                                03
                            </span>

                            <h3>
                                Acompañamiento
                            </h3>

                            <p>
                                Seguimiento y orientación para
                                quienes forman parte de nuestra
                                comunidad.
                            </p>
                        </article>
                    </div>
                </section>

                <section
                    id="beneficios"
                    className="home-section home-benefits"
                >
                    <div className="home-section-heading">
                        <p className="home-eyebrow">
                            El club
                        </p>

                        <h2>
                            Una experiencia simple y cuidada.
                        </h2>
                    </div>

                    <div className="home-benefits-grid">
                        <article className="home-benefit-card">
                            <div className="home-benefit-icon">
                                01
                            </div>

                            <h3>
                                Gestión ordenada
                            </h3>

                            <p>
                                Información y documentación
                                centralizada en un mismo lugar.
                            </p>
                        </article>

                        <article className="home-benefit-card">
                            <div className="home-benefit-icon">
                                02
                            </div>

                            <h3>
                                Seguimiento
                            </h3>

                            <p>
                                Control del estado y vigencia
                                de cada membresía.
                            </p>
                        </article>

                        <article className="home-benefit-card">
                            <div className="home-benefit-icon">
                                03
                            </div>

                            <h3>
                                Comunidad
                            </h3>

                            <p>
                                Una identidad construida desde
                                el vínculo, la información y
                                la confianza.
                            </p>
                        </article>
                    </div>
                </section>

                <section
                    id="marco-legal"
                    className="home-section home-legal"
                >
                    <div className="home-legal-header">
                        <div className="home-section-heading">
                            <p className="home-eyebrow">
                                Marco legal
                            </p>

                            <h2>
                                Información y normativa.
                            </h2>

                            <p>
                                El Programa Nacional para el Estudio
                                y la Investigación del Uso Medicinal
                                de la Planta de Cannabis fue creado
                                por la Ley 27.350.
                            </p>

                            <p>
                                Su objetivo es establecer un marco
                                regulatorio para la investigación
                                médica y científica del uso medicinal,
                                terapéutico y paliativo del cannabis
                                y sus derivados.
                            </p>
                        </div>

                        <div className="home-legal-highlight">
                            <span>
                                Ley 27.350
                            </span>

                            <strong>
                                Cannabis medicinal
                            </strong>

                            <p>
                                Recopilación de normativa nacional,
                                provincial y municipal relacionada
                                con cannabis medicinal.
                            </p>
                        </div>
                    </div>

                    <div className="home-legal-title-row">
                        <div>
                            <span className="home-legal-kicker">
                                Biblioteca
                            </span>

                            <h3>
                                Documentación por provincia
                            </h3>
                        </div>

                        <div className="home-legal-tools">
                            <span className="home-legal-count">
                                {documentosMarcoLegal.length} documentos
                            </span>

                            <div className="home-carousel-controls">
                                <button
                                    type="button"
                                    className="home-carousel-button"
                                    aria-label="Documentos anteriores"
                                    onClick={() =>
                                        moverCarrusel("izquierda")
                                    }
                                >
                                    ←
                                </button>

                                <button
                                    type="button"
                                    className="home-carousel-button"
                                    aria-label="Siguientes documentos"
                                    onClick={() =>
                                        moverCarrusel("derecha")
                                    }
                                >
                                    →
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        ref={legalCarouselRef}
                        className="home-legal-carousel"
                    >
                        {documentosMarcoLegal.map(
                            (
                                documento,
                                index
                            ) => (
                                <a
                                    key={`${documento.nombre}-${documento.detalle}-${index}`}
                                    href={documento.archivo}
                                    download
                                    className="home-legal-card"
                                >
                                    <div className="home-legal-card-top">
                                        <span className="home-legal-number">
                                            {String(
                                                index + 1
                                            ).padStart(
                                                2,
                                                "0"
                                            )}
                                        </span>

                                        <span className="home-legal-download">
                                            Descargar ↓
                                        </span>
                                    </div>

                                    <div>
                                        <h4>
                                            {documento.nombre}
                                        </h4>

                                        <p>
                                            {documento.detalle}
                                        </p>
                                    </div>
                                </a>
                            )
                        )}
                    </div>
                </section>

                <section
                    id="recursos"
                    className="home-section home-resources"
                >
                    <div className="home-section-heading">
                        <p className="home-eyebrow">
                            Recursos
                        </p>

                        <h2>
                            Información útil para la comunidad.
                        </h2>

                        <p>
                            Accedé a información oficial sobre
                            REPROCANN y al marco normativo nacional
                            relacionado con cannabis medicinal.
                        </p>
                    </div>

                    <div className="home-resources-grid">
                        <article className="home-resource-card">
                            <div className="home-resource-top">
                                <span className="home-resource-label">
                                    REPROCANN
                                </span>

                                <span className="home-resource-index">
                                    01
                                </span>
                            </div>

                            <h3>
                                ¿Cómo obtener el permiso para cultivar?
                            </h3>

                            <p>
                                El Registro del Programa de Cannabis
                                permite la inscripción de personas
                                autorizadas al cultivo controlado con
                                fines medicinales, terapéuticos y/o
                                paliativos.
                            </p>

                            <a
                                href="https://www.argentina.gob.ar/salud/cannabis-medicinal/reprocann"
                                target="_blank"
                                rel="noreferrer"
                                className="home-resource-link"
                            >
                                Ir a REPROCANN
                                <span>→</span>
                            </a>
                        </article>

                        <article className="home-resource-card home-resource-card-dark">
                            <div className="home-resource-top">
                                <span className="home-resource-label">
                                    Ley 27.350
                                </span>

                                <span className="home-resource-index">
                                    02
                                </span>
                            </div>

                            <h3>
                                Conocé el marco legal nacional.
                            </h3>

                            <p>
                                La Ley 27.350 establece el marco
                                para la investigación médica y
                                científica del uso medicinal,
                                terapéutico y paliativo del cannabis
                                y sus derivados.
                            </p>

                            <a
                                href="https://www.argentina.gob.ar/normativa/nacional/norma-273801"
                                target="_blank"
                                rel="noreferrer"
                                className="home-resource-link"
                            >
                                Ver Ley 27350
                                <span>→</span>
                            </a>
                        </article>
                    </div>
                </section>

                <section
                    id="como-funciona"
                    className="home-cta-section"
                >
                    <div>
                        <p className="home-eyebrow">
                            Don Marcelino y Los Cocos
                        </p>

                        <h2>
                            Todo empieza desde una buena raíz.
                        </h2>

                        <p>
                            Conocé más sobre el club,
                            la comunidad y el espacio
                            que estamos construyendo.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="home-primary-button"
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        Ingreso socios
                    </button>
                </section>
            </main>

            <footer className="home-footer">
                <div>
                    <strong>
                        Don Marcelino y Los Cocos
                    </strong>

                    <span>
                        Cultivo solidario medicinal en red
                    </span>
                </div>

                <p>
                    © 2026 Don Marcelino y Los Cocos.
                </p>
            </footer>
        </div>
    );
}