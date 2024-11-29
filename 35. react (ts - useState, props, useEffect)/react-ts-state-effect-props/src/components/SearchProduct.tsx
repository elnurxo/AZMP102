import React from "react";

interface SearchProductProps {
  setSearchQuery: (state: string) => void;
}

const SearchProduct: React.FC<SearchProductProps> = ({ setSearchQuery }) => {
  return (
    <input
      onChange={(e) => {
        setSearchQuery(e.target.value as string);
      }}
      type="text"
      placeholder="search product"
    />
  );
};

export default SearchProduct;
