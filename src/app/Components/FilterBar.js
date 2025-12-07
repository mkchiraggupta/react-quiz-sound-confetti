'use client'

import React from "react";
import { Select, Row, Col, Card } from "antd";

const { Option } = Select;

const FilterBar = () => {
  return (
    <Card
      style={{
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
      bodyStyle={{ padding: "16px 20px" }}
    >
      <Row gutter={16} align="middle">
        {/* Category */}
        <Col>
          <div style={{ marginBottom: 2, fontWeight: 500 }}>Category</div>
          <Select
            defaultValue="Beer"
            style={{ width: 220 }}
            bordered
            size="middle"
          >
            <Option value="Beer">Beer</Option>
            <Option value="Wine">Wine</Option>
            <Option value="Whiskey">Whiskey</Option>
          </Select>
        </Col>

        {/* Customer */}
        <Col>
          <div style={{ marginBottom: 2, fontWeight: 500 }}>Customer</div>
          <Select defaultValue="All" style={{ width: 220 }} bordered size="middle">
            <Option value="All">All</Option>
            <Option value="Customer1">Customer 1</Option>
            <Option value="Customer2">Customer 2</Option>
          </Select>
        </Col>

        {/* Brand */}
        <Col>
          <div style={{ marginBottom: 2, fontWeight: 500 }}>Brand</div>
          <Select defaultValue="All" style={{ width: 220}} bordered size="middle">
            <Option value="All">All</Option>
            <Option value="Brand1">Brand 1</Option>
            <Option value="Brand2">Brand 2</Option>
          </Select>
        </Col>

        {/* Channel */}
        <Col>
          <div style={{ marginBottom: 2, fontWeight: 500 }}>Channel</div>
          <Select defaultValue="Retail" style={{ width: 220 }} bordered size="middle">
            <Option value="Retail">Retail</Option>
            <Option value="Wholesale">Wholesale</Option>
            <Option value="Online">Online</Option>
          </Select>
        </Col>

        {/* Region */}
        <Col>
          <div style={{ marginBottom: 2, fontWeight: 500 }}>Region</div>
          <Select defaultValue="All" style={{ width: 220 }} bordered size="middle">
            <Option value="All">All</Option>
            <Option value="North">North</Option>
            <Option value="South">South</Option>
          </Select>
        </Col>
      </Row>
    </Card>
  );
};

export default FilterBar;
