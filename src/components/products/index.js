import { useEffect, useState } from "react";
import { addToCart, getAllProducts, getProductByCategory } from "../../API";
import {
  Badge,
  Button,
  Card,
  Image,
  List,
  message,
  Rate,
  Select,
  Spin,
  Typography,
} from "antd";
import { useParams } from "react-router-dom";

export default function Products() {
  const [loading, setLoading] = useState(false);
  const param = useParams();
  function AddToCartButton({ item }) {
    const [loading, setLoading] = useState(false);
    const addProductToCart = () => {
      setLoading(true);
      addToCart(item.id).then((res) => {
        message.success(`${item.title} has been added to cart`);

        setLoading(false);
      });
    };
    return (
      <Button
        onClick={() => {
          addProductToCart();
        }}
        type="link"
        loading={loading}
      >
        Add To Cart
      </Button>
    );
  }
  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("a-z");
  useEffect(() => {
    setLoading(true);
    (param?.categoryId
      ? getProductByCategory(param.categoryId)
      : getAllProducts()
    ).then((res) => {
      setItems(res.products);
      setLoading(false);
    });
  }, [param]);
  // if (loading) {
  //   return <Spin spinning />;
  // }
  const getSortedItems = () => {
    if (sortOrder === "a-z") {
      return [...items].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "z-a") {
      return [...items].sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOrder === "by-lower-price") {
      return [...items].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "by-higher-price") {
      return [...items].sort((a, b) => b.price - a.price);
    } else {
      return items;
    }
  };
  return (
    <div style={{ padding: 8 }}>
      <div>
        <Typography.Text>View Items Sorted By :</Typography.Text>
        <Select
          onChange={(value) => {
            setSortOrder(value);
          }}
          defaultValue={"a-z"}
          style={{ width: 200 }}
          options={[
            {
              label: "a-z",
              value: "a-z",
            },
            {
              label: "z-a",
              value: "z-a",
            },
            {
              label: "By lower Price",
              value: "by-lower-price",
            },
            {
              label: "By higher Price",
              value: "by-higher-price",
            },
          ]}
        ></Select>
      </div>
      <List
        loading={loading}
        grid={{ column: 3 }}
        renderItem={(product, index) => {
          return (
            <Badge.Ribbon
              text={`${product.discountPercentage} % OOF`}
              color="pink"
              className="ItemCardBadge"
            >
              <Card
                className="itemCard"
                title={product.title}
                key={index}
                id={product.id}
                cover={<Image src={product.thumbnail} />}
                actions={[
                  <Rate value={product.rating} allowHalf disabled />,
                  <AddToCartButton item={product} />,
                ]}
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      Price: ${product.price}{" "}
                      <Typography.Text delete type="danger">
                        {} $
                        {parseFloat(
                          product.price +
                            (product.price * product.discountPercentage) / 100
                        ).toFixed(2)}
                      </Typography.Text>
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph
                      ellipsis={{ rows: 2, expandable: true, symbol: "More" }}
                    >
                      {product.description}
                    </Typography.Paragraph>
                  }
                ></Card.Meta>
              </Card>
            </Badge.Ribbon>
          );
        }}
        dataSource={getSortedItems()}
      ></List>
    </div>
  );
}
