export const mapperStyle = ({ node, ...props }) => {
  return {
    code: ({ node, ...props }) => (
      <div className="overflow-x-auto bg-gray-200 rounded-md px-2 py-1">
        <code {...props} />
      </div>
    ),
    table: ({ node, ...props }) => (
      <div className="overflow-x-auto">
        <table
          className="table-auto border border-gray-300 w-full text-left"
          {...props}
        />
      </div>
    ),
    thead: ({ node, ...props }) => (
      <thead className="bg-gray-700 text-black" {...props} />
    ),
    tbody: ({ node, ...props }) => <tbody {...props} />,
    tr: ({ node, ...props }) => (
      <tr
        className="even:bg-gray-50 odd:bg-white hover:bg-gray-100 transition-colors"
        {...props}
      />
    ),
    th: ({ node, ...props }) => (
      <th className="px-4 py-2 border border-gray-300" {...props} />
    ),
    td: ({ node, ...props }) => (
      <td className="px-4 py-2 border border-gray-300" {...props} />
    ),
  };
};
