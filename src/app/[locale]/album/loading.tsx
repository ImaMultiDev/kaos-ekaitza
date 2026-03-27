export default function AlbumLoading() {
  return (
    <div className="min-h-screen bg-black">
      <section className="py-10 md:py-20 bg-gradient-punk animate-pulse">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-14 bg-gray-800 rounded-lg mx-auto mb-6 max-w-md" />
          <div className="h-6 bg-gray-800 rounded mx-auto mb-8 max-w-2xl" />
          <div className="flex justify-center gap-4">
            <div className="h-12 w-40 bg-gray-800 rounded-lg" />
            <div className="h-12 w-36 bg-gray-800 rounded-lg" />
          </div>
        </div>
      </section>
      <section className="py-12 md:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden h-[420px] animate-pulse"
              >
                <div className="h-96 bg-gray-800" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-800 rounded w-3/4" />
                  <div className="h-4 bg-gray-800 rounded w-1/2" />
                  <div className="h-8 bg-gray-800 rounded w-32 mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
