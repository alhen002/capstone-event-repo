import { useSession, signIn, signOut } from "next-auth/react";
import Button from "@/components/Button";
import { useRouter } from "next/router";
export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      {session ? (
        <>
          <p>Signed in as {session.user.name} </p> <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <p>Not signed in </p>
          <br />
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
