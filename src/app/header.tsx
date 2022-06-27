import React from "react";
import { colors } from "../styles/colors";
import { HeaderProps } from "../types/home";

export default function Header(props: HeaderProps) {
  const { signIn, signOut } = props;
  return (
    <header
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        background: colors.grey,
        alignItems: "center",
        padding: 4,
      }}
    >
      <img
        style={{ width: 25, height: 25, transform: "rotate(270deg)" }}
        alt={""}
        src={require("../assets/images/logo2.webp")}
      ></img>
      <span
        style={{
          fontFamily: "Hanalei Fill",
          fontSize: "20px",
          color: colors.blue,
        }}
      >
        PT&A
      </span>
      <button
        style={{
          fontFamily: "Ubuntu",
          font: "sans-serif",
          color: colors.purple,
          borderColor: colors.purple,
        }}
        onClick={signIn ? signIn : signOut ? signOut : () => {}}
      >
        {signIn ? "Sign In" : signOut ? "Sign Out" : ""}
      </button>
    </header>
  );
}
