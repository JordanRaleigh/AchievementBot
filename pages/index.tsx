import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = (props: any) => {
  // console.log(props.text);
  return (
    <>
      <h1>Application</h1>
      <p>The current Achievements:</p>
      <ul>
        {props.achievements.map(function (achievement) {
          return <li key={achievement._id}>{achievement.text}</li>;
        })}
      </ul>
    </>
  );
};

Home.getInitialProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/achievements");
  const json = await res.json();

  return { achievements: json };

  //{

  //   // achievements: [
  //   //   {
  //   //     _id: { $oid: "6230f5140f0b715b2f7146f6" },
  //   //     username: "jordanraleigh",
  //   //     text: "Got a job at Zapier!",
  //   //   },
  //   // ],
  // };
};

export default Home;
