import { useSession, signIn, signOut } from "next-auth/react";
import Button from "@/components/Button";
import LinkButton from "@/components/LinkButton";
import { useRouter } from "next/router";
export default function Login() {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <>
          <p>Signed in as {session.user.name} </p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <p>The site you tried to access requires a login. </p>
          <Button
            onClick={() => {
              signIn("github");
            }}
          >
            Sign in
          </Button>
        </>
      )}
    </>
  );
}
