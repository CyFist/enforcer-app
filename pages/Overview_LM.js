import * as React from "react";
import Container from "@mui/material/Container";
import UsersGrid from "../components/UserCard_LM";
import SearchBar from "../components/SearchBar_LM";
import UserManagement from "../components/UserManagement_LM";

const LMOverview = (props) => {
  return (
    <Container>
      <SearchBar />
      <UsersGrid />
      <UserManagement />
    </Container>
  );
};

export default LMOverview;
