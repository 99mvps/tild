import React from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import logo from "../assets/logo.png";
import { ArrowBack } from "@mui/icons-material";
import { useHistory } from "react-router-dom";

export function UserCodeOfConduct() {
  const history = useHistory();

  return (
    <Grid
      container
      sx={{
        maxWidth: "800px",
        backgroundColor: "white",
        margin: "0 auto",
        padding: 4,
        overflowY: "scroll",
      }}
    >
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ marginBottom: 40, display: "block", margin: "0 auto" }}>
          <img src={logo} alt="what'd you learn today?" />
        </Box>
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 3,
          paddingBottom: 3,
        }}
        xs={12}
      >
        <Typography variant="h3">
          Código de <span style={{ color: "crimson" }}>Conduta</span>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" component="p" sx={{ marginBottom: 3 }}>
          Este Código de Conduta será aplicado para todos, enquanto
          participantes desse espaço, para proteger o público de danos e perigos
          morais. Nos dedicamos a promover um ambiente respeitoso e livre de
          assédio para todos. Não toleramos quaisquer formas de assédios ou
          intimidações de qualquer natureza seja com participantes ou grupos.
          Imagens, atividades ou materiais de conteúdo sexual, homofóbico,
          pejorativo e/ou discriminatório de qualquer natureza não são aceitos.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          Por assédio entende-se sem limitação:
        </Typography>
        <ul>
          <li>
            Comentários ofensivos, verbais ou eletrônicos, relacionados a
            características pessoais, origem racial, orientação sexual,
            identidade de gênero, bem como comentários ou imagens sexuais,
            racistas, homofóbicas ou discriminatórias de qualquer natureza em
            espaços públicos ou digitais.
          </li>
          <li>Intimidação deliberada.</li>
          <li>Bullying.</li>
          <li>Perseguição.</li>
          <li>Encalço.</li>
          <li>Textos, imagens ou gravações que gerem embaraço.</li>
          <li>Atenção sexual indesejada.</li>
        </ul>
      </Grid>
      <Grid item xs={12}>
        <strong>
          Qualquer participante que violar tais regras pode ser convidado a se
          retirar. Se você for assediado, perceber que alguém está sendo
          assediado, ou tem outras preocupações, entre em contato com as
          autoridades compententes e/ ou nos procure através do email:{" "}
          <a href="mailto:tild@99mvps.dev">tild@99mvps.dev</a> para auxílio em
          qualquer investigação necessária.
        </strong>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: 8 }}>
        <Typography variant="h4">
          <span style={{ color: "crimson" }}>Porquê?</span>
        </Typography>
        <Typography variant="body1" component="p" sx={{ marginBottom: 3 }}>
          Uma rede social é um ambiente virtual que conecta milhões de pessoas
          ao redor do mundo, permitindo a troca de ideias, informações e
          interações sociais. No entanto, dada a natureza aberta e diversa
          dessas plataformas, torna-se necessário estabelecer um código de
          conduta para garantir a segurança, a convivência saudável e o respeito
          mútuo entre os usuários.
        </Typography>
        <Typography variant="body1" component="p" sx={{ marginBottom: 3 }}>
          Primeiramente, um código de conduta é fundamental para combater o
          discurso de ódio, a discriminação e o assédio. Ao estabelecer
          diretrizes claras sobre o que é aceitável ou não no ambiente virtual,
          a rede social cria uma atmosfera segura para os usuários,
          protegendo-os de conteúdos prejudiciais e promovendo a igualdade de
          direitos.
        </Typography>
        <Typography variant="body1" component="p" sx={{ marginBottom: 3 }}>
          O código de conduta também auxilia na promoção de uma cultura de
          respeito e empatia online. Ao encorajar comportamentos positivos, como
          a gentileza, a tolerância e a cooperação, a rede social contribui para
          a construção de relacionamentos saudáveis e enriquecedores entre os
          usuários, estimulando a criação de comunidades virtuais mais
          positivas.
        </Typography>
        <Typography variant="body1" component="p" sx={{ marginBottom: 3 }}>
          Além disso, um código de conduta auxilia no cumprimento das leis
          vigentes em nosso país, garantindo a defesa de direitos e valores
          fundamentais. Ao estabelecer diretrizes claras em conformidade com a
          legislação local, a rede social busca assegurar a proteção da
          privacidade, a prevenção de crimes digitais, a promoção da igualdade
          de gênero e a proibição de discursos discriminatórios. Dessa forma, o
          código de conduta contribui para uma utilização responsável da
          plataforma, protegendo tanto os usuários quanto a sociedade como um
          todo, ao fortalecer o cumprimento das leis e a promoção de uma
          internet mais segura e justa.
        </Typography>
        <Typography variant="body1" component="p" sx={{ marginBottom: 3 }}>
          Em suma, uma rede social necessita de um código de conduta para
          assegurar um ambiente virtual seguro, inclusivo e respeitoso. Por meio
          dessas diretrizes, é possível combater o discurso de ódio, proteger a
          privacidade dos usuários, fomentar uma cultura de respeito e empatia,
          e promover a confiabilidade das informações compartilhadas.
        </Typography>
        <strong>
          Esse código de conduta não se limita aos pontos aqui escritos ou
          abordados, como também segue e seguirá qualquer lei em vigor no país
          que tratem de tais assuntos.
        </strong>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <IconButton onClick={() => history.push("/register")}>
            <ArrowBack />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: 8 }}>
        Referências:
        <br />
        <a
          href="http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/L13718.htm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lei nº 13.718/2018
        </a>
        <br />
        <a
          href="https://www.planalto.gov.br/ccivil_03/leis/l7716.htm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lei nº 7.716/1989
        </a>
      </Grid>
    </Grid>
  );
}
