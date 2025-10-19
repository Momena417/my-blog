export const loadBlogs = () => {
  const raw = localStorage.getItem("blogs_v1");
  return raw ? JSON.parse(raw) : [];
};

export const saveBlogs = (blogs) => {
  localStorage.setItem("blogs_v1", JSON.stringify(blogs));
};
