export const getFileSize = (bytes: number) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log2(bytes) / 10);

  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
};

export const getFileType = (fileName: string) => {
  return (fileName.split(".").pop() || "").toUpperCase();
};
