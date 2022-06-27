import React from 'react';
import { HomeProps } from '../types/home';
import Header from './header';
import Stories from './stories';

export default function Home(props: HomeProps) {
  const { signIn, signOut, userInfo } = props;
  console.log('test', userInfo);
  return (
    <>
      <Header signIn={signIn} signOut={signOut} />
      {userInfo ? <Stories /> : <></>}
    </>
  );
}
