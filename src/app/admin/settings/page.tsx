"use client";

import { Form, Input, Button, Card } from "antd";

export default function AdminSettings() {
  return (
    <div className="max-w-[800px]">
      <h1 className="mb-8">Settings</h1>

      <Card className="mb-8 shadow-[var(--light-shadow)]">
        <h2 className="mb-6 text-[var(--clr-grey-1)]">Store Information</h2>
        <Form layout="vertical">
          <Form.Item label="Store Name">
            <Input defaultValue="E-Shop" size="large" />
          </Form.Item>
          <Form.Item label="Contact Email">
            <Input type="email" defaultValue="admin@eshop.com" size="large" />
          </Form.Item>
          <Form.Item label="Phone">
            <Input type="tel" defaultValue="+1234567890" size="large" />
          </Form.Item>
          <Button type="primary" size="large">
            Save Changes
          </Button>
        </Form>
      </Card>

      <Card className="mb-8 shadow-[var(--light-shadow)]">
        <h2 className="mb-6 text-[var(--clr-grey-1)]">Shipping Settings</h2>
        <Form layout="vertical">
          <Form.Item label="Standard Shipping Fee ($)">
            <Input type="number" step="0.01" defaultValue="5.00" size="large" />
          </Form.Item>
          <Form.Item label="Free Shipping Threshold ($)">
            <Input
              type="number"
              step="0.01"
              defaultValue="50.00"
              size="large"
            />
          </Form.Item>
          <Button type="primary" size="large">
            Save Changes
          </Button>
        </Form>
      </Card>

      <Card className="shadow-[var(--light-shadow)]">
        <h2 className="mb-6 text-[var(--clr-grey-1)]">Tax Settings</h2>
        <Form layout="vertical">
          <Form.Item label="Tax Rate (%)">
            <Input type="number" step="0.01" defaultValue="8.50" size="large" />
          </Form.Item>
          <Button type="primary" size="large">
            Save Changes
          </Button>
        </Form>
      </Card>
    </div>
  );
}
