import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../locales/config";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import { M88 } from "../Materials";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const Nav = styled.div`
  ${M88};
  height: 90px;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  padding: 0 8.33%;
  @media (max-width: 600px) {
    padding: 0 5%;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const LinkWrapper = styled.div`
  display: flex;
  position: relative;
  display: -webkit-flex;
  display: flex;
  align-items: center;
`;

const Separator = styled.div`
  height: 18px;
  border: 0.5px solid rgba(255, 255, 255, 0.22);
  display: flex;
`;

const sharedLink = css`
  font-family: Manrope, serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 102.3%;
  text-decoration: none;
  /* or 14px */

  display: flex;
  overflow: hidden;
  white-space: nowrap;
  //flex: 0 0 136px;
  flex-shrink: 0;
  padding: 0 22px;
  align-items: center;
  text-align: center;

  color: rgba(255, 255, 255, 0.72);
`;

const HLink = styled(Link)`
  ${sharedLink}
`;

const ALink = styled.a`
  ${sharedLink}
`;

const SLink = styled(Link)`
  font-weight: 800;
  font-size: 18px;
`;

const ButtonLink = styled.a`
  ${sharedLink};
  padding: 0 20px;
  height: 40px;
  background: var(--color-blue);
  border-radius: 5px;
  transition: all 0.1s;

  :hover {
    background: var(--color-blue-alt);
  }
`;

const Ul = styled.ul<{ open: boolean }>`
  list-style: none;
  display: flex;
  flex-flow: column nowrap;
  background-color: var(--color-base);
  position: fixed;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  top: 0;
  right: 0;
  height: 100%;
  width: 220px;
  padding-top: 4.5rem;
  transition: transform 0.3s ease-in-out;
  z-index: 10;
  margin-top: 0;

  li {
    color: #fff;
    padding: 15px 10px;
  }
`;

const StyledBurger = styled.div<{ open: boolean }>`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 30px;
  right: 20px;
  z-index: 20;
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) =>
      open ? "var(--color-text)" : "var(--color-alt-text)"};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
      transform: ${({ open }) => (open ? "translateX(100%)" : "translateX(0)")};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

const RightNav = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();
  return (
    <Ul open={open}>
      <li onClick={() => setOpen(false)}>
        <HLink to="/stats" title={t("navBar.bfStats")}>
          {t("navBar.bfStats")}
        </HLink>
      </li>
      <li>
        <ALink
          target="_blank"
          href="https://discord.gametools.network/"
          title={t("navBar.discord")}
        >
          {t("navBar.discord")}
        </ALink>
      </li>
      <li>
        <ALink
          target="_blank"
          href="https://api.gametools.network/"
          title={t("navBar.api")}
        >
          {t("navBar.api")}
        </ALink>
      </li>
      <li>
        <ButtonLink
          target="_blank"
          href="https://top.gg/bot/714524944783900794"
        >
          {t("navBar.bot")}
        </ButtonLink>
      </li>
    </Ul>
  );
};

const Burger = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <RightNav open={open} setOpen={setOpen} />
    </>
  );
};

export function Navbar(): JSX.Element {
  const { t } = useTranslation();
  const homePage = useLocation().pathname === "/";
  const [width, setWidth] = useState(window.innerWidth);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  return (
    <Nav>
      <Header onClick={() => setOpen(false)}>
        {homePage ? null : <SLink to="/">{t("siteName")}</SLink>}
      </Header>
      {width < 730 ? (
        <Burger open={open} setOpen={setOpen} />
      ) : (
        <LinkWrapper>
          <HLink to="/stats" title={t("navBar.bfStats")}>
            {t("navBar.bfStats")}
          </HLink>
          <Separator />
          <ALink
            target="_blank"
            href="https://discord.gametools.network/"
            title={t("navBar.discord")}
          >
            {t("navBar.discord")}
          </ALink>
          <ALink
            target="_blank"
            href="https://api.gametools.network/"
            title={t("navBar.api")}
          >
            {t("navBar.api")}
          </ALink>
          <ButtonLink
            target="_blank"
            href="https://top.gg/bot/714524944783900794"
          >
            {t("navBar.bot")}
          </ButtonLink>
        </LinkWrapper>
      )}
    </Nav>
  );
}
