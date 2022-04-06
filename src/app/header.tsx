import React from "react";
import { HeaderProps } from "../types/home";

export default function Header(props: HeaderProps) {
  const { signIn, signOut } = props;
  return (
    <header
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        color: "blue",
        background: "grey",
        alignItems: "center",
        padding: 4,
      }}
    >
      <img
        style={{ width: 20, height: 20 }}
        alt={""}
        src={require("../assets/images/logo2.webp")}
      ></img>
      <span>PT&A</span>
      <button onClick={signIn ? signIn : signOut ? signOut : () => {}}>
        {signIn ? "Sign In" : signOut ? "Sign Out" : ""}
      </button>
    </header>
  );
}
