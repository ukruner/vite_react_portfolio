import { render, screen } from "@testing-library/react";
import {vi} from 'vitest';

vi.mock("react-redux", () => ({
  useSelector: vi.fn(),

}));
import { useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";



describe("ChatHeader component testing", () => {
  
  it("changes chatbot name colour to green if connection gets established, on smaller screens", () => {
    useSelector.mockReturnValue(true);

    render(<ChatHeader/>)
    
    const botNameElement = screen.getByText("Mariana");
    expect(botNameElement).toHaveClass('max-sm:text-green-500');
  });
  it("has chatbot name colour in red if connection is closed, on smaller screens", () => {
      useSelector.mockReturnValue(false);
    render(<ChatHeader/>)

    const botNameElement = screen.getByText("Mariana");
    expect(botNameElement).toHaveClass('max-sm:text-red-500');
  });
  
  it("changes chatbot avatar dot to green if connection gets established", () => {
      useSelector.mockReturnValue(true);

    render(<ChatHeader/>)

    const avatar = screen.getByAltText("avatarimage");
    expect(avatar).toHaveAttribute('src', '../avatar - green.png');
  });
  it("chatbot avatar dot is gray if connection is closed", () => {
      useSelector.mockReturnValue(false);
render(<ChatHeader/>)

    const avatar = screen.getByAltText("avatarimage");
    expect(avatar).toHaveAttribute('src', '../avatar - grey.png');
  });
  it("chatbot avatar is hidden on the smaller screens", () => {
      useSelector.mockReturnValue(true);
    render(<ChatHeader/>)
    const avatar = screen.getByAltText("avatarimage");
    expect(avatar).toHaveClass("hidden sm:block");
  });
});



