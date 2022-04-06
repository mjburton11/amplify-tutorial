export type HeaderProps = {
  signIn?: () => void;
  signOut?: () => (
    data?: Record<string | number | symbol, any> | undefined,
  ) => void;
};

export type HomeProps = {
  userInfo: CognitoUserAmplify | null;
} & HeaderProps;
