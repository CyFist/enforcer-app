import * as React from "react";
import Container from "@mui/material/Container";

import {Scatter} from 'react-chartjs-2';
import { Linear, Chart } from "chart.js";

Chart.register(Linear);

const data = {
  datasets: [{
    label: 'Enroute',
    data: [{
      x: 13.0,
      y: 21000
    }, {
      x: 13.0,
      y: 31300
    }, {
      x: 19.8,
      y: 43000
    }, {
      y: 45900,
      x: 24.0
    } , {
      y: 45900,
      x: 43.2
    } , {
      y: 37480,
      x: 43.2
    } , {
      y: 27000,
      x: 41.2
    } , {
      y: 21000,
      x: 41.2
    }],
    backgroundColor: 'rgba(255, 99, 132,0.2)',
    borderColor: 'rgba(255, 100, 132,0.2)',
  }, {
    label: 'Enroute (Military)',
    data: [{
      x: 13.0,
      y: 21000
    }, {
      x: 13.0,
      y: 31300
    }, {
      x: 19.8,
      y: 43000
    }, {
      y: 45900,
      x: 24.0
    } , {
      y: 47500,
      x: 24.5
    } , {
      y: 47500,
      x: 40.7
    } , {
      y: 45900,
      x: 43.2
    } , {
      y: 37480,
      x: 43.2
    } , {
      y: 27000,
      x: 41.2
    } , {
      y: 21000,
      x: 41.2
    }],
    backgroundColor: 'rgba(250, 200, 132,0.5)',
    borderColor: 'rgba(250, 200, 132,0.5)',
    pointStyle: 'star',
  },{
  label: 'Takeoff-Landing',
  data:[{
    y: 21000,
    x: 20
  }, {
    y: 31300,
    x: 20
  }, {
    y: 47600,
    x: 26.2
  } , {
    y: 47600,
    x: 38
  } , {
    y: 45900,
    x:40
  } , {
    y: 37480,
    x: 40
  } , {
    y: 31970,
    x: 38
  } , {
    y: 21000,
    x: 38
  }],
    backgroundColor: 'rgb(0,200,200)',
    borderColor: 'rgb(0,200,200)',
  }]
};

const LMOverview = (props) => {
  return (
    <Container>      <Scatter
          data={data}
          width={400}
          height={200}
          options={{
            maintainAspectRatio: false
          }}
        />
    </Container>
  );
};

export default LMOverview;
