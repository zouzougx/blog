const setHtml = (id: string, val: any) => {
  const element = document.getElementById(id);
  if (element) {
    element.innerHTML = element.innerHTML + '</br>' + val;
  }
};

export { setHtml };
