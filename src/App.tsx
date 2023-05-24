import React, { useEffect, useState } from "react";

// import { Chart } from "react-google-charts";

// import { central, north, northeast, south } from "./region/sector";
import { Button, Box } from "@mui/material";
import {
  central,
  north,
  eastern,
  northeast,
  south,
  region,
} from "./region/sector";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import { styled } from "@mui/material/styles";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// const chartTitle = ["Provinces", "sampledata"];

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import mapDataIE from "@highcharts/map-collection/countries/th/th-all.geo.json";
highchartsMap(Highcharts);
// const ToolsBox = styled(Box)(({ theme }) => ({
//   position: "absolute",
//   left: "50%",
//   bottom: 0,
//   transform: "translateX(-50%)",
//   zIndex: 1,
//   borderRadius: 100,
//   padding: "6px 16px",
//   [theme.breakpoints.down("lg")]: {
//     padding: "4px 10px",
//   },
// }));

// const Tools = styled(Button)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   minWidth: "unset",
//   width: 30,
//   height: 30,
//   borderRadius: 100,
//   svg: {
//     fontSize: 18,
//   },
//   "&.btn-reset-position": {
//     minWidth: 56,
//     width: "auto",
//     position: "absolute",
//     top: "0.5rem",
//     right: "0.5rem",
//     zIndex: 2,
//     textTransform: "capitalize",
//   },
//   [theme.breakpoints.down("lg")]: {
//     width: 24,
//     height: 24,
//   },
// }));

// export const PreviewImage = styled(Box)(({ theme }) => ({
//   height: "100%",
//   overflow: "hidden",
//   width : 'auto'
// }));

// export const options = {
//   region: "TH",
//   defaultColor: "#f5f5f5",
//   resolution: "provinces",
//   explorer: {
//     maxZoomOut: 2,
//     keepInBounds: true,
//   },
// };

export default function App() {
  // const mocking = () => (Math.random() * 1000).toFixed(0);

  // const chartData = (region: any) =>
  //   region.map((item: any) => [item, +mocking()]);
  const [state, setState] = useState<any>(region);
  useEffect(() => {
    setState(region);
    console.log(region)
  }, [region]);
  const handleClick = (data: any) => {
    switch (data) {
      case "central": {
        const result = central;
        return setState(result);
      }

      case "eastern": {
        const result = eastern;
        return setState(result);
      }

      case "north": {
        const result = north;
        return setState(result);
      }

      case "northeast": {
        const result = northeast;
        return setState(result);
      }

      case "south": {
        const result = south;
        return setState(result);
      }

      case "all":
      default: {
        const result = region;
        return setState(result);
      }
    }
  };

  const mapOptions = {
    chart: {
      map: mapDataIE,
      animation: false
    },
    title: {
      text: "Map Demo",
    },
    credits: {
      enabled: false,
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: "bottom",
      },
    },
    resetZoomButton: {
      enabled: true,
      buttonOptions: {
        verticalAlign: "bottom",
      },
    },
    colorAxis: {
      min: 0,
    },
    series: [
      {
        data: state,
        name: "Random data",
        states: {
          hover: {
            color: "#D9F3F4",
          },
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}",
        },
        cursor: "pointer",
        events: {
          click: function (e: any) {
            e.point.zoomTo();
          },
        },
      },
    ],
  };

  return (
    <>
      <Button variant="contained" onClick={() => handleClick("all")}>
        All
      </Button>
      <Button variant="contained" onClick={() => handleClick("central")}>
        Central
      </Button>
      <Button variant="contained" onClick={() => handleClick("eastern")}>
        Eastern
      </Button>
      <Button variant="contained" onClick={() => handleClick("north")}>
        North
      </Button>
      <Button variant="contained" onClick={() => handleClick("northeast")}>
        Northeast
      </Button>
      <Button variant="contained" onClick={() => handleClick("south")}>
        South
      </Button>
      {/* <PreviewImage
         className="d-flex flex-column pt-2">
        <Map data={state}></Map>
       </PreviewImage> */}
      <HighchartsReact
        containerProps={{ style: { height: "1000px" } }}
        constructorType={"mapChart"}
        highcharts={Highcharts}
        options={mapOptions}
      />
    </>
  );
}

// function Map(data: any) {
//   const options = {
//     region: "TH",
//     resolution: "provinces",
//     defaultColor: "#f5f5f5",
//   };

//   return (
//     // <Box className="position-relative h-100 overflow-hidden">
//     //   <TransformWrapper
//     //     centerOnInit
//     //   >
//     //     {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
//     //       <React.Fragment>
//     //         <Tools
//     //           onClick={() => resetTransform()}
//     //           className="btn-reset-position"
//     //         >
//     //           Reset
//     //         </Tools>
//     //         <ToolsBox className="d-flex align-items-center justify-content-center mb-2">
//     //           <Tools onClick={() => zoomOut()} className="mr-1 mr-xl-2">
//     //             <FontAwesomeIcon icon="plus" /> ZoomOut
//     //           </Tools>
//     //           <Tools onClick={() => zoomIn()} className="ml-1 ml-xl-2">
//     //             <FontAwesomeIcon icon="minus" /> ZoomIn
//     //           </Tools>
//     //         </ToolsBox>
//     //         <TransformComponent>

//     //         </TransformComponent>
//     //       </React.Fragment>
//     //     )}
//     //   </TransformWrapper>
//     // </Box>
//     <Chart
//                 chartEvents={[
//                   {
//                     eventName: "select",
//                     callback: ({ chartWrapper }) => {
//                       const chart = chartWrapper.getChart();
//                       const selection = chart.getSelection();
//                       if (selection.length === 0) return;
//                       console.log("Selected : " + JSON.stringify(selection));
//                       const region = data.data[selection[0].row + 1];
//                       console.log("Selected : " + region);
//                     },
//                   },
//                 ]}
//                 chartType="GeoChart"
//                 width="100%"
//                 height="1000px"
//                 data={data.data}
//                 options={options}
//               />
//   );
// }
