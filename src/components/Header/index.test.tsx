import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "../Header";
import { usePathname, useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

describe("Header Component", () => {
  const mockRouterBack = jest.fn();
  const mockScrollTo = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ back: mockRouterBack });
    (global.window.scrollTo as jest.Mock) = mockScrollTo;
  });

  test("renders the header title", () => {
    (usePathname as jest.Mock).mockReturnValue("/some-page");

    render(<Header />);

    expect(
      screen.getByRole("heading", { name: /maintenance request/i })
    ).toBeInTheDocument();
  });

  test("hides back button on the root path", () => {
    (usePathname as jest.Mock).mockReturnValue("/");

    render(<Header />);

    expect(screen.getByRole("button")).toHaveClass("invisible");
  });

  test("shows back button on non-root paths", () => {
    (usePathname as jest.Mock).mockReturnValue("/some-page");

    render(<Header />);

    expect(screen.getByRole("button")).not.toHaveClass("invisible");
  });

  test("calls router.back and scrolls to top when back button is clicked", async () => {
    (usePathname as jest.Mock).mockReturnValue("/some-page");

    render(<Header />);

    await userEvent.click(screen.getByRole("button"));

    expect(mockRouterBack).toHaveBeenCalledTimes(1);

    // Simulate delay before scrolling
    await new Promise((res) => setTimeout(res, 150));

    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
