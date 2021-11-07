/**
 * Return pricing data.
 *
 * @param {string} mat the material
 * @param {string} cx the exchange
 * @param {number} time time cutoff -- -1 is all time
 */
export async function cxpc(mat, cx, time = -1) {
  console.log(`getting info for ${mat} on ${cx}`);
  const now = Date.now();
  let time_ago = now - time * 60 * 60 * 1000;
  if(time < 0) time_ago = 0
  const url = `https://rest.fnar.net/exchange/cxpc/${mat}.${cx}/${time_ago}`;
  console.log(`fetching from ${url}`);
  let data = await fetch(url);
  console.log(data);
  return data.json();
}
