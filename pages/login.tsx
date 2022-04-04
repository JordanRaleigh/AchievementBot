import { useSession, signIn, signOut } from "next-auth/react";
import { useCookies } from "react-cookie";

export default function Login() {
  const { data: session } = useSession();
  const [cookies, setCookie] = useCookies(["user"]);

  if (session) {
    console.log(session.user);
    setCookie("user", session.user?.email, {
      path: "/",
      sameSite: true,
    });

    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  //Cookie Testing Purposes
  //setCookie("user", "jordan.raleigh"),
  //   {
  //     path: "/",
  //     sameSite: true,
  //   };
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
