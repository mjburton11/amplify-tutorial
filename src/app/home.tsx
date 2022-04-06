import React from "react";
import { HomeProps } from "../types/home";
import Header from "./header";

export default function Home(props: HomeProps) {
  const { signIn, signOut } = props;
  return (
    <>
      <Header signIn={signIn} signOut={signOut} />
    </>
  );
}
