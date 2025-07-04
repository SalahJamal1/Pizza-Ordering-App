import CreateUser from "../components/user/CreateUser";

function Home() {
  return (
    <div className="grid grid-cols-2">
      <img src="pizza.webp" alt="poster" className="h-100" />
      <div className="space-y-6">
        <h1 className="capitalize text-xl font-semibold tracking-wider">
          The best pizza.
          <br />
          Straight out of the oven, straight to you.
        </h1>
        <CreateUser />
      </div>
    </div>
  );
}

export default Home;
