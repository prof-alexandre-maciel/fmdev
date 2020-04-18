export const copyToClipboard = (value) => {
  let dummy = document.createElement("input");

  document.body.appendChild(dummy);
  dummy.value = value;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

export const downloadStream = (id, content) => {
  const url = window.URL.createObjectURL(new Blob([content]));
  const link = document.createElement('a');

  link.href = url;
  link.setAttribute('download', `${id}.py`);
  document.body.appendChild(link);
  link.click();
}