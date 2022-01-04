const Highcharts = require('highcharts');
// import data from 'highcharts/modules/data.js'
// import exporting from 'highcharts/modules/exporting.js'
require('highcharts/modules/exporting.js')(Highcharts);
require('highcharts/modules/data.js')(Highcharts);
require('highcharts/modules/accessibility.js')(Highcharts);
// import pattern from 'highcharts/modules/pattern-fill.js'
// import more from 'highcharts/highcharts-more.js'

export const charts = {};

const chartOptions = {
  'viz-charts-column-22': {
    chart: {
      renderTo: 'viz-charts-column-22',
      type: 'column',
      styledMode: true,
      className: 'column categorical'
    },
    legend: {
      enabled: false
    },
    title: {
      text: undefined
    },
    subtitle: {
      text: undefined
    },
    xAxis: {
      categories: ['Apples', 'Oranges', 'Pears', 'Grapes'],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Rainfall (mm)'
      }
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      column: {
        borderWidth: 0,
        maxPointWidth: 32
      }
    },
    series: [{ colorByPoint: true, data: [12, 13, 4, 6] }]
  },
  'viz-charts-column-33': {
    chart: {
      renderTo: 'viz-charts-column-33',
      type: 'column',
      styledMode: true,
      className: 'column sequential-example'
    },
    legend: {
      enabled: false
    },
    title: {
      text: undefined
    },
    subtitle: {
      text: undefined
    },
    xAxis: {
      categories: ['January', 'February', 'March'],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Rainfall (mm)'
      }
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      column: {
        borderWidth: 0,
        maxPointWidth: 32
      }
    },
    series: [{ colorByPoint: true, data: [143000, 230530, 603000] }]
  },

  'viz-charts-spline-1': {
    chart: {
      renderTo: 'viz-charts-spline-1',
      type: 'spline',
      spacing: [0, 0, 0, 0],
      className: 'spline nodots color-0',
      styledMode: true,
      events: {
        redraw: function () {
          this.reflow();
        }
      }
    },
    title: {
      text: undefined
    },
    legend: {
      enabled: false
    },
    subtitle: {
      text: undefined
    },
    xAxis: {
      reversed: false,
      title: {
        enabled: true,
        text: 'Altitude'
      },
      labels: {
        format: '{value} km'
      },
      accessibility: {
        rangeDescription: 'Range: 0 to 80 km.'
      },
      maxPadding: 0.05,
      showLastLabel: true
    },
    yAxis: {
      showLastLabel: false,
      title: {
        text: 'Temperature'
      },
      labels: {
        format: '{value}°',
        style: {
          color: '#6e625e',
          fontSize: '14px'
        }
      },
      accessibility: {
        rangeDescription: 'Range: -90°C to 20°C.'
      },
      lineWidth: 2
    },
    tooltip: { useHTML: true, borderRadius: 0 },
    plotOptions: {
      series: {
        enableMouseTracking: false
      },
      spline: {
        marker: {
          enabled: false
        }
      }
    },
    series: [
      {
        name: 'Hestavollane',
        data: [
          3.7,
          3.3,
          3.9,
          5.1,
          3.5,
          3.8,
          4.0,
          5.0,
          6.1,
          3.7,
          3.3,
          6.4,
          6.9,
          6.0,
          6.8,
          4.4,
          4.0,
          3.8,
          5.0,
          4.9,
          9.2,
          9.6,
          9.5,
          6.3,
          10.5,
          11.1,
          10.4,
          10.7,
          11.3,
          10.2,
          9.6,
          10.2,
          11.1,
          10.8,
          13.0,
          12.5,
          12.5,
          11.3,
          10.1
        ]
      },
      {
        name: 'Vik',
        data: [
          0.2,
          0.1,
          0.1,
          0.1,
          0.3,
          0.2,
          0.3,
          0.1,
          0.7,
          0.3,
          0.2,
          0.2,
          0.9,
          0.3,
          0.7,
          1.1,
          1.8,
          1.2,
          1.4,
          1.2,
          0.9,
          0.8,
          0.9,
          0.2,
          0.4,
          1.2,
          0.3,
          2.3,
          1.0,
          0.7,
          1.0,
          0.8,
          2.0,
          1.2,
          1.4,
          3.7,
          2.1,
          2.0,
          1.5
        ]
      }
    ]
  },

  'viz-charts-spline-3': {
    chart: {
      renderTo: 'viz-charts-spline-3',
      type: 'spline',
      spacing: [0, 0, 0, 0],
      className: 'spline nodots color-1',
      styledMode: true,
      events: {
        redraw: function () {
          this.reflow();
        }
      }
    },
    title: {
      text: undefined
    },
    legend: {
      enabled: false
    },
    subtitle: {
      text: undefined
    },
    xAxis: {
      reversed: false,
      title: {
        enabled: true,
        text: 'Altitude'
      },
      labels: {
        format: '{value} km'
      },
      accessibility: {
        rangeDescription: 'Range: 0 to 80 km.'
      },
      maxPadding: 0.05,
      showLastLabel: true
    },
    yAxis: {
      showLastLabel: false,
      title: {
        text: 'Temperature'
      },
      labels: {
        format: '{value}°',
        style: {
          color: '#6e625e',
          fontSize: '14px'
        }
      },
      accessibility: {
        rangeDescription: 'Range: -90°C to 20°C.'
      },
      lineWidth: 2
    },
    tooltip: { useHTML: true, borderRadius: 0 },
    plotOptions: {
      series: {
        enableMouseTracking: false
      },
      spline: {
        marker: {
          enabled: false
        }
      }
    },
    series: [
      {
        name: 'Hestavollane',
        data: [
          3.7,
          3.3,
          3.9,
          5.1,
          3.5,
          3.8,
          4.0,
          5.0,
          6.1,
          3.7,
          3.3,
          6.4,
          6.9,
          6.0,
          6.8,
          4.4,
          4.0,
          3.8,
          5.0,
          4.9,
          9.2,
          9.6,
          9.5,
          6.3,
          10.5,
          11.1,
          10.4,
          10.7,
          11.3,
          10.2,
          9.6,
          10.2,
          11.1,
          10.8,
          13.0,
          12.5,
          12.5,
          11.3,
          10.1
        ]
      },
      {
        name: 'Vik',
        data: [
          0.2,
          0.1,
          0.1,
          0.1,
          0.3,
          0.2,
          0.3,
          0.1,
          0.7,
          0.3,
          0.2,
          0.2,
          0.9,
          0.3,
          0.7,
          1.1,
          1.8,
          1.2,
          1.4,
          1.2,
          0.9,
          0.8,
          0.9,
          0.2,
          0.4,
          1.2,
          0.3,
          2.3,
          1.0,
          0.7,
          1.0,
          0.8,
          2.0,
          1.2,
          1.4,
          3.7,
          2.1,
          2.0,
          1.5
        ]
      }
    ]
  },

  'viz-charts-spline-5': {
    chart: {
      renderTo: 'viz-charts-spline-5',
      type: 'spline',
      spacing: [0, 0, 0, 0],
      className: 'spline nodots color-2',
      styledMode: true,
      events: {
        redraw: function () {
          this.reflow();
        }
      }
    },
    title: {
      text: undefined
    },
    legend: {
      enabled: false
    },
    subtitle: {
      text: undefined
    },
    xAxis: {
      reversed: false,
      title: {
        enabled: true,
        text: 'Altitude'
      },
      labels: {
        format: '{value} km'
      },
      accessibility: {
        rangeDescription: 'Range: 0 to 80 km.'
      },
      maxPadding: 0.05,
      showLastLabel: true
    },
    yAxis: {
      showLastLabel: false,
      title: {
        text: 'Temperature'
      },
      labels: {
        format: '{value}°',
        style: {
          color: '#6e625e',
          fontSize: '14px'
        }
      },
      accessibility: {
        rangeDescription: 'Range: -90°C to 20°C.'
      },
      lineWidth: 2
    },
    tooltip: { useHTML: true, borderRadius: 0 },
    plotOptions: {
      series: {
        enableMouseTracking: false
      },
      spline: {
        marker: {
          enabled: false
        }
      }
    },
    series: [
      {
        name: 'Hestavollane',
        data: [
          3.7,
          3.3,
          3.9,
          5.1,
          3.5,
          3.8,
          4.0,
          5.0,
          6.1,
          3.7,
          3.3,
          6.4,
          6.9,
          6.0,
          6.8,
          4.4,
          4.0,
          3.8,
          5.0,
          4.9,
          9.2,
          9.6,
          9.5,
          6.3,
          10.5,
          11.1,
          10.4,
          10.7,
          11.3,
          10.2,
          9.6,
          10.2,
          11.1,
          10.8,
          13.0,
          12.5,
          12.5,
          11.3,
          10.1
        ]
      },
      {
        name: 'Vik',
        data: [
          0.2,
          0.1,
          0.1,
          0.1,
          0.3,
          0.2,
          0.3,
          0.1,
          0.7,
          0.3,
          0.2,
          0.2,
          0.9,
          0.3,
          0.7,
          1.1,
          1.8,
          1.2,
          1.4,
          1.2,
          0.9,
          0.8,
          0.9,
          0.2,
          0.4,
          1.2,
          0.3,
          2.3,
          1.0,
          0.7,
          1.0,
          0.8,
          2.0,
          1.2,
          1.4,
          3.7,
          2.1,
          2.0,
          1.5
        ]
      }
    ]
  },

  'viz-charts-spline-4': {
    chart: {
      renderTo: 'viz-charts-spline-4',
      type: 'spline',
      inverted: true,
      spacing: [0, 0, 0, 0],
      className: ' spline nodots',
      styledMode: true
    },
    title: {
      text: undefined
    },
    legend: {
      enabled: false
    },
    subtitle: {
      text: undefined
    },
    xAxis: {
      reversed: false,
      title: {
        enabled: true,
        text: 'Altitude'
      },
      labels: {
        format: '{value} km'
      },
      accessibility: {
        rangeDescription: 'Range: 0 to 80 km.'
      },
      maxPadding: 0.05,
      showLastLabel: true
    },
    yAxis: {
      showLastLabel: false,
      title: {
        text: 'Temperature'
      },
      labels: {
        format: '{value}°',
        style: {
          color: '#6e625e',
          fontSize: '14px'
        }
      },
      accessibility: {
        rangeDescription: 'Range: -90°C to 20°C.'
      },
      lineWidth: 2
    },
    tooltip: { enabled: false },
    plotOptions: {
      spline: {
        marker: {
          enabled: false
        }
      }
    },
    series: [
      {
        name: 'Temperature 1',
        data: [
          [0, 15],
          [10, -50],
          [20, -56.5],
          [30, -46.5],
          [40, -22.1],
          [50, -2.5],
          [60, -27.7],
          [70, -55.7],
          [80, -76.5]
        ]
      },
      {
        name: 'Temperature 2',
        data: [
          [0, 25],
          [10, -20],
          [20, -26.5],
          [30, -16.5],
          [40, -12.1],
          [50, 2.5],
          [60, -17.7],
          [70, -45.7],
          [80, -56.5]
        ]
      }
    ]
  },

  'viz-charts-spline-2': {
    chart: {
      renderTo: 'viz-charts-spline-2',
      type: 'spline',
      spacing: [0, 0, 0, 0],
      className: ' spline',
      styledMode: true
    },
    title: {
      text: undefined
    },
    legend: {
      enabled: false
    },
    subtitle: {
      text: undefined
    },
    xAxis: {
      reversed: false,
      title: {
        enabled: true,
        text: 'Altitude'
      },
      labels: {
        format: '{value} km'
      },
      accessibility: {
        rangeDescription: 'Range: 0 to 80 km.'
      },
      maxPadding: 0.05,
      showLastLabel: true
    },
    yAxis: {
      showLastLabel: false,
      title: {
        text: 'Temperature'
      },
      labels: {
        format: '{value}°',
        style: {
          color: '#6e625e',
          fontSize: '14px'
        }
      },
      accessibility: {
        rangeDescription: 'Range: -90°C to 20°C.'
      },
      lineWidth: 2
    },
    tooltip: { useHTML: true, borderRadius: 0 },
    plotOptions: {
      series: {
        enableMouseTracking: false
      },
      spline: {
        marker: {
          enable: false
        }
      }
    },
    series: [
      {
        name: 'Hestavollane',
        data: [
          3.7,
          3.3,
          3.9,
          5.1,
          3.5,
          3.8,
          4.0,
          5.0,
          6.1,
          3.7,
          3.3,
          6.4,
          6.9,
          6.0,
          6.8,
          4.4,
          4.0,
          3.8,
          5.0,
          4.9,
          9.2,
          9.6,
          9.5,
          6.3,
          10.5,
          11.1,
          10.4,
          10.7,
          11.3,
          10.2,
          9.6,
          10.2,
          11.1,
          10.8,
          13.0,
          12.5,
          12.5,
          11.3,
          10.1
        ]
      },
      {
        name: 'Vik',
        data: [
          0.2,
          0.1,
          0.1,
          0.1,
          0.3,
          0.2,
          0.3,
          0.1,
          0.7,
          0.3,
          0.2,
          0.2,
          0.9,
          0.3,
          0.7,
          1.1,
          1.8,
          1.2,
          1.4,
          1.2,
          0.9,
          0.8,
          0.9,
          0.2,
          0.4,
          1.2,
          0.3,
          2.3,
          1.0,
          0.7,
          1.0,
          0.8,
          2.0,
          1.2,
          1.4,
          3.7,
          2.1,
          2.0,
          1.5
        ]
      }
    ]
  },

  'viz-charts-bar-1': {
    chart: {
      renderTo: 'viz-charts-bar-1',
      type: 'bar',
      styledMode: true,
      className: 'bar',
      height: '320px'
    },
    legend: {
      enabled: false
    },
    title: {
      text: undefined
    },
    subtitle: {
      text: undefined
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Rainfall (mm)'
      }
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      series: {
        stacking: 'normal',
        states: {
          hover: {
            color: '#f1ece8'
          }
        }
      },
      bar: {
        borderWidth: 0,
        pointWidth: 32
      }
    },
    series: [
      {
        name: 'Tokyo',
        data: [49.9, 71.5, 106.4, 129.2]
      }
    ]
  },

  'viz-charts-bar-2': {
    chart: {
      renderTo: 'viz-charts-bar-2',
      type: 'bar',
      styledMode: true,
      className: 'bar compare',
      spacing: [0, 0, 0, 0],
      margin: [0, 0, 0, 0],
      height: '172px'
    },
    legend: {
      enabled: false
    },
    title: {
      text: '3.2x',
      useHTML: true,
      x: 170,
      y: 120
    },
    subtitle: {
      text: undefined
    },
    xAxis: {
      labels: {
        enabled: false
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: undefined
      },
      labels: {
        enabled: false
      }
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      series: {
        enableMouseTracking: false,
        dataLabels: {
          enabled: false
        }
      },
      bar: {
        borderWidth: 0,
        maxPointWidth: 64,
        pointPadding: 0.2,
        minPointLength: 32,
        groupPadding: 0,
        dataLabels: {
          useHTML: true,
          align: 'left',
          enabled: true,
          inside: true,
          y: 42,
          formatter() {
            return this.series.name;
          }
        }
      }
    },
    series: [
      {
        name: 'If P&C Insurance Ltd',
        data: [90],
        color: '#0054f0',
        dataLabels: {
          style: {
            color: '#6e625e'
          }
        }
      },
      {
        name: 'Competitors',
        data: [30],
        color: '#F1ECE8',
        dataLabels: {
          style: {
            color: '#6e625e'
          },
          y: 52
        }
      }
    ]
  },

  'viz-charts-bar-3': {
    chart: {
      renderTo: 'viz-charts-bar-3',
      type: 'bar',
      styledMode: true,
      className: 'bar color-0'
    },
    legend: {
      enabled: false
    },
    title: {
      text: undefined
    },
    subtitle: {
      text: undefined
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Rainfall (mm)'
      }
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      series: {
        stacking: 'normal',
        states: {
          hover: {
            color: '#f1ece8'
          }
        }
      },
      column: {
        borderWidth: 0,
        maxPointWidth: 32
      }
    },
    series: [
      {
        name: 'Tokyo',
        data: [49.9, 71.5, 106.4, 129.2, 144.0]
      }
    ]
  },

  'viz-charts-bar-4': {
    chart: {
      renderTo: 'viz-charts-bar-4',
      type: 'bar',
      styledMode: true,
      className: 'bar color-1'
    },
    legend: {
      enabled: false
    },
    title: {
      text: undefined
    },
    subtitle: {
      text: undefined
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Rainfall (mm)'
      }
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      series: {
        stacking: 'normal',
        states: {
          hover: {
            color: '#f1ece8'
          }
        }
      },
      column: {
        borderWidth: 0,
        maxPointWidth: 32
      }
    },
    series: [
      {
        name: 'Tokyo',
        data: [49.9, 71.5, 106.4, 129.2, 144.0]
      }
    ]
  },

  'viz-charts-column-11': {
    chart: {
      renderTo: 'viz-charts-column-11',
      type: 'column',
      styledMode: true,
      className: 'column sequential'
    },
    legend: {
      enabled: false
    },
    title: {
      text: undefined
    },
    subtitle: {
      text: undefined
    },
    xAxis: {
      categories: ['0-2', '3-5', '6-12', '13-15', '16-18', '18-25', '26-50']
    },
    yAxis: {
      min: 0,
      title: {
        text: undefined
      }
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      column: {
        borderWidth: 0,
        groupPadding: 0,
        maxPointWidth: 64
      }
    },
    series: [
      {
        data: [
          ['0-2', 47],
          ['3-5', 36],
          ['6-12', 35],
          ['13-15', 24],
          ['16-18', 13],
          ['18-25', 62],
          ['26-50', 71]
        ]
      }
    ]
  },

  'viz-charts-bar-2': {
    chart: {
      renderTo: 'viz-charts-bar-2',
      type: 'bar',
      styledMode: true,
      className: 'bar compare',
      spacing: [0, 0, 0, 0],
      margin: [0, 0, 0, 0],
      height: '172px'
    },
    legend: {
      enabled: false
    },
    title: {
      text: '3.2x',
      useHTML: true,
      x: 170,
      y: 120
    },
    subtitle: {
      text: undefined
    },
    xAxis: {
      labels: {
        enabled: false
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: undefined
      },
      labels: {
        enabled: false
      }
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      series: {
        enableMouseTracking: false,
        dataLabels: {
          enabled: false
        }
      },
      bar: {
        borderWidth: 0,
        maxPointWidth: 64,
        pointPadding: 0.2,
        minPointLength: 32,
        groupPadding: 0,
        dataLabels: {
          useHTML: true,
          align: 'left',
          enabled: true,
          inside: true,
          y: 42,
          formatter() {
            return this.series.name;
          }
        }
      }
    },
    series: [
      {
        name: 'If P&C Insurance Ltd',
        data: [90],
        color: '#0054f0',
        dataLabels: {
          style: {
            color: '#6e625e'
          }
        }
      },
      {
        name: 'Competitors',
        data: [30],
        color: '#F1ECE8',
        dataLabels: {
          style: {
            color: '#6e625e'
          },
          y: 52
        }
      }
    ]
  },

  'viz-charts-column-1': {
    chart: {
      renderTo: 'viz-charts-column-1',
      type: 'column',
      styledMode: true,
      className: 'column'
    },
    legend: {
      enabled: false
    },
    title: {
      text: undefined
    },
    subtitle: {
      text: undefined
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Rainfall (mm)'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
      enabled: false
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      },
      column: {
        borderWidth: 0,
        maxPointWidth: 32
      }
    },
    series: [
      {
        name: 'Tokyo',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
      }
    ]
  },

  'viz-charts-column-22': {
    chart: {
      renderTo: 'viz-charts-column-22',
      type: 'column',
      styledMode: true,
      className: 'column categorical'
    },
    legend: {
      enabled: false
    },
    title: {
      text: undefined
    },
    subtitle: {
      text: undefined
    },
    xAxis: {
      categories: ['Apples', 'Oranges', 'Pears', 'Grapes'],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Rainfall (mm)'
      }
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      column: {
        borderWidth: 0,
        maxPointWidth: 32
      }
    },
    series: [{ colorByPoint: true, data: [12, 13, 4, 6] }]
  },

  'viz-charts-column-33': {
    chart: {
      renderTo: 'viz-charts-column-33',
      type: 'column',
      styledMode: true,
      className: 'column sequential-example'
    },
    legend: {
      enabled: false
    },
    title: {
      text: undefined
    },
    subtitle: {
      text: undefined
    },
    xAxis: {
      categories: ['January', 'February', 'March'],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Rainfall (mm)'
      }
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      column: {
        borderWidth: 0,
        maxPointWidth: 32
      }
    },
    series: [{ colorByPoint: true, data: [143000, 230530, 603000] }]
  },

  'viz-charts-stacked-column-1': {
    chart: {
      renderTo: 'viz-charts-stacked-column-1',
      type: 'column',
      styledMode: true,
      className: 'column column-stacked color-0'
    },
    legend: {
      enabled: false
    },
    title: {
      text: undefined
    },
    subtitle: {
      text: undefined
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: undefined
      }
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      },
      column: {
        borderWidth: 0,
        maxPointWidth: 32
      }
    },
    series: [
      {
        name: 'John',
        data: [5, 3, 4, 7, 2]
      },
      {
        name: 'Jane',
        data: [2, 2, 3, 2, 1]
      },
      {
        name: 'Joe',
        data: [3, 4, 4, 2, 5]
      }
    ]
  },

  'viz-charts-pie-11': {
    chart: {
      renderTo: 'viz-charts-pie-11',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      styledMode: true,
      className: 'pie highlight'
    },
    title: {
      text: undefined
    },
    tooltip: {
      enabled: false
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [
      {
        name: 'Brands',
        colorByPoint: true,
        data: [
          {
            name: 'If P&C Insurance Ltd',
            y: 25,
            selected: true,
            sliced: true
          },
          {
            name: 'Competitors',
            y: 75
          }
        ]
      }
    ]
  },
  'viz-charts-pie-1': {
    chart: {
      renderTo: 'viz-charts-pie-1',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      styledMode: true,
      className: 'pie'
    },
    title: {
      text: undefined
    },
    tooltip: {
      enabled: false
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [
      {
        name: 'Brands',
        colorByPoint: true,
        data: [
          {
            name: 'Chrome',
            y: 75.21
          },
          {
            name: 'Safari',
            y: 10.91
          },
          {
            name: 'Firefox',
            y: 2.52
          },
          {
            name: 'Edge',
            y: 2.02
          },
          {
            name: 'Internet Explorer',
            y: 1.3
          },
          {
            name: 'Opera',
            y: 0.35
          },
          {
            name: 'Other',
            y: 7.69
          }
        ]
      }
    ]
  },

  'viz-charts-pie-22': {
    chart: {
      renderTo: 'viz-charts-pie-22',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      height: '320px',
      type: 'pie',
      styledMode: true,
      className: 'pie color-0'
    },
    title: {
      text: undefined
    },
    tooltip: {
      enabled: false
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: false,
        dataLabels: {
          enabled: false,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [
      {
        name: 'Brands',
        colorByPoint: true,
        data: [
          {
            name: 'Chrome',
            y: 61.41,
            color: {
              patternIndex: 9
            }
          },
          {
            name: 'Internet Explorer',
            y: 11.84
          },
          {
            name: 'Firefox',
            y: 10.85
          },
          {
            name: 'Edge',
            y: 4.67
          },
          {
            name: 'Safari',
            y: 4.18
          },
          {
            name: 'Sogou Explorer',
            y: 1.64
          },
          {
            name: 'Opera',
            y: 1.6
          },
          {
            name: 'QQ',
            y: 1.2
          },
          {
            name: 'Other',
            y: 2.61
          }
        ]
      }
    ]
  },

  'viz-charts-doughnut-1': {
    chart: {
      renderTo: 'viz-charts-doughnut-1',
      spacing: [0, 0, 0, 0],
      margin: [0, 0, 0, 0],
      styledMode: 'true',
      className: 'doughnut',
      type: 'pie'
    },
    legend: {
      enabled: false
    },
    title: {
      text: undefined
    },
    yAxis: {
      title: {
        text: undefined
      }
    },
    plotOptions: {
      pie: {
        shadow: false
      }
    },
    tooltip: {
      enabled: false
    },
    series: [
      {
        name: 'Browsers',
        data: [
          ['Firefox', 6],
          ['MSIE', 4],
          ['Chrome', 7]
        ],

        innerSize: '70%',
        showInLegend: true,
        dataLabels: {
          enabled: false
        }
      }
    ]
  },

  'viz-charts-doughnut-2': {
    chart: {
      renderTo: 'viz-charts-doughnut-2',
      spacing: [0, 0, 0, 0],
      margin: [0, 0, 0, 0],
      styledMode: 'true',
      className: 'doughnut highlight',
      type: 'pie',
      events: {
        load: function () {
          const legend = document.querySelector('#viz-charts-doughnut-2-legend');
          legend.innerHTML = '';
          this.series[0].data.forEach(function (data, j) {
            legend.insertAdjacentHTML(
              'beforeend',
              '<div class="if item pie highlight"><div class="if symbol highcharts-color-' +
                j +
                '"></div><div class="if set" id=""><div class="if value">' +
                data.percentage +
                '%</div><div class="if name">' +
                data.name +
                '</div></div></div>'
            );
          });
        }
      }
    },
    title: {
      text: undefined
    },
    yAxis: {
      title: {
        text: undefined
      }
    },
    plotOptions: {
      series: {
        enableMouseTracking: false
      },
      pie: {
        shadow: false,
        dataLabels: {
          enabled: true,
          useHTML: true,
          distance: '-150',
          y: -17,
          x: 10,
          format: '{y}%',
          filter: {
            property: 'name',
            operator: '===',
            value: 'If P&C Insurance Ltd'
          }
        }
      }
    },
    legend: { enabled: false },
    tooltip: {
      enabled: false
    },
    series: [
      {
        name: 'Browsers',
        data: [
          ['If P&C Insurance Ltd', 33],
          ['Competitors', 67]
        ],

        innerSize: '70%'
      }
    ]
  },

  'viz-charts-accessibility-1': {
    data: {
      table: 'datatable'
    },
    chart: {
      renderTo: 'viz-charts-accessibility-1',
      styledMode: true,
      type: 'column',
      className: 'column datatable'
    },
    legend: { enabled: false },
    title: {
      text: undefined
    },
    yAxis: {
      allowDecimals: false,
      title: {
        text: undefined
      }
    },
    tooltip: {
      enabled: false
    }
  },

  'viz-anatomy-chart-1': {
    chart: {
      renderTo: 'viz-anatomy-chart-1',
      type: 'column',
      styledMode: true,
      className: 'column viz-anatomy-chart-1'
    },
    title: {
      text: 'Title',
      align: 'left',
      margin: 32
    },
    subtitle: {
      text: 'Subtitle',
      align: 'left',
      margin: 48
    },
    legend: {
      enabled: false
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      crosshair: false
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Rainfall (mm)'
      }
    },
    tooltip: {
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
        pointWidth: 16
      }
    },
    series: [
      {
        name: 'Tokyo',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
      },
      {
        name: 'New York',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
      },
      {
        name: 'London',
        data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
      },
      {
        name: 'Berlin',
        data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
      }
    ]
  }
};

const initChart = id => {
  charts[id] = new Highcharts.Chart(chartOptions[id]);
};

export default initChart;
