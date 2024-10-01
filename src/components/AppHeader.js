import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Checkbox,
  Drawer,
  Form,
  Input,
  InputNumber,
  Menu,
  message,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../API";

export default function AppHeader() {
  const navigate = useNavigate();
  const onMenuClick = (item) => {
    navigate(`./${item.key}`);
  };

  return (
    <div className="header">
      <Menu
        className="appMenu"
        onClick={onMenuClick}
        mode="horizontal"
        items={[
          {
            label: <HomeFilled />,
            key: "",
          },
          {
            label: "Men",
            key: "men",
            children: [
              {
                label: "Men’s Shirts",
                key: "mens-shirts",
              },
              {
                label: "Men’s Shoes",
                key: "mens-shoes",
              },
              {
                label: "Men’s Watches",
                key: "mens-watches",
              },
            ],
          },
          {
            label: "Women",
            key: "women",
            children: [
              {
                label: "Women’s Dresses",
                key: "womens-dresses",
              },
              {
                label: "Women’s Shoes",
                key: "womens-shoes",
              },
              {
                label: "Women’s Watches",
                key: "womens-watches",
              },
              {
                label: "Women’s Jewellery",
                key: "womens-jewellery",
              },
              {
                label: "Women’s Bags",
                key: "womens-bags",
              },
            ],
          },
          {
            label: "Fragrances",
            key: "fragrances",
          },
        ]}
      />
      <Typography.Title>MaNo Store</Typography.Title>
      <AppCart />
    </div>
  );
}
function AppCart() {
  const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);
  const [cartDrawreOpen, setCartDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    getCart().then((res) => {
      setCartItems(res.products);
    });
  }, []);
  const onConfirmOrder = (values) => {
    setCartDrawerOpen(false);
    setCheckoutDrawerOpen(false);
    message.success("Your order has been confirmed successfully");
  };
  return (
    <div>
      <Badge
        style={{ cursor: "pointer" }}
        count={cartItems.length}
        className="shoppingCartIcon"
        onClick={() => {
          setCartDrawerOpen(true);
        }}
      >
        <ShoppingCartOutlined style={{ cursor: "pointer" }} />
      </Badge>
      <Drawer
        open={cartDrawreOpen}
        onClose={() => {
          setCartDrawerOpen(false);
        }}
        title="Your Cart"
        // contentWrapperStyle={{ width: 600 }}
        styles={{ wrapper: { width: 500 } }}
      >
        <Table
          pagination={false}
          columns={[
            {
              title: "Product",
              dataIndex: "title",
              key: "title",
            },
            {
              title: "Price",
              dataIndex: "price",
              key: "price",
              render: (price) => {
                return <span>${price.toFixed(2)}</span>;
              },
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              key: "quantity",
              render: (value, record) => {
                return (
                  <InputNumber
                    defaultValue={value}
                    min={0}
                    onChange={(value) => {
                      setCartItems((pre) =>
                        pre.map((cart) => {
                          if (cart.id === record.id) {
                            cart.total = cart.price * value;
                          }
                          return cart;
                        })
                      );
                    }}
                  ></InputNumber>
                );
              },
            },
            {
              title: "Total",
              dataIndex: "total",
              key: "total",
              render: (value) => {
                return `$${value.toFixed(2)}`;
              },
            },
          ]}
          dataSource={cartItems}
          summary={(data) => {
            const total = data.reduce((pre, current) => {
              return pre + current.total;
            }, 0);
            return <span>Total : $ {total.toFixed(2)}</span>;
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            setCheckoutDrawerOpen(true);
          }}
        >
          Checkout Your Cart{" "}
        </Button>
      </Drawer>
      <Drawer
        open={checkoutDrawerOpen}
        onClose={() => {
          setCheckoutDrawerOpen(false);
        }}
        title="Confirm Order"
      >
        <Form
          onFinish={onConfirmOrder}
          labelCol={{
            span: 7,
          }}
        >
          <Form.Item
            label="Full Name"
            name={"full_name"}
            rules={[
              {
                required: true,
                message: "Please enter your Full Name!",
              },
            ]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name={"email"}
            rules={[{ type: "email", required: true }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Address"
            name={"address"}
            rules={[
              {
                required: true,
                message: "Please enter your Address!",
              },
            ]}
          >
            <Input placeholder="Enter your address" />
          </Form.Item>
          <Form.Item>
            <Checkbox defaultChecked disabled>
              Cash on Delivery
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Typography.Paragraph type="secondary">
              More Methods Comming Soon
            </Typography.Paragraph>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {" "}
            Confirm Order
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}
