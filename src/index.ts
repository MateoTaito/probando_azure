import server from "./server";


const port = process.env.PORT || 4000;
server.listen(port, () => {
	console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\nApi Levantada");
	console.log(process.env.DATABASE_URL!);
});