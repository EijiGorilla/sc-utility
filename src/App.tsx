import React, { createContext, useState } from "react";
import "./App.css";
import "./index.css";
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/calcite/calcite.css";
import { CalciteShell } from "@esri/calcite-components-react";
import MapDisplay from "./components/MapDisplay";
import ActionPanel from "./components/ActionPanel";
import Header from "./components/Header";
import Chart from "./components/Chart";
import UndergroundSwitch from "./components/UndergroundSwitch";

type MyDropdownContextType = {
  contractcps: any;
  companies: any;
  ptLinetypes: any;
  updateContractcps: any;
  updateCompanies: any;
  updateTypes: any;
};

const initialState = {
  contractcps: undefined,
  companies: undefined,
  ptLinetypes: undefined,
  updateContractcps: undefined,
  updateCompanies: undefined,
  updateTypes: undefined,
};

export const MyContext = createContext<MyDropdownContextType>({
  ...initialState,
});

function App() {
  const [contractcps, setContractcps] = useState<any>();
  const [companies, setCompanies] = useState<any>();
  const [ptLinetypes, setPtLineTypes] = useState<any>();

  const updateContractcps = (newContractcp: any) => {
    setContractcps(newContractcp);
  };

  const updateCompanies = (newCompany: any) => {
    setCompanies(newCompany);
  };

  const updateTypes = (newPtLineType: any) => {
    setPtLineTypes(newPtLineType);
  };

  return (
    <div>
      <CalciteShell>
        <MyContext
          value={{
            contractcps,
            companies,
            ptLinetypes,
            updateContractcps,
            updateCompanies,
            updateTypes,
          }}
        >
          <ActionPanel />
          <UndergroundSwitch />
          <Chart />
          <MapDisplay />
          <Header />
        </MyContext>
      </CalciteShell>
    </div>
  );
}

export default App;
