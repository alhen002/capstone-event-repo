import { useSession, signIn, signOut } from "next-auth/react";
import Button from "@/components/Button";
import { useRouter } from "next/router";
export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    return (
      <>
        Signed in as {session.user.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <Button
        onClick={() => {
          signIn("github", { callbackUrl: "/" });
        }}
      >
        Sign in
      </Button>
    </>
  );
}
