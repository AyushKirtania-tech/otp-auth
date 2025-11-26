import axios from "axios";

export const BACKEND_URL = "http://localhost:8081/api/v1";

// ------------------------------
// S3 UTILITIES
// ------------------------------

export const getPresignedURL = async (file: File) => {
  const res = await axios.post(`${BACKEND_URL}/customer/upload/presign`, {
    files: [
      {
        fileName: file.name,
        fileType: file.type,
      },
    ],
  });

  return res.data.urls[0]; // { uploadUrl, fileUrl }
};

export const uploadToS3 = async (file: File, uploadUrl: string) => {
  await axios.put(uploadUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
    withCredentials: false,
  });
};
