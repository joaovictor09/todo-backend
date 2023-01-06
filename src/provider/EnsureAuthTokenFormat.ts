class EnsureAuthTokenFormat{
  async execute(authToken: string){
    //Verifica se o Auth Token ou title existe

    if (!authToken){
      throw new Error("Token is missing");
    }

    //Verifica se está no formato Bearer

    const [bearer, token] = authToken.split(" ")

    if (!token || bearer !== "Bearer") {
      throw new Error("Token is an invalid format");
    }

    return token;

  }
}

export { EnsureAuthTokenFormat }