import React, { useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);
import { Bar } from "react-chartjs-2";
import { Col, Container, Row } from "react-grid-system";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1wg66sMKkBXPMxxCM_q4vVXRPk2rB8MXf_8bxj01299s/export?format=csv";

interface Graph {
  name: string;
  index: number;
  values: string[];
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

export const GoogleSheetGraph: React.FC = () => {
  const { getData } = useFetch(SHEET_URL);

  const [graphs, setGraphs] = useState<Graph[]>([]);
  const [chartData, setChartData] = useState<Record<string, ChartData>>({});

  useEffect(() => {
    const getDataChart = async () => {
      const data = await getData();
      if (!data) return;

      const generatedGraphs = data.labels.map((label, index) => ({
        name: label,
        index: index,
        values: data.values.map((row) => row[index]),
      }));
      setGraphs(generatedGraphs);

      const allChartData: Record<string, ChartData> = {};
      generatedGraphs.forEach((graph) => {
        const counts: Record<string, number> = graph.values.reduce(
          (acc, response) => {
            acc[response] = (acc[response] || 0) + 1;
            return acc;
          },
          {}
        );

        allChartData[graph.name] = {
          labels: Object.keys(counts), // Respuestas únicas
          datasets: [
            {
              label: ` ${graph.name}`,
              data: Object.values(counts), // Cantidades
              backgroundColor: [
                "#3A5F0B", // Verde Oscuro
                "#6BAF1A", // Verde Claro
                "#F2D024", // Amarillo
              ],
              borderColor: ["#3A5F0B", "#6BAF1A", "#F2D024"],
              borderWidth: 1,
            },
          ],
        };
      });
      setChartData(allChartData);
    };

    getDataChart();
  }, []);

  return (
    <Container>
      {graphs.length > 0 ? (
        <Row>
          {graphs.slice(1).map((graph) => (
            <Col key={graph.name} sm={12}>
              <div key={graph.name}>
                {chartData[graph.name] ? (
                  <Bar data={chartData[graph.name]} />
                ) : (
                  <p>Cargando datos para {graph.name}...</p>
                )}
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <p>Cargando gráficos...</p>
      )}
    </Container>
  );
};
