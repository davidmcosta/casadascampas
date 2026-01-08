const ContactPage = () => {
  return (
    <section className="py-16 px-4 animate-pulse">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="h-8 w-2/3 bg-gray-300 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded-lg"></div>
            ))}
            <div className="h-12 bg-gray-300 w-1/2 rounded-lg"></div>
          </div>

          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-100 p-6 rounded-2xl space-y-3">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                    <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}

            <div className="h-96 bg-gray-200 rounded-xl"></div>
            <div className="h-10 w-1/2 bg-gray-300 rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default ContactPage;