import ButtonAppBar from "./Appbar";

export default function Layout({ children }) {
  return (
    <>
      <ButtonAppBar />
      <main>{children}</main>
    </>
  );
}
