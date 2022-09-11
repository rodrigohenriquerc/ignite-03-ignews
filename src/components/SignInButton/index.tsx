import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export function SignInButton() {
  const { data } = useSession();

  useEffect(() => {
    if (data?.user && data?.expires) {
      const {
        user: { name, email },
        expires,
      } = data;
      console.log({ name, email, expires });
    }
  }, [data, data?.user]);

  return data?.user ? (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      <FaGithub color="#04d361" />
      {data?.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signIn("github")}
    >
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}
