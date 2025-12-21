import { parseAuthFormData } from "./Authentication";

describe("parseAuthFormData testing suite", ()=>{
    
    it("handles form data correctly with parseFormData, if rememberMe is true", async () => {
    const formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("password", "secret");
    formData.append("rememberMe", "on")

   

    const result = parseAuthFormData(formData);

    expect(result).toEqual({
      email: "test@example.com",
      password: "secret",
      rememberMe: true
    });
  });
  it("handles form data correctly with parseFormData, if rememberMe is true", async () => {
    const formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("password", "secret");

  

    const result = parseAuthFormData(formData);

    expect(result).toEqual({
      email: "test@example.com",
      password: "secret",
      rememberMe: false
    });
  })



});