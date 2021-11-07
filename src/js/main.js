import {cxpc} from './data';
import DyGraph from 'dygraphs';

const APP = document.querySelector(`body`);
const GRAPH = document.querySelector(`#graph`)
const LEGEND = document.querySelector(`#legend`)
/**
 * Draw a Dygraph of the given material prices.
 * 
 * @param {string} mat The material to graph
 * @param {string} cx The exchange to pull price data from
 * @returns The Dygraph object
 */
async function drawChart(mat, cx) {
  mat = mat.toUpperCase();
  cx = cx.toUpperCase();
  let data = await cxpc(mat, cx);

  data = data.map(entry => [
    new Date(entry['TimeEpochMs']),
    Number(entry['Close'].toFixed(2))
  ])

  options = {
    title: `${mat}.${cx} Pricing`,
    // animatedZooms: true,
    showRangeSelector: true,
    width: APP.clientWidth - 20,
    height: APP.clientHeight - 60,
    labelsDiv: LEGEND,
    labelsSeparateLines: true,
    labelsKMB: true,
    legend: 'always',
    labels: ['Date', 'Price']
  }

  console.log(options);

  return new DyGraph(GRAPH, data, options);
}

const PARAMS = Object.fromEntries(
  new URLSearchParams(window.location.search).entries()
);

console.log(
  `Indexify loaded at ${new Date()} with params ${JSON.stringify(PARAMS)}`
);

let dygraph = drawChart(PARAMS.mat || "RAT", PARAMS.cx || "IC1");
