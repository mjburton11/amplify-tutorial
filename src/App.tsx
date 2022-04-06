import { CognitoUserAmplify } from "@aws-amplify/ui";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify, AuthModeStrategyType } from "aws-amplify";
import React, { useState } from "react";
import "./App.css";
import Home from "./app/home";
import awsmobile from "./aws-exports";

Amplify.configure({
  ...awsmobile,
  DataStore: { authModeStrategyType: AuthModeStrategyType.MULTI_AUTH },
});

export default function App() {
  const [openSignIn, setOpenSignIn] = useState<boolean>(false);
  const [user, setUser] = useState<CognitoUserAmplify | null>(null);

  const handleSignIn = () => {
    setOpenSignIn(true);
  };

  return !user && !openSignIn ? (
    <Home userInfo={user} signIn={handleSignIn} />
  ) : (
    <Authenticator>
      {({ signOut, user }) => {
        setUser(user);
        return (
          <Home
            userInfo={user}
            signOut={() => {
              setOpenSignIn(false);
              setUser(null);
              return signOut;
            }}
          />
        );
      }}
    </Authenticator>
  );
}

const styles = {
  container: { width: 480, margin: "0 auto", padding: 20 },
  form: { display: "flex", marginBottom: 15 },
  input: {
    flexGrow: 2,
    border: "none",
    backgroundColor: "#ddd",
    padding: 12,
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "black",
    color: "white",
    outline: "none",
    padding: 12,
    fontSize: 18,
  },
  note: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 22,
    marginBottom: 15,
  },
  deleteButton: { fontSize: 18, fontWeight: "bold" },
};
