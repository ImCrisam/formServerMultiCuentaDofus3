export interface dataResponse {
  values: string[][];
  labels: string[];
}
export const useFetch = (sheetUrl: string) => {
  async function getData(): Promise<dataResponse | null> {
    try {
      const response = await fetch(sheetUrl);
      const text = await response.text();

      // Convertir CSV a matriz
      const rows = text
        .replace(/\r/g, "")
        .split("\n")
        .map((row) => row.split(","));

      const labels = rows[0];
      const values = rows.slice(1);
      console.log({ labels, values });
      return { labels, values };
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  return { getData };
};
