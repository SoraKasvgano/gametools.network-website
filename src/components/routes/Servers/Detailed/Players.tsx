import * as React from "react";
import "../../../../locales/config";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../../../assets/scss/App.scss";
import { bfbanPlayer, GametoolsApi } from "../../../../api/GametoolsApi";
import { useQuery } from "react-query";
import {
  Align,
  AlignW,
  Box,
  Row,
  Column,
  ButtonLink,
  PhoneRow,
} from "../../../Materials";
import {
  serverPlayer,
  ServerPlayersReturn,
  serverTeamList,
} from "../../../../api/ReturnTypes";
import { factions } from "../../../../api/Factions";
import { ConLink, Description, Spacing, Title } from "./Servers";

function CheckBan(props: {
  playerId: string;
  bfBanList: bfbanPlayer;
  loading: boolean;
  error: boolean;
}) {
  const { t } = useTranslation();
  if (props.loading || props.error) {
    return <></>;
  }

  const playerInfo = props.bfBanList.personaids[props.playerId];
  let color = "#ffffff";

  if (props.playerId in props.bfBanList.personaids) {
    color = "#DC143C";
    return (
      <a
        style={{ color: color, lineHeight: 0 }}
        href={playerInfo.url}
        target="_blank"
        rel="noreferrer"
      >
        {playerInfo.hacker ? t("bfban.platoon") : ""}
      </a>
    );
  }
  return <></>;
}

function Players(props: {
  stats: ServerPlayersReturn;
  game: string;
  platform: string;
  gameid: string;
}): React.ReactElement {
  const { t } = useTranslation();
  const teams = props.stats.teams;
  const ConditionalLink = ({ children, to, condition }: ConLink) =>
    !!condition && to ? <Link to={to}>{children}</Link> : <>{children}</>;

  let playerIds = [];
  teams.forEach((teamInfo: serverTeamList) => {
    playerIds = playerIds.concat(
      teamInfo.players.map((player) => {
        return player.player_id.toString();
      }),
    );
  });

  const {
    isLoading: loading,
    isError: error,
    data: bfBanInfo,
  } = useQuery("bfbanStatsServerPlayers" + props.gameid + props.game, () =>
    GametoolsApi.bfbanCheckPlayers({
      getter: "playerid",
      usernames: playerIds,
    }),
  );

  return (
    <Spacing>
      <Align>
        <h2>{t("servers.playerlist.main")}</h2>
      </Align>
      {teams !== null ? (
        <>
          {teams.map((teamInfo: serverTeamList, index: number) => {
            return (
              <div key={index}>
                <Align>
                  <h3 style={{ margin: ".5rem", marginTop: 0 }}>
                    {teamInfo.faction in factions
                      ? t(`servers.factions.${teamInfo.faction}`)
                      : t(`servers.factions.${teamInfo.teamid}`)}
                  </h3>
                </Align>
                <Box>
                  {teamInfo.players.length !== 0 ? (
                    <>
                      {teamInfo.players.map(
                        (key: serverPlayer, index: number) => {
                          const dateAdded = new Date(key.join_time / 1000);
                          return (
                            <Column key={index}>
                              <Row>
                                <AlignW>
                                  {props.game !== "bf2042" ? (
                                    <img
                                      src={`https://cdn.gametools.network/bf1/${key.rank}.png`}
                                      height="25px"
                                    />
                                  ) : (
                                    <></>
                                  )}
                                  <ConditionalLink
                                    condition={props.game !== "bf2042"}
                                    to={`/stats/${props.platform}/playerid/${
                                      key.player_id
                                    }?game=${
                                      props.game
                                    }&name=${encodeURIComponent(key.name)}`}
                                  >
                                    <>
                                      <h4
                                        style={{
                                          maxWidth: "11rem",
                                          width: "auto",
                                          minWidth: "8rem",
                                          margin: "0.5rem",
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        {key.platoon !== "" &&
                                        key.platoon !== undefined
                                          ? `[${key.platoon}]`
                                          : ""}
                                        {key.name}
                                      </h4>
                                    </>
                                  </ConditionalLink>
                                </AlignW>
                                <CheckBan
                                  playerId={key.player_id.toString()}
                                  bfBanList={bfBanInfo}
                                  loading={loading}
                                  error={error}
                                />
                              </Row>
                              {props.game !== "bf2042" ? (
                                <Row>
                                  <h4 style={{ marginTop: "0.5rem" }}>
                                    {key.latency}
                                  </h4>
                                  <Description style={{ lineHeight: 0 }}>
                                    {t("servers.playerlist.row.ping")}
                                  </Description>
                                </Row>
                              ) : (
                                <></>
                              )}
                              <Row>
                                <h4 style={{ marginTop: "0.5rem" }}>
                                  {t("change", {
                                    change: dateAdded,
                                  })}
                                </h4>
                                <Description style={{ lineHeight: 0 }}>
                                  {t("servers.playerlist.row.timePlayed")}
                                </Description>
                              </Row>
                              {props.game !== "bf2042" ? (
                                <PhoneRow>
                                  <ButtonLink
                                    style={{
                                      marginTop: ".5rem",
                                    }}
                                    href={`https://gametools.network/stats/${
                                      props.platform
                                    }/playerid/${key.player_id}?game=${
                                      props.game
                                    }&name=${encodeURIComponent(key.name)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {t("stats.view")}
                                  </ButtonLink>
                                </PhoneRow>
                              ) : (
                                <></>
                              )}
                            </Column>
                          );
                        },
                      )}
                    </>
                  ) : (
                    <p>{t("servers.playerlist.empty")}</p>
                  )}
                </Box>
              </div>
            );
          })}
        </>
      ) : (
        <Box>
          <p>{t("servers.playerlist.empty")}</p>
        </Box>
      )}
    </Spacing>
  );
}
export function ServerPlayerlist(props: {
  game: string;
  platform: string;
  gameid: string;
}): React.ReactElement {
  const { t } = useTranslation();
  const gameId = props.gameid;

  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery("serverPlayerlist" + gameId, () =>
    GametoolsApi.serverPlayerlist({
      game: props.game,
      gameId: gameId,
    }),
  );
  if (!loading && !error) {
    return (
      <Players
        stats={stats}
        game={props.game}
        gameid={props.gameid}
        platform={props.platform}
      />
    );
  }
  return (
    <Spacing>
      <Title>{t("servers.playerlist.main")}</Title>
      <Description>{t("loading")}</Description>
    </Spacing>
  );
}
