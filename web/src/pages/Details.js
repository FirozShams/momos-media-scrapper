export function Details() {
  return (
    <div className="flex items-center justify-center h-screen p-4 bg-gray-200">
      <div style={{ minWidth: 1000 }} className="h-full p-4 bg-white shadow-lg">
        <div className="flex justify-between">
          <p className="text-xl font-bold ">Details</p>
          <div>
            <input className="text-sm form-input" placeholder="Search..." />
            <select class="form-select text-sm">
              <option>Image</option>
              <option>Video</option>
            </select>
          </div>
        </div>

        <ul className="grid grid-cols-4 gap-4 mt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <li className="pb-4">
              <img src="https://via.placeholder.com/200" alt="video" />
              <p className="mt-2">title</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
