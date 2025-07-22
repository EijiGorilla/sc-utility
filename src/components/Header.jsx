import { DropdownData } from "./DropdownContext";

function Header() {
  return (
    <>
      <header
        slot="header"
        id="header-title"
        style={{
          display: "flex",
          height: "70px",
          padding: "0 1rem",
          borderStyle: "solid",
          borderWidth: 4,
          borderColor: "#555555",
        }}
      >
        <img
          src="https://EijiGorilla.github.io/Symbols/Projec_Logo/DOTr_Logo_v2.png"
          alt="DOTr Logo"
          height={"55px"}
          width={"55px"}
          style={{ marginBottom: "auto", marginTop: "auto" }}
        />
        <b className="headerTitle">SC UTILITY</b>

        {/* Dropdown component */}
        <DropdownData />

        <img
          src="https://EijiGorilla.github.io/Symbols/Projec_Logo/GCR LOGO.png"
          alt="GCR Logo"
          height={"50px"}
          width={"75px"}
          style={{
            marginBottom: "auto",
            marginTop: "auto",

            marginLeft: "auto",
            paddingRight: "35px",
          }}
        />
      </header>
    </>
  );
}

export default Header;
