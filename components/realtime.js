import React, { useState, useEffect } from "react";
import * as Realm from "realm-web";
import { useSetRecoilState } from "recoil";
import { QnBnkAtom, EdittedQnBnkAtom } from "../state/quizState";
import { RecordsAtom } from "../state/recordsState";
import { BoldfaceAtom } from "../state/bfState";

//utils
import boldfaces from "../utils/bf.json";
import { mongoGet } from "../utils/mongoHelper";

const app = new Realm.App({ id: "application-0-pmrra" });

const Realtime = () => {
  const setRS = useSetRecoilState(RecordsAtom);
  const setQnBnk = useSetRecoilState(QnBnkAtom);
  const setEdittedQnBnk = useSetRecoilState(EdittedQnBnkAtom);
  const setBF = useSetRecoilState(BoldfaceAtom);
  const [user, setUser] = useState();
  const [recordevents, setRecordsEvents] = useState([]);
  const [Quizevents, setQuizEvents] = useState([]);

  const getData = async (hdr, query) => {
    const data = await mongoGet(query);
    //console.log(data);
    switch (hdr) {
      case "records":
        setRS(data);
        break;
      case "QnBank":
        setQnBnk(data);
        setEdittedQnBnk(data);
        break;
      default:
    }
  };

  // This useEffect hook will run on events change
  useEffect(() => {
    getData("records", "/getRecords");
  }, [recordevents]);

  useEffect(() => {
    getData("QnBank", "/getQuiz");
  }, [Quizevents]);

  useEffect(() => {
    getData("records", "/getRecords");
    getData("QnBank", "/getQuiz");
    setBF(boldfaces);

    login();
    login2();
  }, []); // Return the JSX that will generate HTML for the page

  //TODO use one change stream probably through a middleware. watch db instead of individual coll
  const login = async () => {
    // Authenticate anonymously
    const user = await app.logIn(Realm.Credentials.anonymous());
    setUser(user); // Connect to the database

    const mongodb = app.currentUser.mongoClient("mongodb-atlas");
    const records = mongodb.db("enforcer").collection("records");
    // Everytime a change happens in the stream, add it to the list of events
    for await (const change of records.watch()) {
      setRecordsEvents((events) => [...events, change]);
      console.log(change);
    }
  };

  const login2 = async () => {
    // Authenticate anonymously
    const user = await app.logIn(Realm.Credentials.anonymous());
    setUser(user); // Connect to the database

    const mongodb = app.currentUser.mongoClient("mongodb-atlas");
    const Quiz = mongodb.db("enforcer").collection("Quiz");
    // Everytime a change happens in the stream, add it to the list of events
    for await (const change of Quiz.watch()) {
      setQuizEvents((events) => [...events, change]);
      console.log(change);
    }
  };

  return;
};

export default Realtime;
