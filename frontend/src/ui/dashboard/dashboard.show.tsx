import { Theme } from "@mui/material";
import React from "react";
import styled from "styled-components";

const DashboardContainer = styled.div`
  margin-bottom: 16px;
`;

const Card = styled.div<{ theme: Theme }>`
  color: #f6f3e4;
  margin-bottom: 16px;
  padding: 16px;
`;

const Title = styled.h3<{ theme: Theme }>`
  color: #f6f3e4;
  margin-bottom: 8px;
`;

const Quantity = styled.p`
  margin: 0;
`;

export function Dashboard() {
  const visits = 1000; // Replace with actual data
  const hoursSpent = 24; // Replace with actual data
  const kbs = 500000; // Replace with actual data

  return (
    <DashboardContainer>
      <h1>Dashboard</h1>
      <Card>
        <Title>Quantity of Visits</Title>
        <Quantity>{visits}</Quantity>
      </Card>
      <Card>
        <Title>Quantity of Hours Spent</Title>
        <Quantity>{hoursSpent}</Quantity>
      </Card>
      <Card>
        <Title>Quantity of KBs</Title>
        <Quantity>{kbs}</Quantity>
      </Card>
    </DashboardContainer>
  );
}
