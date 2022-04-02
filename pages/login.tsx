import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Login() {
  const { data: session } = useSession();

  const handleSignin = (e) => {
    e.preventDefault();
    signIn();
  };
  const handleSignout = (e) => {
    e.preventDefault();
    signOut();
  };

  return (
    <>
      <div className="header">
        {session && (
          <button onClick={handleSignout} className="btn-signin">
            Sign out
          </button>
        )}
        {!session && (
          <button onClick={handleSignin} className="btn-signin">
            Sign in
          </button>
        )}
      </div>
    </>
  );
}
