import * as React from "react";
import { Link } from "react-router-dom";
import "../../locales/config";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import "../../assets/scss/App.scss";
import {
  AltText,
  SearchBox,
  BigButtonSecondary,
  RightArrow,
  Back,
  ArrowLeft,
  Container,
  BigSelectSecondary,
  Align,
} from "../Materials";
import { Graph, GlobalGraph, OldGameGraph } from "../graphing/line";
import { dice, graphGames, platformGames } from "../../api/static";

const AltDescription = styled.p`
  ${AltText}
  margin-left: 24px;
`;

const Title = styled.h2`
  margin-top: 2rem;
`;

function Main(): React.ReactElement {
  return (
    <Container>
      <Search />
      <Graphs />
    </Container>
  );
}

function Search(): React.ReactElement {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [platform, setPlatform] = React.useState<string>("pc");
  const [game, setGame] = React.useState<string>("bf1");
  return (
    <>
      <Back to="/">
        <ArrowLeft />
        {t("playerSearch.back")}
      </Back>
      <Align>
        <h2>{t("playerSearch.bfStats")}</h2>
        <AltDescription>{t("playerSearch.description")}</AltDescription>
      </Align>
      <Align>
        <form>
          <SearchBox
            placeholder={t("playerSearch.searchPlaceholder")}
            value={searchTerm}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setSearchTerm(ev.target.value)
            }
          />
          <BigSelectSecondary
            value={platform}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
              setPlatform(ev.target.value)
            }
          >
            <option value="pc">{t("platforms.pc")}</option>
            <option value="xboxone">{t("platforms.xboxone")}</option>
            <option value="xbox360">{t("platforms.xbox360")}</option>
            <option value="ps4">{t("platforms.ps4")}</option>
            <option value="ps3">{t("platforms.ps3")}</option>
          </BigSelectSecondary>
          <BigSelectSecondary
            value={game}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
              setGame(ev.target.value)
            }
          >
            {platformGames[platform].map((key: string, index: number) => {
              return (
                <option key={index} value={key}>
                  {t(`games.${key}`)}
                </option>
              );
            })}
          </BigSelectSecondary>
          {searchTerm !== "" ? (
            <Link to={`/stats/${platform}/name/${searchTerm}?game=${game}`}>
              <BigButtonSecondary type="submit">
                {t("playerSearch.search")} <RightArrow />
              </BigButtonSecondary>
            </Link>
          ) : (
            // if no name is filled in
            <BigButtonSecondary type="submit">
              {t("playerSearch.search")} <RightArrow />
            </BigButtonSecondary>
          )}
        </form>
      </Align>
    </>
  );
}

function Graphs(): React.ReactElement {
  const { t } = useTranslation();
  const [platformGraph, setPlatformGraph] = React.useState<string>("pc");
  const [gameGraph, setGraphGame] = React.useState<string>("bfglobal");
  return (
    <>
      <Align>
        <Title>{t("playerSearch.gameStatus")}</Title>
        <AltDescription style={{ marginTop: "2rem" }}>
          {t("playerSearch.zoomInfo")}
        </AltDescription>
      </Align>
      <Align>
        <BigSelectSecondary
          value={platformGraph}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void => {
            if (ev.target.value == "all" && gameGraph == "bfglobal") {
              setGraphGame("bf1");
            }
            setPlatformGraph(ev.target.value);
          }}
        >
          <option value="pc">{t("platforms.pc")}</option>
          <option value="xboxone">{t("platforms.xboxone")}</option>
          <option value="ps4">{t("platforms.ps4")}</option>
          <option value="all">{t("platforms.all")}</option>
        </BigSelectSecondary>
        <BigSelectSecondary
          value={gameGraph}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
            setGraphGame(ev.target.value)
          }
        >
          {graphGames[platformGraph].map((key: string, index: number) => {
            return (
              <option key={index} value={key}>
                {t(`games.${key}`)}
              </option>
            );
          })}
        </BigSelectSecondary>
      </Align>
      {dice.includes(gameGraph) ? (
        <Align>
          <Graph gameName={gameGraph} platform={platformGraph} />
        </Align>
      ) : gameGraph == "bfglobal" ? (
        <GlobalGraph platform={platformGraph} />
      ) : (
        <OldGameGraph gameName={gameGraph} platform={platformGraph} />
      )}
    </>
  );
}

export default Main;
