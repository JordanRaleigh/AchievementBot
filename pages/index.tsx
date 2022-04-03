import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import getConfig from "next/config";
import Login from "./login";
import { useSession } from "next-auth/react";
import { useCookies } from "react-cookie";

const Home: NextPage = (props: any) => {
  const [text, setText] = useState(false);
  const [year, setYear] = useState(false);
  const { data: session } = useSession();

  const submitItem = async (event: React.FormEvent<HTMLFormElement>) => {
    if (session) {
      event.preventDefault();
      const config = getConfig();
      const sampleData = {
        username: session.user?.email,
        year: year,
        text: text,
      };
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
    } else {
      alert("Please login to submit an achievement");
    }
  };

  return (
    <>
      <Login />
      <h1>Application</h1>
      <form onSubmit={submitItem}>
        <label>In... </label>
        <input
          type="text"
          placeholder="Year"
          onChange={(e) => setYear(e.target.value as any)}
        />
        <label> I... </label>
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
      <div>
        <p>
          {props.quote.map(function (quote: any) {
            return (
              <div key={"1"}>
                <h3>{quote.q}</h3>
                <h4>{quote.a}</h4>
              </div>
            );
          })}
        </p>
      </div>
      <p>
        Inspirational quotes provided by{" "}
        <a href="https://zenquotes.io/">ZenQuotes API</a>
      </p>
    </>
  );
};

Home.getInitialProps = async (ctx) => {
  const config = getConfig();

  const res = await fetch(`${config.publicRuntimeConfig.apiUrl}/achievements`);

  const achievementsJson = await res.json();

  const quoteResponse = await fetch(
    `https://zenquotes.io/api/today/${config.publicRuntimeConfig.quoteKey}`
  );

  const quoteJson = await quoteResponse.json();

  return { achievements: achievementsJson, quote: quoteJson };
};

export default Home;
