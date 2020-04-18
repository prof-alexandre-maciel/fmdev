import { TRAIN_PIPELINES, PRE_PROCESSING_RAW } from "../constants";

export const copyToClipboard = (value) => {
  let dummy = document.createElement("input");

  document.body.appendChild(dummy);
  dummy.value = value;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

export const getExtensionDownload = (action) => {
  if (action === TRAIN_PIPELINES) {
    return 'py';
  }

  if (action === PRE_PROCESSING_RAW) {
    return 'csv';
  }
}

export const downloadStream = ({ id, content, action }) => {
  const url = window.URL.createObjectURL(new Blob([content]));
  const link = document.createElement('a');
  const extension = getExtensionDownload(action);

  link.href = url;
  link.setAttribute('download', `${id}.${extension}`);
  document.body.appendChild(link);
  link.click();
}