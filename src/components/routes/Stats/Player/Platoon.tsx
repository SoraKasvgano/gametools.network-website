import * as React from "react";
import { Link } from "react-router-dom";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import { Box, AlignW } from "../../../Materials";
import styled from "styled-components";
import { MainStats, MainStatsPlatoon } from "../../../../api/ReturnTypes";
import { Description, PlatformViews, Spacing } from "./Main";

const PlatoonLink = styled.a`
  color: rgba(255, 255, 255);
  font-weight: 600;
  line-height: 150%;
  font-size: 16px;
  font-weight: bold;
`;

const PlatoonEmblem = styled.img`
  width: 100px;
  margin-right: 0.5rem;
`;

interface PlatoonStats {
  stats: MainStats;
}

export function Platoon(props: PlatoonStats): React.ReactElement {
  const stats = props.stats;
  if (stats.activePlatoon !== undefined && stats.activePlatoon.tag !== null) {
    return (
      <PlatoonLink href={stats.activePlatoon.url} target="_blank">
        [{stats.activePlatoon.tag}]{" "}
      </PlatoonLink>
    );
  } else {
    return <></>;
  }
}

export function PlatoonInfo(props: PlatformViews): React.ReactElement {
  const { t } = useTranslation();
  const stats = props.stats;
  const platform = props.platform;
  if (
    !props.loading &&
    !props.error &&
    stats.activePlatoon.name === null &&
    props.stats.platoons.length === 0
  ) {
    return (
      <Spacing>
        <Box>
          <h3>{t("stats.platoonName")}</h3>
          <p>{t("stats.platoon.none")}</p>
        </Box>
      </Spacing>
    );
  } else if (!props.loading && !props.error) {
    const otherPlatoons = props.stats.platoons.filter(
      (platoon) => platoon.id !== stats.activePlatoon.id,
    );
    return (
      <Spacing>
        <Box>
          {stats.activePlatoon.name !== null ? (
            <>
              <h3>{t("stats.platoonName")}</h3>
              <AlignW style={{ alignItems: "start" }}>
                <Link to={`/platoons/${platform}/${stats.activePlatoon.id}`}>
                  <PlatoonEmblem src={stats.activePlatoon.emblem} />
                </Link>
                <div style={{ marginTop: "1rem" }}>
                  <h3>
                    <Link
                      to={`/platoons/${platform}/${stats.activePlatoon.id}`}
                    >
                      {stats.activePlatoon.name}
                    </Link>
                  </h3>
                  {stats.activePlatoon.description !== null ? (
                    <Link
                      to={`/platoons/${platform}/${stats.activePlatoon.id}`}
                    >
                      <p>{stats.activePlatoon.description}</p>
                    </Link>
                  ) : (
                    <Link
                      to={`/platoons/${platform}/${stats.activePlatoon.id}`}
                    >
                      <Description>
                        {t("stats.platoon.noDescription")}
                      </Description>
                    </Link>
                  )}
                </div>
              </AlignW>
            </>
          ) : (
            <>
              <h3>{t("stats.platoonName")}</h3>
              <p>{t("stats.platoon.noMain")}</p>
            </>
          )}
          {otherPlatoons.length !== 0 ? (
            <>
              <br />
              <br />
              <h3>{t("stats.otherPlatoons")}</h3>
              {otherPlatoons.map((key: MainStatsPlatoon) => {
                return (
                  <>
                    <AlignW style={{ alignItems: "start" }}>
                      <Link to={`/platoons/${platform}/${key.id}`}>
                        <PlatoonEmblem src={key.emblem} />
                      </Link>
                      <div style={{ marginTop: "1rem" }}>
                        <h3>
                          <Link to={`/platoons/${platform}/${key.id}`}>
                            {key.name}
                          </Link>
                        </h3>
                        {key.description !== null ? (
                          <Link to={`/platoons/${platform}/${key.id}`}>
                            <p>{key.description}</p>
                          </Link>
                        ) : (
                          <Link to={`/platoons/${platform}/${key.id}`}>
                            <Description>
                              {t("stats.platoon.noDescription")}
                            </Description>
                          </Link>
                        )}
                      </div>
                    </AlignW>
                    <br />
                  </>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </Box>
      </Spacing>
    );
  } else {
    return (
      <Spacing>
        <Box>
          <h3>{t("stats.platoonName")}</h3>
          <p>{t("loading")}</p>
        </Box>
      </Spacing>
    );
  }
}
