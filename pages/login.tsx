import { useSession, signIn, signOut } from "next-auth/react";
import { useCookies } from "react-cookie";
import Button from "@mui/material/Button";

export default function Login() {
  const { data: session } = useSession();
  const [cookies, setCookie] = useCookies(["user"]);

  if (session) {
    setCookie("user", session.user?.email, {
      path: "/",
      sameSite: true,
    });

    return (
      <>
        Signed in as {session.user?.email}
        <Button variant="outlined" onClick={() => signOut()}>
          Sign out
        </Button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <Button variant="contained" onClick={() => signIn()}>
        Sign in
      </Button>
    </>
  );
}
