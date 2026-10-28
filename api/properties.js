
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Método no permitido"
    });
  }

  const apiKey = process.env.EASYBROKER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Falta configurar EASYBROKER_API_KEY en Vercel"
    });
  }

  try {
    const response = await fetch(
      "https://api.easybroker.com/v1/properties",
      {
        method: "GET",
        headers: {
          "X-Authorization": apiKey,
          "Accept": "application/json"
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "EasyBroker no pudo completar la consulta",
        details: data
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "No se pudo conectar con EasyBroker"
    });
  }
}
