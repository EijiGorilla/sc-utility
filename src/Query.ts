import {
  dateTable,
  utilityLineLayer,
  utilityLineLayer1,
  utilityPointLayer,
  utilityPointLayer1,
  viaductLayer,
} from "./layers";
import StatisticDefinition from "@arcgis/core/rest/support/StatisticDefinition";
import Query from "@arcgis/core/rest/support/Query";

// Updat date
export async function dateUpdate() {
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const query = dateTable.createQuery();
  query.where = "project = 'SC'" + " AND " + "category = 'Utility Relocation'";

  return dateTable.queryFeatures(query).then((response: any) => {
    const stats = response.features;
    const dates = stats.map((result: any) => {
      const date = new Date(result.attributes.date);
      const year = date.getFullYear();
      const month = monthList[date.getMonth()];
      const day = date.getDate();
      const final = year < 1990 ? "" : `${month} ${day}, ${year}`;
      return final;
    });
    return dates;
  });
}

// Generate chart data
const uitlType = ["Telecom", "Water", "Sewage", "Power", "Oil & Gas"];

export async function generateUtilPointChartData({ contractp, company }: any) {
  var total_telecom_incomp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 1 and Status = 0) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_telecom_incomp",
    statisticType: "sum",
  });

  var total_telecom_comp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 1 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_telecom_comp",
    statisticType: "sum",
  });

  var total_water_incomp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 2 and Status = 0) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_water_incomp",
    statisticType: "sum",
  });

  var total_water_comp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 2 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_water_comp",
    statisticType: "sum",
  });

  var total_sewage_incomp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 3 and Status = 0) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_sewage_incomp",
    statisticType: "sum",
  });

  var total_sewage_comp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 3 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_sewage_comp",
    statisticType: "sum",
  });

  var total_power_incomp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 4 and Status = 0) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_power_incomp",
    statisticType: "sum",
  });

  var total_power_comp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 4 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_power_comp",
    statisticType: "sum",
  });

  // Query
  var query = utilityPointLayer.createQuery();
  query.outStatistics = [
    total_telecom_incomp,
    total_telecom_comp,
    total_water_incomp,
    total_water_comp,
    total_sewage_incomp,
    total_sewage_comp,
    total_power_incomp,
    total_power_comp,
  ];

  // Query
  const qCP = "CP = '" + contractp + "'";
  const qCompany = "Company = '" + company + "'";
  const qCpCompany = qCP + " AND " + qCompany;

  const finalExpression = contractp && !company ? qCP : qCpCompany;

  query.where = finalExpression;
  utilityPointLayer.definitionExpression = finalExpression;
  utilityPointLayer1.definitionExpression = finalExpression;
  viaductLayer.definitionExpression = qCP;
  utilityPointLayer.visible = true;
  utilityPointLayer1.visible = true;
  utilityLineLayer.visible = false;
  utilityLineLayer1.visible = false;

  // zoom to layer
  // zoomToLayer(utilityPointLayer);

  return utilityPointLayer.queryFeatures(query).then((response: any) => {
    var stats = response.features[0].attributes;
    const telecom_incomp = stats.total_telecom_incomp;
    const telecom_comp = stats.total_telecom_comp;
    const water_incomp = stats.total_water_incomp;
    const water_comp = stats.total_water_comp;
    const sewage_incomp = stats.total_sewage_incomp;
    const sewage_comp = stats.total_sewage_comp;
    const power_incomp = stats.total_power_incomp;
    const power_comp = stats.total_power_comp;

    const data = [
      {
        category: uitlType[0],
        comp: telecom_comp,
        incomp: telecom_incomp,
        icon: "https://EijiGorilla.github.io/Symbols/Telecom_Logo2.svg",
      },
      {
        category: uitlType[1],
        comp: water_comp,
        incomp: water_incomp,
        icon: "https://EijiGorilla.github.io/Symbols/Water_Logo2.svg",
      },
      {
        category: uitlType[2],
        comp: sewage_comp,
        incomp: sewage_incomp,
        icon: "https://EijiGorilla.github.io/Symbols/Sewage_Logo2.svg",
      },
      {
        category: uitlType[3],
        comp: power_comp,
        incomp: power_incomp,
        icon: "https://EijiGorilla.github.io/Symbols/Power_Logo2.svg",
      },
    ];
    return data;
  });
}

export async function generateUtilLineChartData({ contractp, company }: any) {
  var total_telecom_incomp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 1 and Status = 0) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_telecom_incomp",
    statisticType: "sum",
  });

  var total_telecom_comp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 1 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_telecom_comp",
    statisticType: "sum",
  });

  var total_water_incomp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 2 and Status = 0) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_water_incomp",
    statisticType: "sum",
  });

  var total_water_comp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 2 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_water_comp",
    statisticType: "sum",
  });

  var total_sewage_incomp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 3 and Status = 0) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_sewage_incomp",
    statisticType: "sum",
  });

  var total_sewage_comp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 3 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_sewage_comp",
    statisticType: "sum",
  });

  var total_power_incomp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 4 and Status = 0) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_power_incomp",
    statisticType: "sum",
  });

  var total_power_comp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 4 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_power_comp",
    statisticType: "sum",
  });

  var total_oilgas_incomp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 5 and Status = 0) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_oilgas_incomp",
    statisticType: "sum",
  });

  var total_oilgas_comp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 5 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_oilgas_comp",
    statisticType: "sum",
  });

  // Query
  var query = utilityLineLayer.createQuery();
  query.outStatistics = [
    total_telecom_incomp,
    total_telecom_comp,
    total_water_incomp,
    total_water_comp,
    total_sewage_incomp,
    total_sewage_comp,
    total_power_incomp,
    total_power_comp,
    total_oilgas_incomp,
    total_oilgas_comp,
  ];

  // Query
  const qCP = "CP = '" + contractp + "'";
  const qCompany = "Company = '" + company + "'";
  const qCpCompany = qCP + " AND " + qCompany;

  const finalExpression = contractp && !company ? qCP : qCpCompany;

  query.where = finalExpression;
  utilityLineLayer.definitionExpression = finalExpression;
  utilityLineLayer1.definitionExpression = finalExpression;
  viaductLayer.definitionExpression = qCP;
  utilityLineLayer.visible = true;
  utilityLineLayer1.visible = true;
  utilityPointLayer.visible = false;
  utilityPointLayer1.visible = false;

  // zoom to layer
  // zoomToLayer(utilityLineLayer);

  return utilityLineLayer.queryFeatures(query).then((response: any) => {
    var stats = response.features[0].attributes;
    const telecom_incomp = stats.total_telecom_incomp;
    const telecom_comp = stats.total_telecom_comp;
    const water_incomp = stats.total_water_incomp;
    const water_comp = stats.total_water_comp;
    const sewage_incomp = stats.total_sewage_incomp;
    const sewage_comp = stats.total_sewage_comp;
    const power_incomp = stats.total_power_incomp;
    const power_comp = stats.total_power_comp;
    const oilgas_incomp = stats.total_power_incomp;
    const oilgas_comp = stats.total_power_comp;

    const data = [
      {
        category: uitlType[0],
        comp: telecom_comp,
        incomp: telecom_incomp,
        icon: "https://EijiGorilla.github.io/Symbols/Telecom_Logo2.svg",
      },
      {
        category: uitlType[1],
        comp: water_comp,
        incomp: water_incomp,
        icon: "https://EijiGorilla.github.io/Symbols/Water_Logo2.svg",
      },
      {
        category: uitlType[2],
        comp: sewage_comp,
        incomp: sewage_incomp,
        icon: "https://EijiGorilla.github.io/Symbols/Sewage_Logo2.svg",
      },
      {
        category: uitlType[3],
        comp: power_comp,
        incomp: power_incomp,
        icon: "https://EijiGorilla.github.io/Symbols/Power_Logo2.svg",
      },
      {
        category: uitlType[4],
        comp: oilgas_comp,
        incomp: oilgas_incomp,
        icon: "https://EijiGorilla.github.io/Symbols/Gas_Logo2.svg",
      },
    ];
    return data;
  });
}

export async function generatePointLineChartData({ contractp, company }: any) {
  var total_water_incomp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 2 and Status = 0) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_water_incomp",
    statisticType: "sum",
  });

  var total_water_comp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 2 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_water_comp",
    statisticType: "sum",
  });

  var total_sewage_incomp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 3 and Status = 0) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_sewage_incomp",
    statisticType: "sum",
  });

  var total_sewage_comp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 3 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_sewage_comp",
    statisticType: "sum",
  });

  var total_power_incomp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 4 and Status = 0) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_power_incomp",
    statisticType: "sum",
  });

  var total_power_comp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 4 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_power_comp",
    statisticType: "sum",
  });

  var total_telecom_incomp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 1 and Status = 0) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_telecom_incomp",
    statisticType: "sum",
  });

  var total_telecom_comp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 1 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_telecom_comp",
    statisticType: "sum",
  });

  var total_oilgas_incomp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 5 and Status = 0) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_oilgas_incomp",
    statisticType: "sum",
  });

  var total_oilgas_comp = new StatisticDefinition({
    onStatisticField:
      "CASE WHEN (UtilType = 5 and Status = 1) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_oilgas_comp",
    statisticType: "sum",
  });

  var query = new Query();
  query.outStatistics = [
    total_water_incomp,
    total_water_comp,
    total_sewage_incomp,
    total_sewage_comp,
    total_power_incomp,
    total_power_comp,
    total_telecom_incomp,
    total_telecom_comp,
    total_oilgas_incomp,
    total_oilgas_incomp,
  ];

  // Query
  const qCP = "CP = '" + contractp + "'";
  const qCompany = "Company = '" + company + "'";
  const qCpCompany = qCP + " AND " + qCompany;
  const finalExpression = contractp && !company ? qCP : qCpCompany;

  const layerVisibleTrue = () => {
    utilityLineLayer.visible = true;
    utilityLineLayer1.visible = true;
    utilityPointLayer.visible = true;
    utilityPointLayer1.visible = true;
  };

  if (contractp === undefined) {
    query.where = "1=1";
    utilityPointLayer.definitionExpression = "1=1";
    utilityPointLayer1.definitionExpression = "1=1";
    utilityLineLayer.definitionExpression = "1=1";
    utilityLineLayer1.definitionExpression = "1=1";
    viaductLayer.definitionExpression = "1=1";
    layerVisibleTrue();
  } else {
    query.where = finalExpression;
    utilityPointLayer.definitionExpression = finalExpression;
    utilityPointLayer1.definitionExpression = finalExpression;
    utilityLineLayer.definitionExpression = finalExpression;
    utilityLineLayer1.definitionExpression = finalExpression;
    viaductLayer.definitionExpression = qCP;

    layerVisibleTrue();
  }

  const pointCompile = utilityPointLayer
    .queryFeatures(query)
    .then((response: any) => {
      var stats = response.features[0].attributes;
      const water_comp = stats.total_water_comp;
      const water_incomp = stats.total_water_incomp;
      const sewage_comp = stats.total_sewage_comp;
      const sewage_incomp = stats.total_sewage_incomp;
      const power_comp = stats.total_power_comp;
      const power_incomp = stats.total_power_incomp;
      const telecom_comp = stats.total_telecom_comp;
      const telecom_incomp = stats.total_telecom_incomp;
      const oilgas_incomp = stats.total_oilgas_incomp;
      const oilgas_comp = stats.total_oilgas_comp;

      return [
        water_comp,
        water_incomp,
        sewage_comp,
        sewage_incomp,
        power_comp,
        power_incomp,
        telecom_comp,
        telecom_incomp,
        oilgas_comp,
        oilgas_incomp,
      ];
    });

  const lineCompile = utilityLineLayer
    .queryFeatures(query)
    .then((response: any) => {
      var stats = response.features[0].attributes;
      const water_comp = stats.total_water_comp;
      const water_incomp = stats.total_water_incomp;
      const sewage_comp = stats.total_sewage_comp;
      const sewage_incomp = stats.total_sewage_incomp;
      const power_comp = stats.total_power_comp;
      const power_incomp = stats.total_power_incomp;
      const telecom_comp = stats.total_telecom_comp;
      const telecom_incomp = stats.total_telecom_incomp;
      const oilgas_comp = stats.total_oilgas_comp;
      const oilgas_incomp = stats.total_oilgas_incomp;

      return [
        water_comp,
        water_incomp,
        sewage_comp,
        sewage_incomp,
        power_comp,
        power_incomp,
        telecom_comp,
        telecom_incomp,
        oilgas_comp,
        oilgas_incomp,
      ];
    });

  const point = await pointCompile;
  const line = await lineCompile;

  // zoom
  // if (point[0] === null) {
  //   zoomToLayer(utilityLineLayer);
  // } else if (line[0] === null) {
  //   zoomToLayer(utilityPointLayer);
  // } else {
  //   zoomToLayer(utilityPointLayer);
  // }

  const data = [
    {
      category: uitlType[0], // Telecom
      comp: point[6] + line[6],
      incomp: point[7] + line[7],
      icon: "https://EijiGorilla.github.io/Symbols/Telecom_Logo2.svg",
    },
    {
      category: uitlType[1], // Water
      comp: point[0] + line[0],
      incomp: point[1] + line[1],
      icon: "https://EijiGorilla.github.io/Symbols/Water_Logo2.svg",
    },
    {
      category: uitlType[2], // Sewage
      comp: point[2] + line[2],
      incomp: point[3] + line[3],
      icon: "https://EijiGorilla.github.io/Symbols/Sewage_Logo2.svg",
    },
    {
      category: uitlType[3], // Power
      comp: point[4] + line[4],
      incomp: point[5] + line[5],
      icon: "https://EijiGorilla.github.io/Symbols/Power_Logo2.svg",
    },
    {
      category: uitlType[4], // Oil & Gas
      comp: point[8] + line[8],
      incomp: point[9] + line[9],
      icon: "https://EijiGorilla.github.io/Symbols/Gas_Logo2.svg",
    },
  ];
  return data;
}

// Generate total number and progress numbers
export async function generateUtilPointProgress({ contractp, company }: any) {
  var total_utilpoint_number = new StatisticDefinition({
    onStatisticField: "Status",
    outStatisticFieldName: "total_utilpoint_number",
    statisticType: "count",
  });

  var total_utilpoint_comp = new StatisticDefinition({
    onStatisticField: "CASE WHEN Status = 1 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_utilpoint_comp",
    statisticType: "sum",
  });

  // Query
  var query = new Query();
  const qCP = "CP = '" + contractp + "'";
  const qCompany = "Company = '" + company + "'";
  const qCpCompany = qCP + " AND " + qCompany;
  const finalExpression = contractp && !company ? qCP : qCpCompany;
  query.where = finalExpression;
  query.outStatistics = [total_utilpoint_number, total_utilpoint_comp];

  return utilityPointLayer.queryFeatures(query).then((response: any) => {
    var stats = response.features[0].attributes;
    const comp = stats.total_utilpoint_comp;
    const total = stats.total_utilpoint_number;
    const progress = ((comp / total) * 100).toFixed(0);

    return [total, progress];
  });
}

export async function generateUtilLineProgress({ contractp, company }: any) {
  var total_utilline_number = new StatisticDefinition({
    onStatisticField: "Status",
    outStatisticFieldName: "total_utilline_number",
    statisticType: "count",
  });

  var total_utilline_comp = new StatisticDefinition({
    onStatisticField: "CASE WHEN Status = 1 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_utilline_comp",
    statisticType: "sum",
  });

  var query = new Query();
  const qCP = "CP = '" + contractp + "'";
  const qCompany = "Company = '" + company + "'";
  const qCpCompany = qCP + " AND " + qCompany;
  const finalExpression = contractp && !company ? qCP : qCpCompany;
  query.where = finalExpression;
  query.outStatistics = [total_utilline_number, total_utilline_comp];

  return utilityLineLayer.queryFeatures(query).then((response: any) => {
    var stats = response.features[0].attributes;
    const comp = stats.total_utilline_comp;
    const total = stats.total_utilline_number;
    const progress = ((comp / total) * 100).toFixed(0);

    return [total, progress];
  });
}

export async function generateTotalProgress({ contractp, company }: any) {
  var total_util_number = new StatisticDefinition({
    onStatisticField: "Status",
    outStatisticFieldName: "total_util_number",
    statisticType: "count",
  });

  var total_util_comp = new StatisticDefinition({
    onStatisticField: "CASE WHEN Status = 1 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_util_comp",
    statisticType: "sum",
  });

  var query = new Query();
  const qCP = "CP = '" + contractp + "'";
  const qCompany = "Company = '" + company + "'";
  const qCpCompany = qCP + " AND " + qCompany;
  const finalExpression = contractp && !company ? qCP : qCpCompany;

  if (contractp === undefined) {
    query.where = "1=1";
  } else {
    query.where = finalExpression;
  }
  query.outStatistics = [total_util_number, total_util_comp];

  const pointQuery = utilityPointLayer
    .queryFeatures(query)
    .then((response: any) => {
      var stats = response.features[0].attributes;
      const comp = stats.total_util_comp;
      const total = stats.total_util_number;

      return [total, comp];
    });

  const lineQuery = utilityLineLayer
    .queryFeatures(query)
    .then((response: any) => {
      var stats = response.features[0].attributes;
      const comp = stats.total_util_comp;
      const total = stats.total_util_number;

      return [total, comp];
    });

  const point = await pointQuery;
  const line = await lineQuery;

  const total = point[0] + line[0];
  const comp = point[1] + line[1];
  const progress = ((comp / total) * 100).toFixed(0);

  return [total, progress];
}

// Thousand separators function
export function thousands_separators(num: any) {
  if (num) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }
}

export function zoomToLayer(layer: any, view: any) {
  return layer.queryExtent().then((response: any) => {
    view
      ?.goTo(response.extent, {
        //response.extent
        speedFactor: 2,
      })
      .catch((error: any) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });
  });
}

export const defineActions = (event: any) => {
  const item = event.item;
  if (item.layer.type !== "group") {
    item.panel = {
      content: "legend",
      open: true,
    };
  }
  item.title === "Chainage" ||
  item.title === "Viaduct" ||
  item.title === "Pier No"
    ? (item.visible = false)
    : (item.visible = true);
};
