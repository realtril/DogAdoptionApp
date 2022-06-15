import { render, screen } from "@testing-library/react";
import Cards from "../Cards";
import dogs from "../../../mocks/dogs.json";

describe("Cards", () => {
  test("should render 5 card components", () => {
    render(<Cards dogs={ dogs } />);
    expect(screen.getAllByRole("article").length).toBe(5);
  });
});