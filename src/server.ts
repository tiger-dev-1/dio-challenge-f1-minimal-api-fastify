import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true  });

server.register(cors, {
    origin: "*"
})

const teams = [
    {
        id: 1,
        name: "Ferrari",
        base: "Maranello, Italy"
    },
    {
        id: 2,
        name: "Mercedes",
        base: "Brackley, United Kingdom"
    },
    {
        id: 3,
        name: "Red Bull",
        base: "Milton Keynes, England"
    }
]

const drivers = [
    {
        id: 1,
        name: "Michael Schumacher",
        team: "Ferrari",
    },
    {
        id: 2,
        name: "Lewis Hamilton",
        team: "Mercedes",
    },
    {
        id: 3,
        name: "Max Verstappen",
        team: "Red Bull",

    },

]

server.get("/teams", async (request, response) => {
    response.type("application/json").code(200);

    return (teams);
});

server.get("/drivers", async (request, response) => {
    response.type("application/json").code(200);

    return (drivers)
});

interface DriverParams {
    id: string
}


server.get<{Params: DriverParams}>("/drivers/:id", async (request, response) => {
    const id = parseInt(request.params.id);

    const driver = drivers.find(driver => driver.id === id);

    if(!driver) {
        response.type("application/json").code(404);

        return ({error: "Driver not found"});
    } else {
        response.type("application/json").code(200);

        return (driver);
    }

});

server.listen({port: 3333}, () => {
    console.log("Server running on port 3333")
})


