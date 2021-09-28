import React from "react";
import {getMediaList} from '../requests';
import moment from 'moment'

export function Dashboard() {
  const [ filter , setFilter ] = React.useState("all");
  const [mediaList, setmediaList] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(100);

  const handleOnPageChange = (data) => {
    const selectedPage = data.selected + 1;
    setPage(selectedPage);
  };
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    const initApiCall = async () => {
      let list = await getMediaList(filter,search);
      setmediaList(list);
    };
    initApiCall();
  }, [filter,search]);
  return (
    <div className="flex items-center justify-center h-screen p-4 bg-gray-200">
      <div style={{ minWidth: 1000 }} className="h-full p-4 bg-white shadow-lg">
        <div className="flex justify-between">
          <p className="text-xl font-bold ">Dashboard</p>
          <div>
            <div className="relative inline-block">
              <input
                className="text-sm form-input"
                placeholder="Search..."
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    setSearch(e.target.value);
                  }
                }}
              />
              {search.length > 0 ? (
                <button
                  className="absolute m-2 text-sm text-gray-700 underline"
                  style={{ right: -1 }}
                  onClick={() => setSearch("")}
                >
                  Reset
                </button>
              ) : null}
            </div>
            <select onChange={(e) => {setFilter(e.target.value)}} class="form-select text-sm">
              <option value={"all"}>All</option>
              <option value={"image"}>Image</option>
              <option value={"video"}>Video</option>
            </select>
          </div>
        </div>
        <div className="table-responsive overflow-y-auto">
          {mediaList && Array.isArray(mediaList) && mediaList.length ? (
            <table className="w-full bg-white shadow table-auto table-basic">
              <thead>
                <tr>
                  <th className="p-2 pl-4 text-left border-b border-gray-200">
                    SL
                  </th>
                  <th className="p-2 text-left border-b border-gray-200 ">
                    Name
                  </th>

                  <th className="p-2 text-left border-b border-gray-200">
                    Type
                  </th>

                  <th className="w-1/12 p-2 text-left border-b border-gray-200">
                    Created At
                  </th>
                  <th className={"border-b"}></th>
                </tr>
              </thead>
              <tbody>
                {mediaList && Array.isArray(mediaList) && mediaList.length
                  ? mediaList.map((item, index) => {
                      return (
                        <tr
                          className={`border-b border-gray-200 text-gray-700 relative hover:bg-gray-200 `}
                        >
                          <td className={"p-2 pl-4 "}>{index}</td>
                          <td className={"p-2"}>
                            <p className="underline hover:text-blue-500 tracking-tighter">
                              {item?.name ?? "N/A"}
                            </p>
                          </td>

                          <td className={"p-2 tracking-tighter"}>
                            {item?.type ?? "N/A"}
                          </td>
                          <td className="p-2 capitalize whitespace-nowrap tracking-tighter">
                            <p className="">{moment(item.created_at).format('lll')}</p>
                          </td>
                          <td className="p-2"></td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          ) : (
            <p className="flex items-center justify-center">no data found</p>
          )}
        </div>

        {/* <ul className="grid grid-cols-4 gap-4 mt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <li className="pb-4">
              <img src="https://via.placeholder.com/200" alt="video" />
              <p className="mt-2">title</p>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}
