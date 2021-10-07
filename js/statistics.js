//getting days in current month
let dt = new Date();
let currentMonth = dt.getMonth() + 1;
let year = dt.getFullYear();
let daysInMonth = new Date(year, currentMonth, 0).getDate();

const range = (min, max) => [...Array(max - min + 1).keys()].map((i) => i + min + "");

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const nth = function (d) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

//Labels for charts
const labels_1 = ["08am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm", "10pm", "12am", "2am"];
const labels_2 = range(1, daysInMonth);
const labels_3 = ["08am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm", "10pm", "12am", "2am"];
const labels_4 = range(1, daysInMonth);

//Data for charts
//data_1
const data_1 = {
  labels: labels_1,
  datasets: [
    {
      backgroundColor: "#29d9c7",
      borderColor: "#29d9c7",
      data: [4, 6, 4, 13, 5, 9, 12, 4, 11, 2],
      lineTension: 0.5,
      pointBorderColor: "#29d9c7",
      pointBackgroundColor: "white",
      pointBorderWidth: 2,
      pointHoverBackgroundColor: "white",
      pointHoverRadius: 5,
    },
  ],
};
//data_2
const data_2 = {
  labels: labels_2,
  datasets: [
    {
      backgroundColor: "#29d9c7",
      borderColor: "#29d9c7",
      data: [, 4, 5, 6, 6, 8, 5, 4, 7, 10, 13, 12, 4, 5, 6, 6, 8, 5, 4, 7, 10, 13, 12, 3, 5, 10, 10, 13, 12, 5, ,],
      lineTension: 0.5,
      pointBorderColor: "#29d9c7",
      pointBackgroundColor: "white",
      pointBorderWidth: 2,
      pointHoverBackgroundColor: "white",
      pointHoverRadius: 5,
    },
  ],
};

//data_3
const data_3 = {
  labels: labels_3,
  datasets: [
    {
      backgroundColor: "#29d9c7",
      borderColor: "#29d9c7",
      data: [4, 6, 4, 13, 5, 9, 12, 4, 11, 2],
      lineTension: 0.5,
      pointBorderColor: "#29d9c7",
      pointBackgroundColor: "white",
      pointBorderWidth: 2,
      pointHoverBackgroundColor: "white",
      pointHoverRadius: 5,
    },
  ],
};
//date_4
const data_4 = {
  labels: labels_4,
  datasets: [
    {
      backgroundColor: "#29d9c7",
      borderColor: "#29d9c7",
      data: [, 4, 5, 6, 6, 8, 5, 4, 7, 10, 13, 12, 4, 5, 6, 6, 8, 5, 4, 7, 10, 13, 12, 3, 5, 10, 10, 13, 12, 5, ,],
      lineTension: 0.5,
      pointBorderColor: "#29d9c7",
      pointBackgroundColor: "white",
      pointBorderWidth: 2,
      pointHoverBackgroundColor: "white",
      pointHoverRadius: 5,
    },
  ],
};

//External tooltip for charts
const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector("div");
  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.style.transform = "translate(-50%, calc(-100% + -25px)";
    tooltipEl.classList.add("arrow_box");
    const tooltipElement = document.createElement("div");
    tooltipElement.classList.add("tooltip__wrapper");
    tooltipEl.appendChild(tooltipElement);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }
  return tooltipEl;
};

const externalTooltipHandler = (context) => {
  // Tooltip Element
  const { chart, tooltip } = context;

  const tooltipEl = getOrCreateTooltip(chart);
  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.body.map((b) => b.lines);
    const bodyLines = tooltip.title || [];
    const tooltipHeader = document.createElement("div");
    const tooltipFooter = document.createElement("div");

    bodyLines.forEach((title) => {
      const footerText = document.createElement("p");
      if (tooltip.beforeBody.length) {
        footerText.textContent = title + tooltip.beforeBody[0] + " " + MONTHS[currentMonth];
      } else footerText.textContent = title;
      footerText.classList.add("tooltip__text");
      const bodyText = document.createElement("p");
      bodyText.classList.add("tooltip__text");
      bodyText.textContent = tooltip.afterBody;
      tooltipFooter.appendChild(bodyText);
      tooltipFooter.appendChild(footerText);
    });

    titleLines.forEach((body, i) => {
      const title = document.createElement("h2");
      title.textContent = body[0];
      title.classList.add("tooltip__title");
      tooltipHeader.appendChild(title);
    });

    const tooltipRoot = tooltipEl.querySelector("div");

    // Remove old children
    while (tooltipRoot.firstChild) {
      tooltipRoot.firstChild.remove();
    }

    // Add new children
    tooltipRoot.appendChild(tooltipHeader);
    tooltipRoot.appendChild(tooltipFooter);
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + "px";
  tooltipEl.style.top = positionY + tooltip.caretY + "px";
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = tooltip.options.padding + "px " + tooltip.options.padding + "px";
};

//Config_1
const config_1 = {
  type: "line",
  data: data_1,
  options: {
    interaction: {
      mode: "index",
      intersect: false,
    },

    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        offset: true,
        grid: {
          display: false,
        },

        ticks: {
          color: "#8598ad",
        },
      },
      y: {
        grid: {
          borderColor: "transparent",
        },
        min: 0,
        max: 15,
        ticks: {
          stepSize: 5,
          color: "#666666",
          textStrokeWidth: 1,
          textStrokeColor: "#666666",
        },
      },
    },
    elements: {
      line: {
        tension: 0.5,
      },
      point: {
        pointStyle: "circle",
        radius: 0,
        hoverRadius: 16,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "nearest",
        date: "it is true",
        intersect: false,
        enabled: false,
        position: "nearest",
        external: externalTooltipHandler,
        callbacks: {
          afterBody: function () {
            return "Calls received at";
          },
        },
      },
      hover: {
        mode: "nearest",
        intersect: false,
      },
    },
  },
  legend: {
    labels: {
      usePointStyle: true,
    },
  },
};

//config_2
const config_2 = {
  type: "line",
  data: data_2,
  options: {
    interaction: {
      mode: "index",
      intersect: false,
    },

    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        offset: true,
        grid: {
          display: false,
        },

        ticks: {
          color: "#8598ad",
        },
      },
      y: {
        grid: {
          borderColor: "transparent",
        },
        min: 0,
        max: 15,
        ticks: {
          stepSize: 5,
          color: "#666666",
          textStrokeWidth: 1,
          textStrokeColor: "#666666",
        },
      },
    },
    elements: {
      line: {
        tension: 0.5,
      },
      point: {
        pointStyle: "circle",
        radius: 0,
        hoverRadius: 16,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "nearest",
        intersect: false,
        enabled: false,
        position: "nearest",
        external: externalTooltipHandler,
        callbacks: {
          afterBody: function () {
            return "Calls received on";
          },
          beforeBody: function (tooltip) {
            return nth(tooltip[0].label);
          },
        },
      },
      hover: {
        mode: "nearest",
        intersect: false,
      },
    },
  },
  legend: {
    labels: {
      usePointStyle: true,
    },
  },
};

//config_3
const config_3 = {
  type: "line",
  data: data_3,
  options: {
    interaction: {
      mode: "index",
      intersect: false,
    },

    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        offset: true,
        grid: {
          display: false,
        },

        ticks: {
          color: "#8598ad",
        },
      },
      y: {
        grid: {
          borderColor: "transparent",
        },
        min: 0,
        max: 15,
        ticks: {
          stepSize: 5,
          color: "#666666",
          textStrokeWidth: 1,
          textStrokeColor: "#666666",
        },
      },
    },
    elements: {
      line: {
        tension: 0.5,
      },
      point: {
        pointStyle: "circle",
        radius: 0,
        hoverRadius: 16,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "nearest",
        intersect: false,
        enabled: false,
        position: "nearest",
        external: externalTooltipHandler,
        callbacks: {
          afterBody: function () {
            return "Comments at";
          },
        },
      },
      hover: {
        mode: "nearest",
        intersect: false,
      },
    },
  },
  legend: {
    labels: {
      usePointStyle: true,
    },
  },
};

//config_4
const config_4 = {
  type: "line",
  data: data_4,
  options: {
    interaction: {
      mode: "index",
      intersect: false,
    },

    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        offset: true,
        grid: {
          display: false,
        },

        ticks: {
          color: "#8598ad",
        },
      },
      y: {
        grid: {
          borderColor: "transparent",
        },
        min: 0,
        max: 15,
        ticks: {
          stepSize: 5,
          color: "#666666",
          textStrokeWidth: 1,
          textStrokeColor: "#666666",
        },
      },
    },
    elements: {
      line: {
        tension: 0.5,
      },
      point: {
        pointStyle: "circle",
        radius: 0,
        hoverRadius: 16,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "nearest",
        intersect: false,
        enabled: false,
        position: "nearest",
        date: true,
        external: externalTooltipHandler,
        callbacks: {
          afterBody: function () {
            return "Comments on ";
          },
          beforeBody: function (tooltip) {
            return nth(tooltip[0].label);
          },
        },
      },
      hover: {
        mode: "nearest",
        intersect: false,
      },
    },
  },
  legend: {
    labels: {
      usePointStyle: true,
    },
  },
};

let myChart_1 = new Chart(document.getElementById("myChart_1"), config_1);
let myChart_2 = new Chart(document.getElementById("myChart_2"), config_2);
let myChart_3 = new Chart(document.getElementById("myChart_3"), config_3);
let myChart_4 = new Chart(document.getElementById("myChart_4"), config_4);
