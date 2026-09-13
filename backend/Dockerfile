FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY DonMarcelino.Domain/DonMarcelino.Domain.csproj DonMarcelino.Domain/
COPY DonMarcelino.Application/DonMarcelino.Application.csproj DonMarcelino.Application/
COPY DonMarcelino.Infrastructure/DonMarcelino.Infrastructure.csproj DonMarcelino.Infrastructure/
COPY DonMarcelino.Api/DonMarcelino.Api.csproj DonMarcelino.Api/

RUN dotnet restore DonMarcelino.Api/DonMarcelino.Api.csproj

COPY . .

WORKDIR /src/DonMarcelino.Api

RUN dotnet publish DonMarcelino.Api.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://0.0.0.0:10000

EXPOSE 10000

ENTRYPOINT ["dotnet", "DonMarcelino.Api.dll"]