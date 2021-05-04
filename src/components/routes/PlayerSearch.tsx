import * as React from "react";
import { Link  } from "react-router-dom";
import '../../locales/config';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import "../../assets/scss/App.scss";
import { M88, AltText, SearchBox, BigButtonSecondary, RightArrow, Back, ArrowLeft, Container, BigSelectSecondary, Align } from '../Materials';

const Description = styled.p`
    ${AltText}
`

const AltDescription = styled.p`
    ${AltText}
    margin-left: 24px;
`

const Title = styled.h2`
    margin-top: 2rem;
`

function Search() {
    const { t, i18n } = useTranslation();

    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [platform, setPlatform] = React.useState<string>("pc");
    return (
    <Container>
        <Back to="/"><ArrowLeft/>{t("playerSearch.back")}</Back>
        <Align>
            <h2>{t("playerSearch.bfStats")}</h2>
            <AltDescription>{t("playerSearch.description")}</AltDescription>
        </Align>
        <Align>
            <form>
                <SearchBox placeholder={t("playerSearch.searchPlaceholder")} value={searchTerm} onChange={(ev: React.ChangeEvent<HTMLInputElement>):
                    void => setSearchTerm(ev.target.value)}/>
                <BigSelectSecondary value={platform} onChange={(ev: React.ChangeEvent<HTMLSelectElement>):
                        void => setPlatform(ev.target.value)}>
                    <option value="pc">{t("platforms.pc")}</option>
                    <option value="xboxone">{t("platforms.xboxone")}</option>
                    <option value="xbox360">{t("platforms.xbox360")}</option>
                    <option value="ps4">{t("platforms.ps4")}</option>
                    <option value="ps3">{t("platforms.ps3")}</option>
                </BigSelectSecondary>
                {searchTerm!==""?
                    <Link to={`/stats/${platform}/name/${searchTerm}`}>
                        <BigButtonSecondary type="submit">{t("playerSearch.search")} <RightArrow/></BigButtonSecondary>
                    </Link>
                // if no name is filled in
                    :<BigButtonSecondary type="submit">{t("playerSearch.search")} <RightArrow/></BigButtonSecondary>
                }
            </form>
        </Align>
        <Title>{t("playerSearch.gameStatus")}</Title>
        <Description>{t("playerSearch.statusDescription")}</Description>
    </Container>
    )
}

export default Search;
