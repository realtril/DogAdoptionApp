import { render, screen } from "@testing-library/react";
import userEvents from "@testing-library/user-event";
import Card from "../Card";

const cardProps = {
  name: "Sydney",
  phone: "111-111-1111",
  email: "tbone@gmail.com",
  image: {
    url: "https://images.unsplash.com/photo-1599744615638-804deec726e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGVuZ2xpc2glMjBidWxsZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60",
    alt: "nice bulldog"
  },
  favoured: false,
  updateFavourite: () => { },
  index: 1
};

describe("Card", () => {
  test("should show name of the dog", () => {
    render(
      <Card
        { ...cardProps }
      />
    );
    expect(screen.getByRole("heading", {
      name: /sydney/i
    })).toBeInTheDocument();
  });

  test("should show phone number of the dog-seller", () => {
    render(
      <Card
        { ...cardProps }
      />
    );
    expect(screen.getByText(/111-111-1111/)).toBeInTheDocument();
  });

  test("should show email of the dog-seller", () => {
    render(
      <Card
        { ...cardProps }
      />
    );
    expect(screen.getByText(/tbone@gmail.com/i)).toBeInTheDocument();
  });

  test("should show image with correct src", () => {
    render(
      <Card
        { ...cardProps }
      />
    );
    expect(screen.getByAltText(/nice bulldog/i).src).toBe(cardProps.image.url);
  });

  test("should show outlined heart", () => {
    render(
      <Card
        { ...cardProps }
      />
    );
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });

  test("should show filled heart", () => {
    render(
      <Card
        { ...cardProps } favoured={ true }
      />
    );
    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
  });

  test("should toggle heart status", () => {
    render(
      <Card
        { ...cardProps }
      />
    );
    userEvents.click(screen.getByRole("button"));
    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.queryByAltText(/filled heart/i)).toBeInTheDocument();
    userEvents.click(screen.getByRole("button"));
  });
});