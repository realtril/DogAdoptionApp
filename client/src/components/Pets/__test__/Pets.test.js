import { render, screen, within } from "@testing-library/react";
import Pets from "../Pets";
import { rest } from "msw";
import { setupServer } from "msw/node";
import dogsMock from "../../../mocks/dogs.json";
import userEvent from "@testing-library/user-event";

const server = setupServer(
  rest.get("http://localhost:4000/dogs", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dogsMock));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Pets", () => {
  test("should render the correct amount of cards", async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole("article");
    expect(cards.length).toBe(5);
  });

  test("should filter for male cards", async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole("article");
    userEvent.selectOptions(screen.getByLabelText(/gender/i), "male");
    const maleCards = screen.getAllByRole("article");
    expect(maleCards).toStrictEqual([cards[1], cards[3]]);
  });

  test("should filter for female cards", async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole("article");
    userEvent.selectOptions(screen.getByLabelText(/gender/i), "female");
    const maleCards = screen.getAllByRole("article");
    expect(maleCards).toStrictEqual([cards[0], cards[2], cards[4]]);
  });

  test("should filter for favoured dogs", async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole("article");
    userEvent.click(within(cards[0]).getByRole("button"));
    userEvent.click(within(cards[3]).getByRole("button"));
    userEvent.selectOptions(screen.getByLabelText(/favourite/i), "favoured");
    expect(screen.getAllByRole("article")).toStrictEqual([cards[0], cards[3]]);
  });

  test("should filter for not favoured dogs", async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole("article");
    userEvent.click(within(cards[0]).getByRole("button"));
    userEvent.click(within(cards[3]).getByRole("button"));

    userEvent.selectOptions(
      screen.getByLabelText(/favourite/i),
      "not favoured"
    );

    expect(screen.getAllByRole("article")).toStrictEqual([
      cards[1],
      cards[2],
      cards[4],
    ]);
  });

  test("should filter for not favoured dogs", async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole("article");
    userEvent.click(within(cards[0]).getByRole("button"));
    userEvent.click(within(cards[3]).getByRole("button"));

    userEvent.selectOptions(
      screen.getByLabelText(/favourite/i),
      "favoured"
    );

    userEvent.selectOptions(
      screen.getByLabelText(/gender/i),
      "male"
    );


    expect(screen.getAllByRole("article")).toStrictEqual([
      cards[3],
    ]);
  });
});
