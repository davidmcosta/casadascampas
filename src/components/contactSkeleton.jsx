const ContactSkeleton = () => (
  <div>
    <h3 className="text-base font-semibold mb-3 text-amberVar">Contacto</h3>
    <ul className="space-y-3 text-sm">
      {[...Array(5)].map((_, i) => (
        <li key={i} className="flex items-start gap-2">
          <div className="w-5 h-5 bg-amber-100 rounded-full animate-pulse"></div>
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse"></div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default ContactSkeleton ;


