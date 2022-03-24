import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import getConfig from "next/config";

const Home: NextPage = (props: any) => {
  const [text, setText] = useState(false);
  const [username, setUsername] = useState(false);

  const submitItem = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const config = getConfig();
    const sampleData = { username: username, text: text };
    const res = await fetch(
      `${config.publicRuntimeConfig.apiUrl}/achievements`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sampleData),
      }
    );

    const json = await res.json();
  };

  return (
    <>
      <h1>Application</h1>
      <form onSubmit={submitItem}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value as any)}
        />
        <input
          type="text"
          placeholder="Achievement"
          onChange={(e) => setText(e.target.value as any)}
        />
        <button id="addItem" type="submit">
          Submit
        </button>
      </form>
      <p>The current Achievements:</p>
      <div>
        <ul>
          {props.achievements.map(function (achievement: any) {
            return <li key={achievement._id}>{achievement.text}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

Home.getInitialProps = async (ctx) => {
  const config = getConfig();

  const res = await fetch(`${config.publicRuntimeConfig.apiUrl}/achievements`);

  const json = await res.json();

  return { achievements: json };
};

export default Home;
