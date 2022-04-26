import type { NextPage } from "next";
import React, { useState } from "react";
import "typeface-roboto";
import getConfig from "next/config";
import Login from "./login";
import { useSession } from "next-auth/react";
import List from "@mui/material/List";
import Button from "@mui/material/Button";

const Home: NextPage = (props: any) => {
  const [text, setText] = useState(false);
  const [year, setYear] = useState(false);
  const { data: session } = useSession();

  const submitItem = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("hit the submitItem");
    if (session) {
      console.log("inside session if");
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
      window.location.reload();
    } else {
      alert("Please login to submit an achievement");
    }
  };

  return (
    <div className="container-main">
      <div>
        <Login />
      </div>
      <div>
        <h1>AchievementBot</h1>
        <form onSubmit={submitItem}>
          <span className="label1">In... </span>
          <input
            className="input1"
            type="text"
            placeholder="Year"
            onChange={(e) => setYear(e.target.value as any)}
          />
          <span className="label1"> I... </span>
          <input
            className="input1"
            type="text"
            placeholder="Achievement"
            onChange={(e) => setText(e.target.value as any)}
          />
          <Button variant="contained" id="addItem" type="submit">
            Submit
          </Button>
        </form>
      </div>
      <div>
        <p className="text-bold achieve-title">The current Achievements:</p>
        <List>
          {props.achievements.map(function (achievement: any) {
            return (
              <div key={achievement._id} className="flex-row achieve-container">
                <p>
                  In <span>{achievement.year}</span>, I{" "}
                  <span>{achievement.text}</span>
                </p>
              </div>
            );
          })}
        </List>
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
        <p>
          Inspirational quotes provided by{" "}
          <a href="https://zenquotes.io/">ZenQuotes API</a>
        </p>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx: any) {
  const config = getConfig();
  const res = await fetch(
    `${config.publicRuntimeConfig.apiUrl}/achievements?user=${ctx.req.cookies.user}`
  );

  const achievementsJson = await res.json();

  const quoteResponse = await fetch(
    `https://zenquotes.io/api/today/${config.publicRuntimeConfig.quoteKey}`
  );

  const quoteJson = await quoteResponse.json();

  return {
    props: {
      achievements: achievementsJson,
      quote: quoteJson,
    },
  };
}

export default Home;
