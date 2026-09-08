import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import logoDonMarcelino from "../assets/logo-don-marcelino-los-cocos.png";

import argenCannLogo from "../assets/partners/argencann.png";
import cannaTestLogo from "../assets/partners/cannatest.webp";
import donMarcelinoFooterLogo from "../assets/partners/don-marcelino-footer.webp";
import reprocannLogo from "../assets/partners/reprocann.png";

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
        archivo:
            "/documentos/marco-legal/salta-resolucion-min-salud-epilepsia-ref.docx",
    },
    {
        nombre: "Salta",
        detalle: "Resolución Ministerio de Salud",
        archivo:
            "/documentos/marco-legal/salta-resolucion-min-salud.docx",
    },
    {
        nombre: "San Juan",
        detalle: "Adhesión",
        archivo: "/documentos/marco-legal/san-juan-adhesion.docx",
    },
    {
        nombre: "San Juan",
        detalle: "Decreto reglamentario",
        archivo:
            "/documentos/marco-legal/san-juan-decreto-reg.docx",
    },
    {
        nombre: "San Juan",
        detalle: "Estatuto Sociedad del Estado",
        archivo:
            "/documentos/marco-legal/san-juan-estatuto-sociedad-del-estado.docx",
    },
    {
        nombre: "San Juan",
        detalle: "Sociedad del Estado",
        archivo:
            "/documentos/marco-legal/san-juan-sociedad-del-estado.docx",
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
        archivo:
            "/documentos/marco-legal/tierra-del-fuego-adhesion.docx",
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
                <a
                    href="#inicio"
                    className="home-brand"
                >
                    <span>
                        Don Marcelino
                    </span>

                    <strong>
                        y Los Cocos
                    </strong>
                </a>

                <nav className="home-nav">
                    <a href="#nosotros">
                        Nosotros
                    </a>

                    <a href="#beneficios">
                        Nuestra labor
                    </a>

                    <a href="#marco-legal">
                        Marco legal
                    </a>

                    <a href="#recursos">
                        Recursos
                    </a>

                    <a href="#contacto">
                        Contacto
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
                {/* HERO */}

                <section
                    id="inicio"
                    className="home-hero"
                >
                    <div className="home-hero-overlay" />

                    <div className="home-hero-content">
                        <p className="home-eyebrow">
                            Asociación Civil · Ciudad Autónoma de Buenos Aires
                        </p>

                        <h1>
                            Cultivamos
                            <br />
                            comunidad.
                        </h1>

                        <p className="home-hero-text">
                            Asociación civil dedicada al estudio,
                            la información y el acompañamiento
                            en el uso medicinal y terapéutico
                            del cannabis.
                        </p>

                        <div className="home-hero-actions">
                            <a
                                href="#nosotros"
                                className="home-primary-button"
                            >
                                Conocer la asociación
                            </a>

                            <a
                                href="#marco-legal"
                                className="home-secondary-button"
                            >
                                Consultar marco legal
                            </a>
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

                {/* NOSOTROS */}

                <section
                    id="nosotros"
                    className="home-section home-about"
                >
                    <div className="home-section-heading">
                        <p className="home-eyebrow">
                            La asociación
                        </p>

                        <h2>
                            Una comunidad
                            <br />
                            con raíces.
                        </h2>

                        <p>
                            Don Marcelino y Los Cocos es una
                            Asociación Civil sin fines de lucro
                            ubicada en la Ciudad Autónoma de Buenos Aires,
                            República Argentina.
                        </p>

                        <p>
                            Trabajamos para investigar, informar
                            y acompañar a la comunidad en los
                            diferentes usos medicinales y terapéuticos
                            del cannabis.
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
                                Construimos un espacio organizado
                                de encuentro, información
                                y acompañamiento.
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
                                Facilitamos el acceso a normativa,
                                recursos y contenidos vinculados
                                al cannabis medicinal.
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
                                Orientamos a quienes forman parte
                                de la comunidad durante sus distintos
                                procesos y necesidades.
                            </p>
                        </article>
                    </div>
                </section>

                {/* NUESTRA LABOR */}

                <section
                    id="beneficios"
                    className="home-section home-benefits"
                >
                    <div className="home-section-heading">
                        <p className="home-eyebrow">
                            Nuestra labor
                        </p>

                        <h2>
                            Información,
                            <br />
                            acompañamiento
                            <br />
                            y gestión.
                        </h2>
                    </div>

                    <div className="home-benefits-grid">
                        <article className="home-benefit-card">
                            <div className="home-benefit-icon">
                                01
                            </div>

                            <h3>
                                Gestión institucional
                            </h3>

                            <p>
                                Organización centralizada
                                de información, documentación
                                y procesos internos.
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
                                Herramientas para mantener
                                actualizada la información
                                vinculada a cada miembro.
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
                                Un vínculo construido desde
                                la responsabilidad, la información
                                y la confianza.
                            </p>
                        </article>
                    </div>
                </section>

                {/* MARCO LEGAL */}

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
                                Información
                                <br />
                                y normativa.
                            </h2>

                            <p>
                                El Programa Nacional para el Estudio
                                y la Investigación del Uso Medicinal
                                de la Planta de Cannabis fue creado
                                por la Ley 27.350.
                            </p>

                            <p>
                                La normativa establece un marco
                                para la investigación médica
                                y científica del uso medicinal,
                                terapéutico y paliativo del cannabis
                                y sus derivados.
                            </p>
                        </div>

                        <div className="home-legal-highlight">
                            <span>
                                Legislación nacional
                            </span>

                            <strong>
                                Ley 27.350
                            </strong>

                            <p>
                                Marco regulatorio nacional
                                vinculado al uso medicinal
                                de la planta de cannabis
                                y sus derivados.
                            </p>

                            <a
                                href="https://www.argentina.gob.ar/normativa/nacional/norma-273801"
                                target="_blank"
                                rel="noreferrer"
                                className="home-legal-highlight-link"
                            >
                                Consultar norma
                                <span>→</span>
                            </a>
                        </div>
                    </div>

                    <div className="home-legal-title-row">
                        <div>
                            <span className="home-legal-kicker">
                                Biblioteca normativa
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

                {/* RECURSOS */}

                <section
                    id="recursos"
                    className="home-section home-resources"
                >
                    <div className="home-section-heading">
                        <p className="home-eyebrow">
                            Recursos oficiales
                        </p>

                        <h2>
                            Información
                            <br />
                            para la comunidad.
                        </h2>

                        <p>
                            Acceso directo a información oficial
                            vinculada a REPROCANN y al marco normativo
                            nacional sobre cannabis medicinal.
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
                                Registro del Programa de Cannabis.
                            </h3>

                            <p>
                                REPROCANN permite la inscripción
                                de personas vinculadas al cultivo
                                controlado con fines medicinales,
                                terapéuticos y/o paliativos,
                                de acuerdo con los requisitos
                                establecidos por la autoridad sanitaria.
                            </p>

                            <p className="home-resource-note">
                                La información vigente y los requisitos
                                del trámite se encuentran disponibles
                                en el sitio oficial de Argentina.gob.ar.
                            </p>

                            <a
                                href="https://www.argentina.gob.ar/salud/cannabis-medicinal/reprocann"
                                target="_blank"
                                rel="noreferrer"
                                className="home-resource-link"
                            >
                                Consultar REPROCANN
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
                                Marco legal nacional.
                            </h3>

                            <p>
                                La Ley 27.350 establece el marco
                                para la investigación médica
                                y científica del uso medicinal,
                                terapéutico y paliativo del cannabis
                                y sus derivados.
                            </p>

                            <a
                                href="https://www.argentina.gob.ar/normativa/nacional/norma-273801"
                                target="_blank"
                                rel="noreferrer"
                                className="home-resource-link"
                            >
                                Consultar Ley 27.350
                                <span>→</span>
                            </a>
                        </article>
                    </div>
                </section>

                {/* ASESORAMIENTO */}

                <section className="home-section home-advisory">
                    <div className="home-advisory-content">
                        <div>
                            <p className="home-eyebrow">
                                Asesoramiento jurídico
                            </p>

                            <h2>
                                Derecho cannábico
                                <br />
                                especializado.
                            </h2>

                            <p className="home-advisory-text">
                                La comunidad cuenta con acceso
                                a asesoramiento jurídico especializado
                                a través de Estudio4Veinte.
                            </p>
                        </div>

                        <div className="home-advisory-card">
                            <span>
                                Estudio jurídico
                            </span>

                            <strong>
                                Estudio4Veinte
                            </strong>

                            <p>
                                Asesoramiento para organizaciones,
                                asociaciones y personas vinculadas
                                al cannabis.
                            </p>

                            <a
                                href="https://www.instagram.com/estudio4veinte/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                @estudio4veinte
                                <span>→</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* INSTITUCIONES */}

                <section className="home-section home-partners">
                    <div className="home-section-heading">
                        <p className="home-eyebrow">
                            Vinculaciones
                        </p>

                        <h2>
                            Instituciones
                            <br />
                            y organizaciones.
                        </h2>
                    </div>

                    <div className="home-partners-grid">
                        <div className="home-partner-card">
                            <img
                                src={argenCannLogo}
                                alt="ArgenCann"
                            />
                        </div>

                        <div className="home-partner-card">
                            <img
                                src={cannaTestLogo}
                                alt="Cannatest"
                            />
                        </div>

                        <div className="home-partner-card home-partner-card-reprocann">
                            <img
                                src={reprocannLogo}
                                alt="REPROCANN - Ministerio de Salud de la Nación"
                            />
                        </div>
                    </div>
                </section>

                {/* CONTACTO */}

                <section
                    id="contacto"
                    className="home-contact"
                >
                    <div className="home-contact-main">
                        <p className="home-eyebrow">
                            Contacto
                        </p>

                        <h2>
                            Estamos para
                            <br />
                            acompañarte.
                        </h2>

                        <p>
                            Para conocer más sobre Don Marcelino
                            y Los Cocos, recibir información
                            o realizar una consulta, podés
                            comunicarte directamente con nosotros.
                        </p>
                    </div>

                    <div className="home-contact-list">
                        <a
                            href="https://wa.me/5491151656918"
                            target="_blank"
                            rel="noreferrer"
                            className="home-contact-item"
                        >
                            <div>
                                <span>
                                    WhatsApp
                                </span>

                                <strong>
                                    Iniciar conversación
                                </strong>
                            </div>

                            <span className="home-contact-arrow">
                                →
                            </span>
                        </a>

                        <a
                            href="mailto:donmarcelino@donmarcelinoyloscocos.com"
                            className="home-contact-item"
                        >
                            <div>
                                <span>
                                    Correo electrónico
                                </span>

                                <strong>
                                    Enviar consulta
                                </strong>
                            </div>

                            <span className="home-contact-arrow">
                                →
                            </span>
                        </a>
                    </div>
                </section>

                {/* ACCESO */}

                <section className="home-cta-section">
                    <div>
                        <p className="home-eyebrow">
                            Área privada
                        </p>

                        <h2>
                            Gestión para
                            <br />
                            nuestra comunidad.
                        </h2>

                        <p>
                            Los miembros autorizados cuentan
                            con un espacio privado para acceder
                            a la plataforma de gestión de
                            Don Marcelino y Los Cocos.
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

            {/* FOOTER */}

            <footer className="home-footer home-footer-expanded">
                <div className="home-footer-brand">
                    <img
                        src={donMarcelinoFooterLogo}
                        alt="Don Marcelino y Los Cocos"
                    />

                    <div>
                        <strong>
                            Don Marcelino y Los Cocos
                        </strong>

                        <span>
                            Asociación Civil sin fines de lucro
                        </span>

                        <span>
                            Ciudad Autónoma de Buenos Aires
                        </span>
                    </div>
                </div>

                <div className="home-footer-links">
                    <a href="#nosotros">
                        Nosotros
                    </a>

                    <a href="#beneficios">
                        Nuestra labor
                    </a>

                    <a href="#marco-legal">
                        Marco legal
                    </a>

                    <a href="#recursos">
                        Recursos
                    </a>

                    <a href="#contacto">
                        Contacto
                    </a>
                </div>

                <div className="home-footer-bottom">
                    <span>
                        Cannabis medicinal · Información · Comunidad
                    </span>

                    <p>
                        © 2026 Don Marcelino y Los Cocos.
                    </p>
                </div>
            </footer>
        </div>
    );
}