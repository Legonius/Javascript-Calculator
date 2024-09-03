import Calculator from "./components/Calculator";

export default function App() {
  return (
    <div className="flex flex-col justify-between h-screen w-screen items-center py-10 dark:bg-violet-950">
      <h1 className="text-3xl font-bold underline text-orange-500 bg-black px-3 py-1">
        Javascript Calculator
      </h1>
      <Calculator />
      <footer className="text-center text-xl">
        <p className="dark:text-white">Designed and Coded By</p>
        <p className="text-blue-500 ">Zaw Min Thu</p>
      </footer>
    </div>
  );
}
