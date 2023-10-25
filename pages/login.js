import { useSession, signIn, signOut } from "next-auth/react";
import Button from "@/components/Button";
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
          <p>Not signed in </p>
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
