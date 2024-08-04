import React, { useState, useEffect } from 'react';
import Chart from '../components/Chart';
import PieChartComponent from '../components/PieChart';
import BarChartByCounty from '../components/BarChartByCounty';
import StackedBarChart from '../components/StackedBarChart';
import { parseCSV } from '../utils/csvParser';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  color: #004d99;
  margin-bottom: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;
  margin: 20px 0;
`;

const InfoCard = styled.div<{ color: string }>`
  background: #f8f9fa;
  border-left: 10px solid ${({ color }) => color};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.2s;
  width: 30%;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const CardTitle = styled.h2`
  margin-bottom: 10px;
  color: #004d99;
`;

const CardValue = styled.p`
  font-size: 24px;
  font-weight: bold;
`;

const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin-top: 20px;
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 18px;
  color: #666;
`;


const Dashboard: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [pieChart, setPieChartData] = useState([]);
  const [byCountyData, setByCountyData] = useState([]);
  const [vehicleWiseData, setVehicleWiseData] = useState([]);
  const [conclusiveFigures, setConclusiveFigures] = useState({ totalVehicles: 0, uniqueMakes: 0, uniqueModels: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parsedData = await parseCSV('/Electric_Vehicle_Population_Data.csv');
        
        const makeCount = parsedData.reduce((acc: any, item: any) => {
            acc[item.Make] = (acc[item.Make] || 0) + 1;
            return acc;
        }, {});
        
        const pieChartData = Object.entries(makeCount).map(([Make, count]) => ({ Make, Count: count }));

        const countyCount = parsedData.reduce((acc: any, item: any) => {
          acc[item.County] = (acc[item.County] || 0) + 1;
          return acc;
        }, {});
  
        const barChartData = Object.entries(countyCount).map(([County, Count]) => ({ County, Count }));

        const vehicleWise = parsedData.reduce((acc: any, item: any) => {
          const county = item.County;
          const type = item['Electric Vehicle Type'];

          if (!acc[county]) {
            acc[county] = { County: county, BEV: 0, PHEV: 0 };
          }

          if (type === 'Battery Electric Vehicle (BEV)') {
            acc[county].BEV += 1;
          } else if (type === 'Plug-in Hybrid Electric Vehicle (PHEV)') {
            acc[county].PHEV += 1;
          }

          return acc;
        }, {});

        const sortedCounties = Object.values(vehicleWise)
          .map((item: any) => ({
            ...item,
            Total: item.BEV + item.PHEV
          }))
          .sort((a: any, b: any) => b.Total - a.Total)
          .slice(0, 3);

        setVehicleWiseData(sortedCounties as []);
        setByCountyData(barChartData as []);
        setPieChartData(pieChartData as []);
        setData(parsedData);

        const uniqueMakes = new Set(parsedData.map((item) => item.Make)).size;
        const uniqueModels = new Set(parsedData.map((item) => item.Model)).size;

        setConclusiveFigures({
          totalVehicles: parsedData.length,
          uniqueMakes,
          uniqueModels
        });

      } catch (error) {
        console.error('Error fetching and parsing CSV:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Title>Electric Vehicles Dashboard</Title>
      <CardContainer>
        <InfoCard color="#0088FE">
          <CardTitle>Total Vehicles</CardTitle>
          <CardValue>{conclusiveFigures.totalVehicles}</CardValue>
        </InfoCard>
        <InfoCard color="#00C49F">
          <CardTitle>Unique Makes</CardTitle>
          <CardValue>{conclusiveFigures.uniqueMakes}</CardValue>
        </InfoCard>
        <InfoCard color="#FFBB28">
          <CardTitle>Unique Models</CardTitle>
          <CardValue>{conclusiveFigures.uniqueModels}</CardValue>
        </InfoCard>
      </CardContainer>
      {data.length > 0 ? (
        <>
          <ChartContainer>
            <Chart data={data} />
            <PieChartComponent data={pieChart} />
            <BarChartByCounty data={byCountyData} />
            <StackedBarChart data={vehicleWiseData} />
          </ChartContainer>
        </>
      ) : (
        <LoadingText>Loading data...</LoadingText>
      )}
    </Container>
  );
};

export default Dashboard;