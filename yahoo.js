// netlify/functions/yahoo.js

exports.handler = async (event) => {
  const params = event.queryStringParameters || {};
  const symbol = params.symbol;
  const range = params.range || "6mo";
  const interval = params.interval || "1d";

  if (!symbol) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Missing symbol parameter" }),
    };
  }

  const url =
    "https://query1.finance.yahoo.com/v8/finance/chart/" +
    encodeURIComponent(symbol) +
    "?range=" + encodeURIComponent(range) +
    "&interval=" + encodeURIComponent(interval);

  try {
    const res = await fetch(url);
    const data = await res.json();

    return {
      statusCode: res.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: e.message || String(e) }),
    };
  }
};