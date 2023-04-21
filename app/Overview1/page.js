import * as React from "react";
import Container from "@mui/material/Container";
import UsersGrid from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import UserManagement from "../components/UserManagement";

const Overview = (props) => {
  return (
    <Container>
      <SearchBar />
      <UsersGrid />
      <UserManagement />
    </Container>
  );
};

export default Overview;
