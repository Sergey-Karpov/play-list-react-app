import { render } from "@testing-library/react";
import { MainPage } from "../MainPage";

test("MainPage snapshot render test", () => {
  const { container } = render(<MainPage />);
  expect(container).toMatchSnapshot();
});
