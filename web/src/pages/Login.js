export function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="p-4 bg-white shadow-lg">
        <p className="text-center">Login</p>
        <form>
          <div className="px-4 py-2">
            <label className="block">
              <span className="text-gray-700">Username</span>
              <input
                name="phone"
                className="block w-full mt-1 form-input"
                placeholder="*********"
              />
            </label>
          </div>
          <div className="px-4 py-2">
            <label className="block">
              <span className="text-gray-700">Password</span>
              <input
                name="password"
                type="password"
                className="block w-full mt-1 form-input"
                placeholder="*********"
              />
            </label>
          </div>
          <div className="p-4 text-center">
            <button className={"bg-black p-2 text-white"}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
