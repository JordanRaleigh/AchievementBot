import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import getConfig from "next/config";
import Login from "./login";
import { useSession } from "next-auth/react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import WorkIcon from "@mui/icons-material/Work";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";

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
      <h1>AchievementBot</h1>
      <form onSubmit={submitItem}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <label>In... </label>
          <TextField
            id="standard-basic"
            label="Year"
            variant="standard"
            type="text"
            placeholder="Year"
            onChange={(e) => setYear(e.target.value as any)}
          />
          <label> I... </label>
          <TextField
            id="standard-basic"
            label="Achievement"
            variant="standard"
            type="text"
            placeholder="Achievement"
            onChange={(e) => setText(e.target.value as any)}
          />
          <Button variant="contained" id="addItem" type="submit">
            Submit
          </Button>
        </Box>
      </form>
      <p>The current Achievements:</p>
      <div>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {props.achievements.map(function (achievement: any) {
            return (
              <List
                key={achievement._id}
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <WorkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={achievement.text}
                    secondary={achievement.year}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
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
      </div>
      <p>
        Inspirational quotes provided by{" "}
        <a href="https://zenquotes.io/">ZenQuotes API</a>
      </p>
    </>
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
