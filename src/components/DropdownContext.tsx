import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  use,
} from "react";
import Select from "react-select";
import "../index.css";
import "../App.css";
import { DropDownData } from "../customClass";
import { utilityLineLayer, utilityPointLayer } from "../layers";
import { MyContext } from "../App";

export function DropdownData() {
  const { updateContractcps, updateCompanies, updateTypes } = use(MyContext);

  // For dropdown filter
  const [initContractPacakgeCompType, setInitContractPacakgeCompType] =
    useState([]);

  const [contractPackage, setContractPackage] = useState<any>(null);
  const [companys, setCompany] = useState(null);
  const [utypes, setType] = useState<null | undefined | string>(null);

  const [companyList, setCompanyList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [companySelected, setCompanySelected] = useState({ name: "" });

  useEffect(() => {
    const dropdownData = new DropDownData({
      featureLayers: [utilityPointLayer, utilityLineLayer],
      fieldNames: ["CP", "Company", "Type"],
    });

    dropdownData.dropDownQuery().then((response: any) => {
      setInitContractPacakgeCompType(response);
    });
  }, []);

  const handleContractPackageChange = (obj: any) => {
    setContractPackage(obj);
    setCompanyList(obj.field2);
    setCompany(null);
    setCompanySelected(obj);
    setType(null);
    updateContractcps(obj.field1);
    updateCompanies(undefined);
    updateTypes(undefined);
  };

  const handleCompanyChange = (obj: any) => {
    setCompanySelected(obj);
    setCompany(obj);
    setTypeList(obj.field3);
    setType(null);
    updateCompanies(obj.name);
    updateTypes(undefined);
  };

  const handleTypeChange = (obj: any) => {
    setType(obj);
    updateTypes(obj.name);
  };

  return (
    <>
      <DropdownListDisplay
        handleContractPackageChange={handleContractPackageChange}
        handleCompanyChange={handleCompanyChange}
        handleTypeChange={handleTypeChange}
        initContractPacakgeCompType={initContractPacakgeCompType}
        contractPackage={contractPackage}
        companys={companys}
        utypes={utypes}
        companyList={companyList}
        typeList={typeList}
        companySelected={companySelected}
      ></DropdownListDisplay>
    </>
  );
}

export function DropdownListDisplay({
  handleContractPackageChange,
  handleCompanyChange,
  handleTypeChange,
  initContractPacakgeCompType,
  contractPackage,
  companys,
  utypes,
  companyList,
  typeList,
}: any) {
  // Style CSS
  const customstyles = {
    option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
      // const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isFocused
          ? "#555555"
          : isSelected
          ? "#2b2b2b"
          : "#2b2b2b",
        color: "#ffffff",
      };
    },

    control: (defaultStyles: any) => ({
      ...defaultStyles,
      backgroundColor: "#2b2b2b",
      borderColor: "#949494",
      height: 35,
      width: "170px",
      color: "#ffffff",
    }),
    singleValue: (defaultStyles: any) => ({ ...defaultStyles, color: "#fff" }),
  };

  return (
    <div className="dropdownFilter">
      <div className="dropdownFilterLayout">
        <b style={{ color: "white", margin: 10, fontSize: "0.9vw" }}></b>
        <Select
          placeholder="Select CP"
          value={contractPackage}
          options={initContractPacakgeCompType}
          onChange={handleContractPackageChange}
          getOptionLabel={(x: any) => x.field1}
          styles={customstyles}
        />
        <br />
        <b style={{ color: "white", margin: 10, fontSize: "0.9vw" }}></b>
        <Select
          placeholder="Select Company"
          value={companys}
          options={companyList}
          onChange={handleCompanyChange}
          getOptionLabel={(x: any) => x.name}
          styles={customstyles}
        />
        <br />
        <b style={{ color: "white", margin: 10, fontSize: "0.9vw" }}></b>
        <Select
          placeholder="Select Type"
          value={utypes}
          options={typeList}
          onChange={handleTypeChange}
          getOptionLabel={(x: any) => x.name}
          styles={customstyles}
        />
      </div>
    </div>
  );
}
