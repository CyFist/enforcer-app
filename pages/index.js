import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Stack, Button } from "@mui/material";

import * as React from "react";
const inter = Inter({ subsets: ["latin"] });

//recoil
import { useSetRecoilState } from "recoil";
import { QnBnkAtom, EdittedQnBnkAtom } from "../state/quizState";
import { RecordsAtom } from "../state/recordsState";
import { BoldfaceAtom } from "../state/bfState";

//utils
import boldfaces from "../utils/bf.json";
import { restdbGet } from "../utils/api_client";
import { mongoGet } from "../utils/mongoHelper";

export default function Home() {
  const setRS = useSetRecoilState(RecordsAtom);
  const setQnBnk = useSetRecoilState(QnBnkAtom);
  const setEdittedQnBnk = useSetRecoilState(EdittedQnBnkAtom);
  const setBF = useSetRecoilState(BoldfaceAtom);

  React.useEffect(() => {
    // GET request using axios inside useEffect React hook
    /* getData(
      "records",
      '/records?q={}&h={"$orderby": {"Valid": -1, "User": 1 }}'
    ); */
    getData("records", "/getRecords");
    getData("QnBank", "/getQuiz");
    setBF(boldfaces);
  });

  const getData = async (hdr, query) => {
    const data = await mongoGet(query);
    console.log(data);
    switch (hdr) {
      case "records":
        setRS(data);
        break;
      case "QnBank":
        setQnBnk(data);
        setEdittedQnBnk(data);
        break;
      default:
      // code here
    }
  };
  return (
    <>
      <main></main>
    </>
  );
}
