export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <form action="/results" className="w-full max-w-sm">
        <label htmlFor="vin" className="block text-gray-700 text-sm font-bold mb-2">
          Enter VIN:
        </label>
        <div className="bg-white rounded-md px-3 py-1 flex flex-row gap-x-3 shadow-md">
          <input
            className="h-10 w-full rounded-md px-3 py-2 text-gray-700 focus:outline-none"
            type="text"
            id="vin"
            name="vin"
            placeholder="Enter your VIN"
            required
          />
          <button
            className="h-10 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
            type="submit"
          >
            Decode
          </button>
        </div>
      </form>
    </main>
  );
}
