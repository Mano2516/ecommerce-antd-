import { Typography } from "antd";

export default function Footer() {
  return (
    <footer className="footer">
      <Typography.Link href="https://google.com" target="_blank">
        Privacy Policy
      </Typography.Link>
      <Typography.Link href="https://google.com" target="_blank">
        Terms & Conditions
      </Typography.Link>
      <Typography.Link href="https://google.com" target="_blank">
        Return Policy
      </Typography.Link>
      <Typography.Link href="tel" target="_blank">
        +201016808882
      </Typography.Link>
    </footer>
  );
}
