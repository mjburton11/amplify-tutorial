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
