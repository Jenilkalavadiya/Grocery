export const handleChange = (e: React.ChangeEvent<HTMLInputElement>,setSearch,setPage) => {
  let value = e.target.value;

  // Allow at most one space at the beginning, remove others
  value = value.replace(/^\s+/, ' ').replace(/\s{2,}/g, ' ').trimStart();

  setSearch(value);
  setPage(1);
};
