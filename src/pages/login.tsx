import { Button } from "@material-ui/core";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase/firebase";

const Login: React.FC = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <Wrapper>
      <Head>
        <title>Login</title>
      </Head>

      <Container>
        <LogoContainer>
          <Image
            src="/WhatsappLogo.jpg"
            width={200}
            height={200}
            objectFit="contain"
            alt="Whatsapp logo"
          />
        </LogoContainer>
        <Button onClick={signIn} variant="outlined">
          Sign in with Google
        </Button>
      </Container>
    </Wrapper>
  );
};

export default withAuthUser({ whenAuthed: AuthAction.REDIRECT_TO_APP })(Login);

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background: whitesmoke;
`;

const Container = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const LogoContainer = styled.div`
  margin-bottom: 50px;
`;
