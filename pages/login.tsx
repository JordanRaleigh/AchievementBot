import { useSession, signIn, signOut } from "next-auth/react";
import { useCookies } from "react-cookie";
import Button from "@mui/material/Button";

export default function Login() {
  const { data: session } = useSession();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  function signingOut() {
    removeCookie("user", { path: "/" });
    signOut();
    window.location.reload();
  }

  function signingIn() {
    signIn();
    window.location.reload();
  }

  if (session) {
    setCookie("user", session.user?.email, {
      path: "/",
      sameSite: true,
    });

    return (
      <>
        Signed in as {session.user?.email}
        <Button variant="outlined" onClick={signingOut}>
          Sign out
        </Button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <Button variant="contained" onClick={signingIn}>
        Sign in
      </Button>
    </>
  );
}
