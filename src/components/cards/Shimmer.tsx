export function Shimmer() {
    // Create an array of 10 elements
    const shimmerArray = new Array(10).fill(0);
  
    return (
      <div className="bg-black justify-center items-center flex flex-wrap gap-4 p-4 ">
        {shimmerArray.map((_, index) => (
          <div
            key={index}
            className="border-[1px] flex flex-col gap-2 border-gray-500 rounded-md p-2 w-[200px]"
          >
            <h1 className="max-w-[80px] rounded-md bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-[length:200%_100%] animate-shimmer h-5"></h1>
            <div className="w-full h-[100px] rounded-md bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-[length:200%_100%] animate-shimmer"></div>
            <h1 className="max-w-full rounded-md bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-[length:200%_100%] animate-shimmer h-5"></h1>
            <h1 className="max-w-full rounded-md bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-[length:200%_100%] animate-shimmer h-5"></h1>
          </div>
        ))}
      </div>
    );
  }
  